import { useState } from "react";

// MUI Icons
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";

// React Query services
import {
  useBorrowRequestsQuery,
  useLateBorrowingsQuery,
  useConfirmBorrowMutation,
} from "../features/dashboard/services/dashboardService";

// Components
import StatsCard from "../features/dashboard/components/StatsCard";
import BorrowRequestsTable from "../features/dashboard/components/BorrowRequestsTable";
import LateBorrowingsTable from "../features/dashboard/components/LateBorrowingsTable";
import QuickActions from "../features/dashboard/components/QuickActions";
import AppSnackbar from "../components/AppSnackbar";

// ─── Mock data (shown when API is unreachable) ────────────────────────────────
const MOCK_STATS = {
  totalBooks: 1245,
  availableBooks: 824,
  borrowedBooks: 403,
  totalUsers: 1156,
};

const MOCK_BORROW_REQUESTS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  user_name: "Omar abo hwa",
  book_name: "Know JS",
  request_date: "16, Jun 2026",
  status: "pending",
}));

const MOCK_LATE_BORROWINGS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  user_name: "Omar abo hwa",
  book_name: "Clean Code",
  late_days: 5,
  status: "late",
}));

// ─── Stat card definitions ────────────────────────────────────────────────────
const STAT_CARDS = [
  {
    key: "totalBooks",
    label: "Total Books",
    icon: MenuBookOutlinedIcon,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    trend: "↑ 12.5%",
    trendUp: true,
  },
  {
    key: "availableBooks",
    label: "Available Books",
    icon: CheckCircleOutlineIcon,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    trend: "↑ 12.5%",
    trendUp: true,
  },
  {
    key: "borrowedBooks",
    label: "Borrowed Books",
    icon: AutoStoriesOutlinedIcon,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-400",
    trend: "↓ 3.7%",
    trendUp: false,
  },
  {
    key: "totalUsers",
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
  // ── State ───────────────────────────────────────────────────────────────────
  const [snackbar, setSnackbar] = useState({ open: false, message: "", variant: "success" });
  const [confirmingId, setConfirmingId] = useState(null);

  const openSnackbar = (message, variant = "success") =>
    setSnackbar({ open: true, message, variant });

  // ── React Query ─────────────────────────────────────────────────────────────
  const borrowQuery = useBorrowRequestsQuery();
  const lateQuery = useLateBorrowingsQuery();
  const confirmMutation = useConfirmBorrowMutation();

  const borrowRequests = Array.isArray(borrowQuery.data) ? borrowQuery.data : (borrowQuery.data?.data ?? (borrowQuery.isError ? MOCK_BORROW_REQUESTS : []));
  const lateBorrowings = Array.isArray(lateQuery.data) ? lateQuery.data : (lateQuery.data?.data ?? (lateQuery.isError ? MOCK_LATE_BORROWINGS : []));

  // ── Confirm borrow request ──────────────────────────────────────────────────
  const handleConfirm = (id) => {
    setConfirmingId(id);
    confirmMutation.mutate(id, {
      onSuccess: () => {
        openSnackbar("Borrow request confirmed successfully.");
        setConfirmingId(null);
      },
      onError: () => {
        openSnackbar("Failed to confirm request.", "error");
        setConfirmingId(null);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Page body ─────────────────────────────────────────────────────────── */}
      <main className="p-6 space-y-6 max-w-[1400px] mx-auto">

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STAT_CARDS.map(({ key, ...card }) => (
            <StatsCard key={key} value={MOCK_STATS[key]} {...card} />
          ))}
        </div>

        {/* Tables row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Borrow Requests */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 text-lg">📋</span>
                <h2 className="text-sm font-semibold text-gray-800">Borrow Requests</h2>
              </div>
              <span className="text-xs font-medium text-gray-400 flex items-center gap-0.5 cursor-not-allowed" title="Coming soon">
                View All <span className="text-base leading-none">›</span>
              </span>
            </div>
            <BorrowRequestsTable
              requests={borrowRequests}
              isLoading={borrowQuery.isLoading && !borrowQuery.isError}
              onConfirm={handleConfirm}
              confirmingId={confirmingId}
            />
          </div>

          {/* Late Borrowings */}
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-red-100 bg-red-50/50 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <WarningAmberOutlinedIcon className="!w-4 !h-4 text-red-400" />
                <h2 className="text-sm font-semibold text-red-600">Late Borrowings</h2>
              </div>
              <span className="text-xs font-medium text-gray-400 flex items-center gap-0.5 cursor-not-allowed" title="Coming soon">
                View All <span className="text-base leading-none">›</span>
              </span>
            </div>
            <LateBorrowingsTable
              borrowings={lateBorrowings}
              isLoading={lateQuery.isLoading && !lateQuery.isError}
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

      {/* Snackbar */}
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        variant={snackbar.variant}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
      />

    </div>
  );
}
