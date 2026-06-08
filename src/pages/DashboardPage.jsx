import { useNavigate } from "react-router-dom";

// MUI Icons
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";

// React Query services
import {
  useDashboardStatsQuery,
  useActiveBorrowsQuery,
  useOverdueBorrowsQuery,
} from "../features/dashboard/services/dashboardService";

// Components
import StatsCard from "../features/dashboard/components/StatsCard";
import BorrowRequestsTable from "../features/dashboard/components/BorrowRequestsTable";
import LateBorrowingsTable from "../features/dashboard/components/LateBorrowingsTable";
import QuickActions from "../features/dashboard/components/QuickActions";

// ─── Mock data (shown when API is unreachable) ────────────────────────────────
const MOCK_STATS = {
  total_books: 1245,
  available_books: 824,
  borrowed_books: 403,
  total_users: 1156,
};

const MOCK_ACTIVE_BORROWS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  user_name: "Omar Abu Hwa",
  book_title: "Know JS",
  borrow_date: "2026-05-20",
  due_date: "2026-06-20",
  status: "borrowed",
}));

const MOCK_OVERDUE_BORROWS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  user_name: "Omar Abu Hwa",
  book_title: "Clean Code",
  borrow_date: "2026-04-01",
  due_date: "2026-05-01",
  status: "overdue",
}));

// ─── Stat card definitions ────────────────────────────────────────────────────
const STAT_CARDS = [
  {
    key: "total_books",
    label: "Total Books",
    icon: MenuBookOutlinedIcon,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    trend: "↑ 12.5%",
    trendUp: true,
  },
  {
    key: "available_books",
    label: "Available Books",
    icon: CheckCircleOutlineIcon,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    trend: "↑ 12.5%",
    trendUp: true,
  },
  {
    key: "borrowed_books",
    label: "Borrowed Books",
    icon: AutoStoriesOutlinedIcon,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-400",
    trend: "↓ 3.7%",
    trendUp: false,
  },
  {
    key: "total_users",
    label: "Total Users",
    icon: PeopleAltOutlinedIcon,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    trend: "↑ 9.6%",
    trendUp: true,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate();

  // ── React Query ─────────────────────────────────────────────────────────────
  const statsQuery = useDashboardStatsQuery();
  const activeBorrowsQuery = useActiveBorrowsQuery();
  const overdueQuery = useOverdueBorrowsQuery();

  const dashboardStats = statsQuery.isError ? MOCK_STATS : (statsQuery.data || MOCK_STATS);
  const activeBorrows = Array.isArray(activeBorrowsQuery.data)
    ? activeBorrowsQuery.data
    : (activeBorrowsQuery.isError ? MOCK_ACTIVE_BORROWS : []);
  const overdueBorrows = Array.isArray(overdueQuery.data)
    ? overdueQuery.data
    : (overdueQuery.isError ? MOCK_OVERDUE_BORROWS : []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Page body ─────────────────────────────────────────────────────────── */}
      <main className="p-6 space-y-6 max-w-[1400px] mx-auto">

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STAT_CARDS.map(({ key, ...card }) => (
            <StatsCard key={key} value={dashboardStats[key] ?? 0} isLoading={statsQuery.isLoading} {...card} />
          ))}
        </div>

        {/* Tables row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Active Borrows (borrowed) */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AutoStoriesOutlinedIcon className="!w-4 !h-4 text-orange-400" />
                <h2 className="text-sm font-semibold text-gray-800">Active Borrows</h2>
              </div>
              <button
                onClick={() => navigate("/app/borrow-requests/active")}
                className="text-xs font-medium flex items-center gap-0.5 transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-accent)' }}
              >
                View All <span className="text-base leading-none">›</span>
              </button>
            </div>
            <BorrowRequestsTable
              borrows={activeBorrows}
              isLoading={activeBorrowsQuery.isLoading && !activeBorrowsQuery.isError}
            />
          </div>

          {/* Overdue Borrows */}
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-red-100 bg-red-50/50 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <WarningAmberOutlinedIcon className="!w-4 !h-4 text-red-400" />
                <h2 className="text-sm font-semibold text-red-600">Overdue Borrows</h2>
              </div>
              <button
                onClick={() => navigate("/app/borrow-requests/active")}
                className="text-xs font-medium flex items-center gap-0.5 transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-danger)' }}
              >
                View All <span className="text-base leading-none">›</span>
              </button>
            </div>
            <LateBorrowingsTable
              borrowings={overdueBorrows}
              isLoading={overdueQuery.isLoading && !overdueQuery.isError}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <BoltOutlinedIcon className="!w-4 !h-4 text-yellow-400" />
            <h2 className="text-sm font-semibold text-gray-800">Quick Actions</h2>
          </div>
          <QuickActions />
        </div>
      </main>

    </div>
  );
}
