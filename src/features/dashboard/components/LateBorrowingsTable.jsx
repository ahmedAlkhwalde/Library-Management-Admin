export default function LateBorrowingsTable({ borrowings = [], isLoading }) {
  const HEADERS = ["User Name", "Book Title", "Borrow Date", "Due Date", "Status"];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr style={{ borderBottomColor: 'var(--color-danger-soft)' }} className="border-b">
            {HEADERS.map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold tracking-wide" style={{ color: 'var(--color-grey)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ borderBottomColor: 'var(--color-danger-soft)' }} className="border-b">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 rounded animate-pulse" style={{ backgroundColor: 'var(--color-danger-soft)' }} />
                    </td>
                  ))}
                </tr>
              ))
            : borrowings.length === 0
            ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm" style={{ color: 'var(--color-grey)' }}>
                  No overdue borrowings.
                </td>
              </tr>
            )
            : borrowings.slice(0, 6).map((item) => (
                <tr
                  key={item.id}
                  className="border-b transition-colors"
                  style={{ borderBottomColor: 'var(--color-danger-soft)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-danger-soft)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {/* User */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                        {item.user_avatar
                          ? <img src={item.user_avatar} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--color-danger-soft)', color: 'var(--color-danger)' }}>
                              {item.user_name?.charAt(0) ?? "U"}
                            </div>
                        }
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{item.user_name}</span>
                    </div>
                  </td>

                  {/* Book */}
                  <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-grey)' }}>{item.book_title ?? item.book_name}</td>

                  {/* Borrow Date */}
                  <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-grey)' }}>{item.borrow_date ?? item.created_at?.slice(0, 10)}</td>

                  {/* Due Date */}
                  <td className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--color-danger)' }}>{item.due_date ?? item.return_deadline ?? "—"}</td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                      style={{
                        backgroundColor: 'var(--color-danger-soft)',
                        color: 'var(--color-danger)',
                        borderColor: 'var(--color-danger)',
                      }}
                    >
                      Overdue
                    </span>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}
