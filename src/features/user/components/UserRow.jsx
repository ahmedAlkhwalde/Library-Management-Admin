import {
  VisibilityOutlined,
  LockOutlined,
  LockOpenOutlined,
} from "@mui/icons-material";

export default function UserRow({ user, onView, onBlock }) {
  const isBlocked = user.status === "banned";

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={
              user.image && user.image.trim() !== ""
                ? user.image
                : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Ccircle cx='12' cy='8' r='4'/%3E%3Cpath d='M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z'/%3E%3C/svg%3E"
            }
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover bg-gray-200"
          />
          <div>
            <div className="text-sm font-semibold text-gray-800">
              {user.name}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{user.mobile}</td>
      <td className="px-6 py-4 text-sm font-medium text-gray-700">
        {user.borrowed_books_count}
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex px-4 py-1 rounded-full text-[11px] font-bold ${!isBlocked ? "bg-green-50 text-green-600" : "bg-red-50 text-red-400"}`}
        >
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{user.created_at}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView?.(user)}
            className="w-8 cursor-pointer h-8 flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50  text-blue-500 transition-all"
          >
            <VisibilityOutlined className="w-4! h-4!" />
          </button>
          <button
            onClick={() => onBlock?.(user)}
            className={`w-8 h-8 flex items-center cursor-pointer justify-center rounded-lg border border-gray-200 transition-all ${isBlocked ? "border-green-200 bg-green-50 text-green-500" : "border-red-200 bg-red-50 text-red-500"}`}
          >
            {isBlocked ? (
              <LockOpenOutlined className="w-4! h-4!" />
            ) : (
              <LockOutlined className="w-4! h-4!" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}
