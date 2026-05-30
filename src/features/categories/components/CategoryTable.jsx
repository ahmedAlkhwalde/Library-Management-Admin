import CategoryTableRow from "./CategoryTableRow";

const HEADERS = ["CATEGORY", "BOOKS", "CREATED DATE", "STATUS", "ACTIONS"];

export default function CategoryTable({
  categories = [],
  isLoading,
  totalCount = 0,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onEdit,
  onDelete,
  deletingId,
}) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startItem = (currentPage - 1) * 6 + 1;
  const endItem = Math.min(currentPage * 6, totalCount);

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-400 tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                  {HEADERS.map((h) => (
                    <td key={h} className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-gray-400 text-sm">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <CategoryTableRow
                  key={cat.id}
                  category={cat}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDeleting={deletingId === cat.id}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalCount > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {startItem} to {endItem} of {totalCount} categories
          </p>
          <div className="flex items-center gap-1">
            <PaginationBtn
              label="Previous"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {pageNumbers.map((n) => (
              <button
                key={n}
                onClick={() => onPageChange?.(n)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  n === currentPage
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {n}
              </button>
            ))}
            <PaginationBtn
              label="Next"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
}

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
