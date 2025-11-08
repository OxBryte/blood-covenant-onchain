const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorMessage = "Request failed";
      let errorDetails = null;

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
        errorDetails = errorData.details || null;
      } catch (e) {
        // If response is not JSON, try to get text
        try {
          const text = await response.text();
          errorMessage =
            text || `Server error: ${response.status} ${response.statusText}`;
        } catch (e2) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      error.details = errorDetails;
      throw error;
    }

    return response.json();
  } catch (error) {
    // Handle network errors
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Unable to connect to server. Please make sure the server is running on " +
          API_URL
      );
    }
    // Re-throw if it's already our formatted error
    if (error.status) {
      throw error;
    }
    // Handle other errors
    throw new Error(error.message || "An unexpected error occurred");
  }
}

export async function mintVampire(walletAddress, referrerCode) {
  return fetchAPI("/vampires/mint", {
    method: "POST",
    body: JSON.stringify({ walletAddress, referrerCode }),
  });
}

export async function fetchVampire(walletAddress) {
  return fetchAPI(`/vampires/${walletAddress}`);
}

export async function fetchBloodline(walletAddress) {
  return fetchAPI(`/vampires/${walletAddress}/bloodline`);
}

export async function fetchHuntingGrounds(walletAddress) {
  return fetchAPI(`/hunt/grounds?walletAddress=${walletAddress}`);
}

export async function startHunt(walletAddress, stakeAmount, huntingGround) {
  return fetchAPI("/hunt/start", {
    method: "POST",
    body: JSON.stringify({ walletAddress, stakeAmount, huntingGround }),
  });
}

export async function challengeVampire(
  challengerWallet,
  opponentWallet,
  stakeAmount
) {
  return fetchAPI("/pvp/challenge", {
    method: "POST",
    body: JSON.stringify({ challengerWallet, opponentWallet, stakeAmount }),
  });
}

export async function fetchLeaderboard(limit = 100) {
  return fetchAPI(`/pvp/leaderboard?limit=${limit}`);
}
