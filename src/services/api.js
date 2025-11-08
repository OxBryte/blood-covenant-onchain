const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(error.error || 'Request failed')
  }

  return response.json()
}

export async function mintVampire(walletAddress, referrerCode) {
  return fetchAPI('/vampires/mint', {
    method: 'POST',
    body: JSON.stringify({ walletAddress, referrerCode }),
  })
}

export async function fetchVampire(walletAddress) {
  return fetchAPI(`/vampires/${walletAddress}`)
}

export async function fetchBloodline(walletAddress) {
  return fetchAPI(`/vampires/${walletAddress}/bloodline`)
}

export async function fetchHuntingGrounds(walletAddress) {
  return fetchAPI(`/hunt/grounds?walletAddress=${walletAddress}`)
}

export async function startHunt(walletAddress, stakeAmount, huntingGround) {
  return fetchAPI('/hunt/start', {
    method: 'POST',
    body: JSON.stringify({ walletAddress, stakeAmount, huntingGround }),
  })
}

export async function challengeVampire(challengerWallet, opponentWallet, stakeAmount) {
  return fetchAPI('/pvp/challenge', {
    method: 'POST',
    body: JSON.stringify({ challengerWallet, opponentWallet, stakeAmount }),
  })
}

export async function fetchLeaderboard(limit = 100) {
  return fetchAPI(`/pvp/leaderboard?limit=${limit}`)
}

