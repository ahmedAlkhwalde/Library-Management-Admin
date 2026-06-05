import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useBorrows, useReturnBook } from "../service/borrowService";
import { setCurrentPage } from "../store/borrowSlice";
import AppSnackbar from "../../../components/AppSnackbar.jsx";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// مكون الأزرار المدمج
function PaginationBtn({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-3 h-8 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      {label}
    </button>
  );
}

export default function ActiveBorrowTable() {
  const [selectedStatus, setSelectedStatus] = useState("borrowed,overdue");
  const STATUS_OPTIONS = [
    { label: "All Status", value: "borrowed,overdue" },
    { label: "Borrowed", value: "borrowed" },
    { label: "Overdue", value: "overdue" },
  ];
  const dispatch = useDispatch();
  const { currentPage } = useSelector((s) => s.borrow);
  const { data, isLoading } = useBorrows(selectedStatus, currentPage);
  const { mutate: handleReturn } = useReturnBook();

  const [processingId, setProcessingId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    variant: "success",
  });

  const HEADERS = [
    "User",
    "Book Title",
    "Borrow Date",
    "Return Deadline",
    "Time Remaining",
    "Actions",
  ];

  const borrows = data?.data?.borrows || [];
  const pagination = data?.data?.pagination || {
    current_page: 1,
    last_page: 1,
    total: 0,
  };
  

  const { last_page, total } = pagination;
  const pageSize = 10;
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  const onReturnClick = (id) => {
    setProcessingId(id);
    handleReturn(id, {
      onSuccess: () => {
        setProcessingId(null);
        setSnackbar({
          open: true,
          message: "Book returned successfully!",
          variant: "success",
        });
      },
      onError: () => {
        setProcessingId(null);
        setSnackbar({
          open: true,
          message: "Operation failed, please try again.",
          variant: "error",
        });
      },
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center p-3 gap-2">
        <span className="text-xs text-gray-400 font-medium">Status:</span>
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
            }}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 bg-white focus:outline-none focus:border-indigo-400 cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <KeyboardArrowDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4! h-4! text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-100 uppercase text-[11px] font-bold text-gray-500 tracking-wider">
            <tr>
              {HEADERS.map((h) => (
                <th key={h} className="px-6 py-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              // حالة التحميل (Skeleton)
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                  {HEADERS.map((h) => (
                    <td key={h} className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : borrows.length === 0 ? (
              // حالة عدم وجود نتائج
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-16 text-center text-gray-400 text-sm"
                >
                  No borrowed books found.
                </td>
              </tr>
            ) : (
              // عرض البيانات
              borrows.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={
                        item.user?.image ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      onError={(e) => {
                        e.target.src =
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                      }}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 bg-gray-100"
                      alt={item.user?.name || "User"}
                    />{" "}
                    <p className="font-medium text-gray-900">
                      {item.user.name}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-700 truncate max-w-[150px]">
                    {item.book.title}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {item.borrowed_at}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{item.due_at}</td>
                  <td className="px-6 py-4">
                    <td className="px-6 py-4">
                      {item.status == "overdue" ? (
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 whitespace-nowrap">
                          Delayed
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 whitespace-nowrap">
                          {item.time_remaining}
                        </span>
                      )}
                    </td>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      disabled={processingId !== null}
                      onClick={() => onReturnClick(item.id)}
                      // تم ضبط min-w لضمان ثبات حجم الزر وعدم اهتزازه
                      className="min-w-[160px] cursor-pointer px-4 py-2 text-sm text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 ml-auto"
                    >
                      {processingId === item.id ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Mark as Returned"
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* الـ Pagination يظهر فقط إذا كانت هناك بيانات */}
      {borrows.length > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
          <p className="text-sm text-gray-500">
            Showing {total === 0 ? 0 : startItem} to {endItem} of {total}{" "}
            results
          </p>
          <div className="flex items-center gap-1">
            <PaginationBtn
              label="Previous"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
              disabled={currentPage === 1}
            />
            {Array.from({ length: last_page || 1 }, (_, i) => i + 1).map(
              (n) => (
                <button
                  key={n}
                  onClick={() => dispatch(setCurrentPage(n))}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    n === currentPage
                      ? "bg-indigo-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {n}
                </button>
              ),
            )}
            <PaginationBtn
              label="Next"
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
              disabled={currentPage >= (last_page || 1)}
            />
          </div>
        </div>
      )}

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        variant={snackbar.variant}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
