export default function BorrowTable({ data = [], onReturn }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 border-b border-gray-100 uppercase text-[11px] font-bold text-gray-500 tracking-wider">
          <tr>
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Book Title</th>
            <th className="px-6 py-4">Borrow Date</th>
            <th className="px-6 py-4">Return Deadline</th>
            <th className="px-6 py-4">Time Remaining</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 flex items-center gap-3">
                <img src={item.book.image} className="w-8 h-8 rounded-full object-cover" alt="book" />
                <div>
                  <p className="font-medium text-gray-900">{item.user.name}</p>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-700">{item.book.title}</td>
              <td className="px-6 py-4 text-gray-500">{item.borrowed_at}</td>
              <td className="px-6 py-4 text-gray-500">{item.due_at}</td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600">
                  {item.time_remaining}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => onReturn(item.id)}
                  className="px-4 py-2 cursor-pointer text-sm text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Mark as Returned
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}