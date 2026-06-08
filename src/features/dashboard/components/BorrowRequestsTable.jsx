export default function BorrowRequestsTable({ borrows = [], isLoading }) {
  const HEADERS = ["User Name", "Book Title", "Borrow Date", "Due Date", "Status"];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr style={{ borderBottomColor: 'var(--color-border)' }} className="border-b">
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
                <tr key={i} style={{ borderBottomColor: 'var(--color-surface-90)' }} className="border-b">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 rounded animate-pulse" style={{ backgroundColor: 'var(--color-surface-90)' }} />
                    </td>
                  ))}
                </tr>
              ))
            : borrows.length === 0
            ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm" style={{ color: 'var(--color-grey)' }}>
                  No active borrows found.
                </td>
              </tr>
            )
            : borrows.slice(0, 6).map((borrow) => (
                <tr
                  key={borrow.id}
                  className="border-b transition-colors"
                  style={{ borderBottomColor: 'var(--color-surface-90)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-90)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {/* User */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0" style={{ backgroundColor: 'var(--color-surface-90)' }}>
                        {borrow.user_avatar
                          ? <img src={borrow.user_avatar} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
                              {borrow.user_name?.charAt(0) ?? "U"}
                            </div>
                        }
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{borrow.user_name}</span>
                    </div>
                  </td>

                  {/* Book */}
                  <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-grey)' }}>{borrow.book_title ?? borrow.book_name}</td>

                  {/* Borrow Date */}
                  <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-grey)' }}>{borrow.borrow_date ?? borrow.created_at?.slice(0, 10)}</td>

                  {/* Due Date */}
                  <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-grey)' }}>{borrow.due_date ?? borrow.return_deadline ?? "—"}</td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
                        color: 'var(--color-accent)',
                        borderColor: 'var(--color-accent)',
                      }}
                    >
                      Borrowed
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
