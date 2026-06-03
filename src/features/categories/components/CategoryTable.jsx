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
            <tr style={{ borderBottomColor: 'var(--color-border)' }} className="border-b">
              {HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-semibold tracking-wider"
                  style={{ color: 'var(--color-grey)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} style={{ borderBottomColor: 'var(--color-border)' }} className="border-b">
                  {HEADERS.map((h) => (
                    <td key={h} className="px-6 py-4">
                      <div className="h-4 rounded animate-pulse" style={{ backgroundColor: 'var(--color-surface-90)' }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-sm" style={{ color: 'var(--color-grey)' }}>
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
        <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderTopColor: 'var(--color-border)' }}>
          <p className="text-sm" style={{ color: 'var(--color-grey)' }}>
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
                className="w-8 h-8 rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor: n === currentPage ? 'var(--color-accent)' : 'transparent',
                  color: n === currentPage ? 'var(--color-on-accent)' : 'var(--color-text)',
                }}
                onMouseEnter={(e) => {
                  if (n !== currentPage) {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-90)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (n !== currentPage) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
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
      className="px-3 h-8 rounded-lg text-sm font-medium border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        borderColor: 'var(--color-border)',
        color: 'var(--color-text)',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = 'var(--color-surface-90)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {label}
    </button>
  );
}
