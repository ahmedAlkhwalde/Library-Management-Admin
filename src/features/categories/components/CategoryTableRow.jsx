import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

export default function CategoryTableRow({ category, onEdit, onDelete }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Category */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <span className="text-indigo-500 text-lg">{category.icon ?? "📁"}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{category.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{category.description}</p>
          </div>
        </div>
      </td>

      {/* Books */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-gray-500">
          <MenuBookOutlinedIcon className="!w-4 !h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">{category.books_count ?? 0}</span>
          <span className="text-xs text-gray-400">Books</span>
        </div>
      </td>

      {/* Created Date */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-gray-500">
          <CalendarTodayOutlinedIcon className="!w-4 !h-4 text-gray-400" />
          <div>
            <p className="text-sm text-gray-700">{category.created_date}</p>
            <p className="text-xs text-gray-400">{category.created_time}</p>
          </div>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit?.(category)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border transition-all"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-grey)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.backgroundColor = 'var(--color-accent-soft)';
              e.currentTarget.style.color = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-grey)';
            }}
            aria-label="Edit category"
          >
            <EditOutlinedIcon className="!w-4 !h-4" />
          </button>
          <button
            onClick={() => onDelete?.(category)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border transition-all"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-grey)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-danger)';
              e.currentTarget.style.backgroundColor = 'var(--color-danger-soft)';
              e.currentTarget.style.color = 'var(--color-danger)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-grey)';
            }}
            aria-label="Delete category"
          >
            <DeleteOutlineIcon className="!w-4 !h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
