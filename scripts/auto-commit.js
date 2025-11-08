import { exec } from 'child_process';
import { promisify } from 'util';
import chokidar from 'chokidar';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Configuration
const WATCH_PATTERNS = [
  'src/**/*',
  'server/**/*',
  '*.js',
  '*.json',
  '*.jsx',
  '*.ts',
  '*.tsx',
  '*.css',
  '*.html',
];
const IGNORE_PATTERNS = [
  'node_modules/**',
  '.git/**',
  'dist/**',
  'build/**',
  '*.log',
  '.DS_Store',
  'package-lock.json',
];
const COMMIT_INTERVAL = 30000; // 30 seconds

let changeTimer = null;
let hasChanges = false;
let pendingChanges = new Set();

async function gitCommand(command) {
  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd: projectRoot,
    });
    if (stdout) console.log(stdout.trim());
    if (stderr && !stderr.includes('warning')) console.error(stderr.trim());
    return { stdout, stderr };
  } catch (error) {
    // Ignore errors for git status checks
    if (command.includes('status') && error.code === 128) {
      return { stdout: '', stderr: '' };
    }
    console.error(`Error executing: ${command}`, error.message);
    return null;
  }
}

async function commitChanges() {
  if (!hasChanges && pendingChanges.size === 0) return;

  try {
    console.log('\n📦 Auto-committing changes...');
    
    // Check if there are changes
    const { stdout: status } = await gitCommand('git status --porcelain');
    if (!status || !status.trim()) {
      hasChanges = false;
      pendingChanges.clear();
      return;
    }

    // Add all changes
    await gitCommand('git add -A');

    // Create commit with timestamp and file list
    const timestamp = new Date().toLocaleString();
    const filesChanged = Array.from(pendingChanges).slice(0, 5).join(', ');
    const commitMessage = `Auto-commit: ${timestamp}${filesChanged ? ` - ${filesChanged}` : ''}`;
    await gitCommand(`git commit -m "${commitMessage}"`);

    console.log('✅ Changes committed successfully!');
    console.log(`   Files: ${Array.from(pendingChanges).join(', ')}\n`);
    hasChanges = false;
    pendingChanges.clear();
  } catch (error) {
    console.error('❌ Error committing changes:', error.message);
  }
}

function scheduleCommit(filePath) {
  if (changeTimer) {
    clearTimeout(changeTimer);
  }
  
  hasChanges = true;
  const relativePath = filePath.replace(projectRoot + '/', '');
  pendingChanges.add(relativePath);
  
  changeTimer = setTimeout(() => {
    commitChanges();
  }, COMMIT_INTERVAL);
}

// Initialize git repo if not already initialized
async function initGit() {
  try {
    await gitCommand('git status');
    console.log('✅ Git repository already initialized\n');
  } catch (error) {
    console.log('📦 Initializing git repository...');
    await gitCommand('git init');
    // Try to set git config, but don't fail if it doesn't work
    try {
      await gitCommand('git config user.name "Auto Committer" || true');
      await gitCommand('git config user.email "auto-commit@blood-covenant.local" || true');
    } catch (e) {
      // Ignore config errors
    }
    console.log('✅ Git repository initialized\n');
  }
}

// Watch for file changes
function startWatching() {
  console.log('👀 Watching for file changes...');
  console.log('💾 Auto-commit will trigger 30 seconds after any change\n');

  const watcher = chokidar.watch(WATCH_PATTERNS, {
    cwd: projectRoot,
    ignored: IGNORE_PATTERNS,
    ignoreInitial: true,
    persistent: true,
  });

  watcher
    .on('add', (path) => {
      console.log(`📝 File added: ${path}`);
      scheduleCommit(join(projectRoot, path));
    })
    .on('change', (path) => {
      console.log(`📝 File changed: ${path}`);
      scheduleCommit(join(projectRoot, path));
    })
    .on('unlink', (path) => {
      console.log(`🗑️  File deleted: ${path}`);
      scheduleCommit(join(projectRoot, path));
    })
    .on('error', (error) => {
      console.error('❌ Watcher error:', error);
    })
    .on('ready', () => {
      console.log('✅ File watcher ready!\n');
    });
}

// Main function
async function main() {
  console.log('🚀 Starting auto-commit system for Blood Covenant...\n');
  await initGit();
  startWatching();
  
  // Initial commit if there are uncommitted changes
  setTimeout(() => {
    commitChanges();
  }, 5000);

  // Keep the process running
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Stopping auto-commit system...');
    if (changeTimer) {
      clearTimeout(changeTimer);
      commitChanges();
    }
    process.exit(0);
  });
}

main().catch(console.error);
