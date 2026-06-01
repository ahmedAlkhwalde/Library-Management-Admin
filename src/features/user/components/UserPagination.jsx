export default function UserPagination({
  totalCount = 0,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  if (totalCount === 0) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startItem = (currentPage - 1) * 6 + 1;
  const endItem = Math.min(currentPage * 6, totalCount);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
      <p className="text-sm text-gray-500">
        Showing {startItem} to {endItem} of {totalCount} users
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
