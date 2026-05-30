export default function LateBorrowingsTable({ borrowings = [], isLoading }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-red-100">
            {["User Name", "Book Name", "Late Day", "Status"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-red-50">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-red-50 rounded animate-pulse" />
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
                <tr key={item.id} className="border-b border-red-50 hover:bg-red-50/40 transition-colors">
                  {/* User */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                        {item.user_avatar
                          ? <img src={item.user_avatar} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-500 text-xs font-bold">
                              {item.user_name?.charAt(0) ?? "U"}
                            </div>
                        }
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{item.user_name}</span>
                    </div>
                  </td>

                  {/* Book */}
                  <td className="px-4 py-3 text-sm text-gray-600">{item.book_name}</td>

                  {/* Late days */}
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-orange-500">{item.late_days} Days</span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-500 border border-red-100">
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
