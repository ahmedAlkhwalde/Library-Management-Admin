import { useSelector, useDispatch } from "react-redux";
import { useBorrows } from "../service/borrowService";
import { setCurrentPage } from "../store/borrowSlice";

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

export default function ReturnedBooksTable() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((s) => s.borrow);

  // نستخدم 'returned' لجلب البيانات المؤرشفة
  const { data, isLoading } = useBorrows("returned", currentPage);

  const HEADERS = [
    "User",
    "Book Title",
    "Borrow Date",
    "Return Date",
    "Status",
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

  return (
    <div className="w-full">
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
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={5} className="px-6 py-4">
                    <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : borrows.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-16 text-center text-gray-400"
                >
                  No returned books found.
                </td>
              </tr>
            ) : (
              borrows.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
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
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.user.name}
                      </p>
                      <p className="text-xs text-gray-400">{item.user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{item.book.title}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {item.borrowed_at}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {item.returned_at || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-[11px] font-semibold">
                      Returned
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {borrows.length > 0 && (
        <div className="flex items-center justify-between px-6 py-4 bg-white">
          <p className="text-sm text-gray-500">
            Showing {startItem} to {endItem} of {total} results
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
                  className={`w-8 h-8 rounded-lg text-sm font-medium ${n === currentPage ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  {n}
                </button>
              ),
            )}
            <PaginationBtn
              label="Next"
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
              disabled={currentPage >= last_page}
            />
          </div>
        </div>
      )}
    </div>
  );
}
