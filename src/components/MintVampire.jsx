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
    ? "bg-white/5 border border-white/10 text-gray-100"
    : "bg-white border border-rose-100 text-gray-900";

  const inputClasses = isDark
    ? "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100 placeholder:text-gray-500 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/40"
    : "w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/30";

  const helperTextClass = isDark ? "text-gray-400" : "text-gray-600";

  const featuresSurface = isDark
    ? "bg-white/5 border border-white/10 text-gray-100"
    : "bg-rose-50 border border-rose-100 text-rose-700";

  const sectionDividerClass = isDark ? "border-white/10" : "border-rose-100";

  const errorClasses = isDark
    ? "bg-red-500/10 border border-red-400/50 text-red-200"
    : "bg-red-100 border border-red-200 text-red-700";

  return (
    <div className="flex justify-center">
      <div
        className={`${containerClasses} w-full max-w-xl rounded-3xl px-8 py-10 shadow-xl shadow-black/20 transition-colors duration-300`}
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Create your vampire</h2>
          <p className={`mt-2 text-sm ${helperTextClass}`}>
            Pay the entry fee and unlock your place in the covenant.
          </p>
        </div>

        <form onSubmit={handleMint} className="mt-8 space-y-6">
          <div className="space-y-3">
            <label
              htmlFor="referrerCode"
              className={`block text-sm font-semibold ${isDark ? "text-gray-200" : "text-gray-700"}`}
            >
              Referrer code (optional)
            </label>
            <input
              type="text"
              id="referrerCode"
              value={referrerCode}
              onChange={(e) => setReferrerCode(e.target.value)}
              placeholder="Enter referral code"
              className={inputClasses}
            />
            <p className={`text-xs ${helperTextClass}`}>
              If someone invited you, enter their code to share rewards.
            </p>
          </div>

          {error && (
            <div className={`${errorClasses} rounded-xl px-4 py-3 text-sm`} role="alert">
              <strong className="font-semibold">Heads up:</strong> {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow shadow-rose-900/30 transition-transform duration-200 hover:scale-[1.02] hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "🩸 Minting..." : "Mint vampire (0.0001 ETH)"}
          </button>
        </form>

        <div className={`mt-8 border-t pt-6 ${sectionDividerClass}`}>
          <h3 className="text-sm font-semibold tracking-wide text-rose-400">
            What you receive
          </h3>
          <div className="mt-4 space-y-3 text-sm">
            {["Unique vampire identity", "Personal referral code", "Access to hunting grounds", "Ability to grow your coven"].map((item) => (
              <div
                key={item}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 ${featuresSurface}`}
              >
                <span className="text-rose-400">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
