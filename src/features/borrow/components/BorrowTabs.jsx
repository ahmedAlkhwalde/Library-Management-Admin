import { NavLink } from "react-router-dom";

export default function BorrowTabs() {
  const tabs = [
    { name: "Active Borrowings", path: "active" },
    { name: "Reserved Books", path: "reserved" },
    { name: "Returned History", path: "history" }, // التبويب الثالث
  ];

  return (
    <div className="flex gap-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `pb-3 font-medium transition-colors ${
              isActive 
                ? "text-indigo-600 border-b-2 border-indigo-600" 
                : "text-gray-500 hover:text-gray-700"
            }`
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
}