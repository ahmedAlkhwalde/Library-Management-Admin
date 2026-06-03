import UserRow from "./UserRow.jsx";

const HEADERS = [
  "USER",
  "PHONE",
  "BORROWED BOOKS",
  "USER STATUS",
  "OVERDUE STATUS",
  "ACTIONS",
];

export default function UserTable({ users = [], isLoading, onView, onBlock }) {
  // التأكد أن users مصفوفة دائماً لتجنب خطأ map
  const safeUsers = Array.isArray(users) ? users : [];

  return (
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
            // حالة التحميل (Skeleton)
            Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-b border-gray-100">
                {HEADERS.map((h) => (
                  <td key={h} className="px-6 py-4">
                    <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))
          ) : safeUsers.length === 0 ? (
            // حالة عدم وجود نتائج
            <tr>
              <td
                colSpan={6}
                className="px-6 py-16 text-center text-gray-400 text-sm"
              >
                No users found.
              </td>
            </tr>
          ) : (
            // عرض البيانات
            safeUsers.map((user, index) => (
              <UserRow
                key={user.id || `${user.email}-${index}`}
                user={user}
                onView={onView}
                onBlock={onBlock} // تم تمرير الدالة هنا لتصل إلى الزر
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}