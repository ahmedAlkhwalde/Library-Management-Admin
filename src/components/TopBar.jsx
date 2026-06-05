import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { markAllNotificationsRead } from "../features/dashboard/store/dashboardSlice";

export default function TopBar() {
  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const notificationsCount = useSelector(
    (s) => s.dashboard?.notificationsCount ?? 0,
  );
  const notifications = useSelector((s) => s.dashboard?.notifications ?? []);
  const user = useSelector((s) => s.auth?.user);

  const [notifOpen, setNotifOpen] = useState(false);

  const handleBellClick = () => {
    setNotifOpen((v) => !v);
    if (notificationsCount > 0) dispatch(markAllNotificationsRead());
  };

  const displayName = userData?.name || "Admin";
  const displayRole = userData?.role || "Administrator";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="hidden md:flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shrink-0">
      {/* Search */}
      <div className="relative w-72">
        <input
          type="text"
          placeholder="Search books, users, categories…"
          className="w-full pl-9 pr-16 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
        />
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-300 font-mono">
          Ctrl+K
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 relative">
        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={handleBellClick}
            className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <NotificationsNoneOutlinedIcon className="!w-5 !h-5 text-gray-500" />
            {notificationsCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center ring-1 ring-white">
                {notificationsCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setNotifOpen(false)}
              />
              <div className="absolute right-0 top-11 w-72 bg-white rounded-xl border border-gray-200 shadow-xl z-50">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-800">
                    Notifications
                  </p>
                  {notificationsCount === 0 && (
                    <span className="text-xs text-gray-400">All caught up</span>
                  )}
                </div>
                <ul className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <li className="px-4 py-6 text-center text-xs text-gray-400">
                      No notifications
                    </li>
                  ) : (
                    notifications.map((n) => (
                      <li
                        key={n.id}
                        className={`px-4 py-3 text-xs text-gray-600 leading-relaxed ${n.read ? "opacity-50" : "bg-indigo-50/40"}`}
                      >
                        {n.message}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Admin info */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className=" w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
            {userData?.image ? (
              <img
                className="w-8 h-8 rounded-full object-cover bg-indigo-600 shrink-0"
                src={userData.image}
                alt="Profile"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}{" "}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 leading-none">
              {displayName}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{displayRole}</p>
          </div>
          <KeyboardArrowDownIcon className="!w-4 !h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </div>
  );
}
