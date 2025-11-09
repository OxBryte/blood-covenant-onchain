import { useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { mintVampire } from "../services/api";
import { useTheme } from "../context/ThemeContext";

export default function MintVampire({ onMint }) {
  const { address } = useAppKitAccount();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [referrerCode, setReferrerCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMint = async (e) => {
    e.preventDefault();
    if (!address) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await mintVampire(address, referrerCode || undefined);
      if (result.vampire) {
        onMint();
      } else {
        setError("Failed to create vampire. Please try again.");
      }
    } catch (err) {
      let errorMessage = "Failed to mint vampire";

      if (err.message) {
        errorMessage = err.message;
      } else if (err.status === 400) {
        errorMessage = "Invalid request. Please check your input.";
      } else if (err.status === 409) {
        errorMessage = "You already have a vampire!";
      } else if (err.status === 503) {
        errorMessage = "Database connection error. Please ensure the database is running.";
      } else if (err.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (
        err.message?.includes("connect to server") ||
        err.message?.includes("fetch")
      ) {
        errorMessage = "Cannot connect to server. Please make sure the server is running on port 3001.";
      }

      console.error("Mint error details:", {
        message: err.message,
        status: err.status,
        error: err,
      });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const containerClasses = isDark
    ? "bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-gray-800/90 border-2 border-red-900/40 shadow-2xl shadow-red-900/30"
    : "bg-white/95 border-2 border-red-200/70 shadow-xl shadow-red-100/70";

  const inputClasses = isDark
    ? "w-full px-5 py-4 bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700/50 rounded-xl text-white text-base focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all duration-300"
    : "w-full px-5 py-4 bg-white border-2 border-red-200/80 rounded-xl text-gray-800 text-base focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300/60 transition-all duration-300 shadow-inner shadow-red-50";

  const helperTextClass = isDark ? "text-gray-400" : "text-gray-500";

  const featuresBoxClasses = isDark
    ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl border border-gray-700/30 hover:border-red-700/50"
    : "flex items-center gap-3 px-4 py-3 bg-red-50 rounded-xl border border-red-200/70 hover:border-red-400/60";

  const featureTextClass = isDark ? "text-gray-200" : "text-red-700";

  const sectionDividerClass = isDark ? "border-gray-700/50" : "border-red-200/70";

  const errorClasses = isDark
    ? "bg-red-500/20 border-2 border-red-500/50 text-red-400"
    : "bg-red-100 border-2 border-red-300 text-red-700";

  return (
    <div className="flex justify-center items-center min-h-[500px] animate-[slide-up_0.6s_ease-out]">
      <div
        className={`${containerClasses} backdrop-blur-xl p-12 rounded-3xl max-w-2xl w-full transition-colors duration-500`}
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Create Your Vampire
          </h2>
          <p
            className={`${
              isDark ? "text-gray-300" : "text-gray-600"
            } text-lg transition-colors duration-500`}
          >
            Pay the entry fee and become a Fledgling Vampire
          </p>
        </div>

        <form onSubmit={handleMint} className="mb-8 space-y-6">
          <div>
            <label
              htmlFor="referrerCode"
              className={`${
                isDark ? "text-gray-200" : "text-gray-700"
              } block mb-3 font-bold transition-colors duration-500`}
            >
              Referrer Code (Optional)
            </label>
            <input
              type="text"
              id="referrerCode"
              value={referrerCode}
              onChange={(e) => setReferrerCode(e.target.value)}
              placeholder="Enter referral code"
              className={inputClasses}
            />
            <small
              className={`block mt-3 text-sm font-medium ${helperTextClass} transition-colors duration-500`}
            >
              If you were referred by another vampire, enter their code here
            </small>
          </div>

          {error && (
            <div
              className={`${errorClasses} p-5 rounded-xl text-sm leading-relaxed animate-[shake_0.3s_ease-in-out] shadow-lg`}
              role="alert"
            >
              <strong className="block mb-2 text-base font-bold">⚠️ Error:</strong>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-lg font-extrabold cursor-pointer transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:scale-105 hover:shadow-xl hover:shadow-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none border-2 border-red-500/50 shadow-lg"
            disabled={loading}
          >
            {loading ? "🩸 Minting..." : "🩸 Mint Vampire (0.0001 ETH)"}
          </button>
        </form>

        <div className={`mt-10 pt-8 border-t ${sectionDividerClass}`}>
          <h3 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent text-center">
            What you get:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Unique Vampire NFT with random traits", "Your own referral code", "Access to hunting grounds", "Ability to build your coven"].map(
              (item) => (
                <div
                  key={item}
                  className={`${featuresBoxClasses} transition-colors duration-300`}
                >
                  <span className="text-2xl">✓</span>
                  <span
                    className={`${featureTextClass} font-medium transition-colors duration-500`}
                  >
                    {item}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
