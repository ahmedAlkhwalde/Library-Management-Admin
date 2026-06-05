export default function LateBorrowingsTable({ borrowings = [], isLoading }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr style={{ borderBottomColor: 'var(--color-danger-soft)' }} className="border-b">
            {["User Name", "Book Name", "Late Day", "Status"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold tracking-wide" style={{ color: 'var(--color-grey)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} style={{ borderBottomColor: 'var(--color-danger-soft)' }} className="border-b">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 rounded animate-pulse" style={{ backgroundColor: 'var(--color-danger-soft)' }} />
                    </td>
                  ))}
                </tr>
              ))
            : borrowings.length === 0
            ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-400">
                  No late borrowings.
                </td>
              </tr>
            )
            : borrowings.map((item) => (
                <tr key={item.id} className="border-b transition-colors" style={{ borderBottomColor: 'var(--color-danger-soft)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-danger-soft)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
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
                  <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-grey)' }}>{item.book_name}</td>

                  {/* Late days */}
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-danger)' }}>{item.late_days} Days</span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border" style={{ backgroundColor: 'var(--color-danger-soft)', color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}>
                      Late
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
