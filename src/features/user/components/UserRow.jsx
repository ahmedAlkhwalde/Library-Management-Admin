import {
  VisibilityOutlined,
  LockOutlined,
  LockOpenOutlined,
} from "@mui/icons-material";

export default function UserRow({ user, onView }) {
  const isActive = user.status === "Active";
  const isOnTime = user.overdue === "On Time";
  const statusClass = isActive
    ? "bg-green-50 text-green-600"
    : "bg-red-50 text-red-400";
  const overdueClass = isOnTime
    ? "bg-green-50 text-green-600"
    : "bg-red-50 text-red-400";

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-9 h-9 rounded-full"
          />
          <div>
            <div className="text-sm font-semibold text-gray-800">
              {user.name}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
      <td className="px-6 py-4 text-sm font-medium text-gray-700">
        {user.books}
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex px-4 py-1 rounded-full text-[11px] font-bold ${statusClass}`}
        >
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex px-4 py-1 rounded-full text-[11px] font-bold ${overdueClass}`}
        >
          {user.overdue}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-all"
            aria-label="View user"
            onClick={() => onView?.(user)}
          >
            <VisibilityOutlined className="w-4! h-4!" />
          </button>
          <button
            className={`w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 transition-all ${
              isActive
                ? "hover:border-green-200 hover:bg-green-50 text-gray-400 hover:text-green-500"
                : "hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-500"
            }`}
            aria-label={isActive ? "Block user" : "Unblock user"}
          >
            {isActive ? (
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
