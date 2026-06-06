import CheckIcon from "@mui/icons-material/Check";

export default function BorrowRequestsTable({ requests = [], isLoading, onConfirm, confirmingId }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr style={{ borderBottomColor: 'var(--color-border)' }} className="border-b">
            {["User Name", "Book Name", "Request Date", "Status", "Action"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold tracking-wide" style={{ color: 'var(--color-grey)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} style={{ borderBottomColor: 'var(--color-surface-90)' }} className="border-b">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 rounded animate-pulse" style={{ backgroundColor: 'var(--color-surface-90)' }} />
                    </td>
                  ))}
                </tr>
              ))
            : requests.length === 0
            ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm" style={{ color: 'var(--color-grey)' }}>
                  No pending borrow requests.
                </td>
              </tr>
            )
            : requests.map((req) => (
                <tr key={req.id} className="border-b transition-colors" style={{ borderBottomColor: 'var(--color-surface-90)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-90)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  {/* User */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0" style={{ backgroundColor: 'var(--color-surface-90)' }}>
                        {req.user_avatar
                          ? <img src={req.user_avatar} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
                              {req.user_name?.charAt(0) ?? "U"}
                            </div>
                        }
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{req.user_name}</span>
                    </div>
                  </td>

                  {/* Book */}
                  <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-grey)' }}>{req.book_name}</td>

                  {/* Date */}
                  <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-grey)' }}>{req.request_date}</td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border" style={{ backgroundColor: 'color-mix(in srgb, var(--color-warning) 12%, transparent)', color: 'var(--color-warning)', borderColor: 'var(--color-warning)' }}>
                      Pending
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onConfirm?.(req.id)}
                      disabled={confirmingId === req.id}
                      className="flex items-center gap-1 text-xs font-semibold disabled:opacity-50 transition-colors"
                      style={{ color: 'var(--color-success)' }}
                      onMouseEnter={(e) => { if (confirmingId !== req.id) e.currentTarget.style.opacity = '0.8'; }}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
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
