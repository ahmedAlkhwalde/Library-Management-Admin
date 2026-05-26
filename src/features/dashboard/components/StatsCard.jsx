import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

// eslint-disable-next-line no-unused-vars
export default function StatsCard({ icon: Icon, iconBg, iconColor, label, value, trend, trendUp, isLoading }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon className={`!w-6 !h-6 ${iconColor}`} />
        </div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
      </div>

      {isLoading ? (
        <div className="h-9 w-24 bg-gray-100 rounded-lg animate-pulse" />
      ) : (
        <p className="text-3xl font-bold text-gray-900 tracking-tight">
          {value !== null && value !== undefined ? Number(value).toLocaleString() : "—"}
        </p>
      )}

      <div className={`flex items-center gap-1 text-xs font-semibold ${trendUp ? "text-emerald-500" : "text-red-500"}`}>
        {trendUp ? <TrendingUpIcon className="!w-3.5 !h-3.5" /> : <TrendingDownIcon className="!w-3.5 !h-3.5" />}
        <span>{trendUp ? "↑" : "↓"} {trend}</span>
        <span className="text-gray-400 font-normal">from last month</span>
      </div>
    </div>
  );
}