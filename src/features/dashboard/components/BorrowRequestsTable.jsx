import CheckIcon from "@mui/icons-material/Check";

export default function BorrowRequestsTable({ requests = [], isLoading, onConfirm, confirmingId }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {["User Name", "Book Name", "Request Date", "Status", "Action"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            : requests.length === 0
            ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-400">
                  No pending borrow requests.
                </td>
              </tr>
            )
            : requests.map((req) => (
                <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  {/* User */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                        {req.user_avatar
                          ? <img src={req.user_avatar} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 text-xs font-bold">
                              {req.user_name?.charAt(0) ?? "U"}
                            </div>
                        }
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{req.user_name}</span>
                    </div>
                  </td>

                  {/* Book */}
                  <td className="px-4 py-3 text-sm text-gray-600">{req.book_name}</td>

                  {/* Date */}
                  <td className="px-4 py-3 text-sm text-gray-500">{req.request_date}</td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-500 border border-orange-100">
                      Pending
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onConfirm?.(req.id)}
                      disabled={confirmingId === req.id}
                      className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 disabled:opacity-50 transition-colors"
                    >
                      <CheckIcon className="!w-3.5 !h-3.5" />
                      {confirmingId === req.id ? "Confirming…" : "Confirm"}
                    </button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}
