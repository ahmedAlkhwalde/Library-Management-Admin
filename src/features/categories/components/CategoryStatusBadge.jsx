export default function CategoryStatusBadge({ status }) {
  const isActive = status === "active" || status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
        isActive
          ? "bg-emerald-50 text-emerald-600"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-gray-400"
        }`}
      />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
