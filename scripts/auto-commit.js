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

async function gitCommand(command, silent = false) {
  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd: projectRoot,
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
    });
    if (!silent) {
      if (stdout && stdout.trim()) console.log(stdout.trim());
      if (stderr && !stderr.includes('warning') && stderr.trim()) console.error(stderr.trim());
    }
    return { stdout: stdout || '', stderr: stderr || '' };
  } catch (error) {
    // Ignore errors for git status checks (no repo or no changes)
    if (command.includes('status') && (error.code === 128 || error.code === 1)) {
      return { stdout: '', stderr: '' };
    }
    // Git commit returns exit code 1 when there's nothing to commit
    if (command.includes('commit') && error.code === 1) {
      return { stdout: '', stderr: error.stderr || '' };
    }
    if (!silent) {
      console.error(`Error executing: ${command}`, error.message);
    }
    throw error;
  }
}

async function commitChanges() {
  try {
    // Check if there are changes
    const statusResult = await gitCommand('git status --porcelain', true);
    if (!statusResult || !statusResult.stdout || !statusResult.stdout.trim()) {
      hasChanges = false;
      pendingChanges.clear();
      return;
    }

    console.log('\n📦 Auto-committing changes...');
    
    // Add all changes
    await gitCommand('git add -A', true);

    // Create commit with timestamp and file list
    const timestamp = new Date().toLocaleString();
    const filesChanged = Array.from(pendingChanges).slice(0, 5).join(', ');
    const commitMessage = `Auto-commit: ${timestamp}${filesChanged ? ` - ${filesChanged}` : ''}`;
    
    // Properly escape the commit message for shell
    // Replace single quotes with '\'' and wrap in single quotes
    const escapedMessage = commitMessage.replace(/'/g, "'\\''");
    const commitResult = await gitCommand(`git commit -m '${escapedMessage}'`, true);
    
    // Check if commit was successful by checking status after commit
    const statusAfter = await gitCommand('git status --porcelain', true);
    const wasCommitted = !statusAfter.stdout || statusAfter.stdout.trim() === '';
    
    // Also check if commit result indicates success
    const commitOutput = (commitResult.stdout + ' ' + commitResult.stderr).toLowerCase();
    const commitSuccess = wasCommitted || 
                         commitOutput.includes('[master') || 
                         commitOutput.includes('[main') ||
                         commitOutput.includes('files changed') ||
                         commitOutput.includes('file changed');
    
    if (commitSuccess && wasCommitted) {
      console.log('✅ Changes committed successfully!');
      if (pendingChanges.size > 0) {
        console.log(`   Files: ${Array.from(pendingChanges).join(', ')}`);
      }
      console.log('');
    } else if (!wasCommitted) {
      // Still have uncommitted changes, might be an issue
      console.log('⚠️  Some changes may not have been committed\n');
    } else {
      console.log('ℹ️  No changes to commit\n');
    }
    
    hasChanges = false;
    pendingChanges.clear();
  } catch (error) {
    // Check if error is just "nothing to commit"
    if (error.message && error.message.includes('nothing to commit')) {
      console.log('ℹ️  No changes to commit\n');
      hasChanges = false;
      pendingChanges.clear();
    } else {
      console.error('❌ Error committing changes:', error.message);
      // Don't clear changes on error, allow retry
    }
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
      await gitCommand('git config user.name "Auto Committer"');
    } catch (e) {
      // Ignore config errors
    }
    try {
      await gitCommand('git config user.email "auto-commit@blood-covenant.local"');
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
  try {
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
      }
      commitChanges().then(() => {
        process.exit(0);
      }).catch(() => {
        process.exit(0);
      });
    });

    // Handle uncaught errors to keep the process alive
    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught exception:', error);
    });

    process.on('unhandledRejection', (error) => {
      console.error('❌ Unhandled rejection:', error);
    });
  } catch (error) {
    console.error('❌ Failed to start auto-commit system:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
