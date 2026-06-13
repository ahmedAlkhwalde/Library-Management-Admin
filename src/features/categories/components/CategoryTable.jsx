import CategoryTableRow from "./CategoryTableRow";

const HEADERS = ["CATEGORY", "BOOKS", "CREATED DATE", "ACTIONS"];

export default function CategoryTable({
  categories = [],
  isLoading,
  onEdit,
  onDelete,
}) {
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
                <td colSpan={4} className="px-6 py-16 text-center text-sm" style={{ color: 'var(--color-grey)' }}>
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
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}