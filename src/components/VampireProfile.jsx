import { useTheme } from "../context/ThemeContext";

export default function VampireProfile({ vampire }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!vampire) {
    return (
      <div
        className={`text-center py-12 text-lg ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Loading vampire details...
      </div>
    );
  }

  const surface = isDark
    ? "bg-white/5 border-white/10 text-gray-100"
    : "bg-white border-rose-100 text-gray-900";

  const subtleSurface = isDark
    ? "bg-white/3 border-white/10"
    : "bg-rose-50 border-rose-100";

  const statLabel = isDark ? "text-gray-400" : "text-rose-600";
  const metaSurface = isDark
    ? "rounded-xl border border-white/12 bg-white/8 px-4 py-3"
    : "rounded-xl border border-rose-100 bg-rose-50 px-4 py-3";

  return (
    <div className="space-y-8">
      <section
        className={`flex flex-col gap-6 rounded-2xl border px-6 py-6 sm:flex-row sm:items-center ${surface} transition-colors duration-300`}
      >
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 text-3xl font-bold text-white shadow-lg shadow-rose-900/30 sm:mx-0">
          {vampire.bloodline[0]}
          {vampire.clan[0]}
          <span className="absolute -bottom-1.5 -right-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-emerald-500 text-xs font-semibold shadow-sm shadow-emerald-700/40">
            {vampire.rank?.charAt(0)}
          </span>
        </div>
        <div className="w-full space-y-4 text-center sm:text-left">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
                {vampire.rank}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">
                {vampire.bloodline} {vampire.clan}
              </h2>
            </div>
            <span className="inline-flex items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              {vampire.rarity}
            </span>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div className={metaSurface}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-rose-300">
                Level
              </dt>
              <dd className="text-lg font-semibold text-rose-200">
                {vampire.level}
              </dd>
            </div>
            <div className={metaSurface}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Total earnings
              </dt>
              <dd className="text-lg font-semibold text-emerald-400">
                {vampire.earnings.total.toFixed(4)} ETH
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Power", value: vampire.stats.power },
          { label: "Speed", value: vampire.stats.speed },
          { label: "Defense", value: vampire.stats.defense },
          { label: "Bloodlust", value: vampire.stats.bloodlust },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl border px-4 py-5 text-center ${subtleSurface} transition-colors duration-300`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-wide ${statLabel}`}
            >
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-rose-400">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section
        className={`rounded-2xl border px-6 py-6 ${surface} transition-colors duration-300`}
      >
        <h3 className="text-lg font-semibold tracking-tight">Referral</h3>
        <p
          className={`mt-2 text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Share your code to grow your coven. You earn
          <span className="text-emerald-400 font-semibold"> 30%</span> of each
          entry.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <code
            className={`flex-1 rounded-xl border px-4 py-3 text-center text-lg font-semibold tracking-wider ${subtleSurface}`}
          >
            {vampire.referralCode}
          </code>
          <button
            onClick={() => {
              const link = `${window.location.origin}?ref=${vampire.referralCode}`;
              navigator.clipboard.writeText(link);
              alert("Referral link copied to clipboard!");
            }}
            className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow shadow-rose-900/30 transition-transform duration-200 hover:scale-105 hover:bg-rose-400"
          >
            Copy link
          </button>
        </div>
      </section>

      <section
        className={`rounded-2xl border px-6 py-6 ${surface} transition-colors duration-300`}
      >
        <h3 className="text-lg font-semibold tracking-tight">Earnings</h3>
        <div className="mt-4 space-y-3 text-sm">
          {[
            {
              label: "From referrals",
              value: vampire.earnings.fromReferrals,
            },
            {
              label: "From hunting",
              value: vampire.earnings.fromHunting,
            },
            {
              label: "From PvP",
              value: vampire.earnings.fromPvP,
            },
          ].map((entry) => (
            <div
              key={entry.label}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${subtleSurface}`}
            >
              <span className={statLabel}>{entry.label}</span>
              <span className="font-semibold text-emerald-400">
                {entry.value.toFixed(4)} ETH
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
