import React from "react";
import { Close } from "@mui/icons-material";

const DEFAULT_BORROWED_BOOKS = [
  {
    title: "Clean Code",
    borrow: "24 May, 2026",
    due: "31 May, 2026",
    status: "5 Days Overdue",
    type: "overdue",
  },
  {
    title: "Atomic Habits",
    borrow: "26 May, 2026",
    due: "02 June, 2026",
    status: "3 Days Left",
    type: "active",
  },
];

export default function UserDetailsModal({
  isOpen,
  onClose,
  user,
  borrowedBooks = DEFAULT_BORROWED_BOOKS,
}) {
  if (!isOpen || !user) return null;

  const isActive = user.status === "Active";
  const statusClass = isActive
    ? "bg-green-50 text-green-600"
    : "bg-red-50 text-red-400";
  const statusDotClass = isActive ? "bg-green-500" : "bg-red-400";

  return (
    // الخلفية المعتمة (Overlay)
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      {/* نافذة المودال */}
      <div className="bg-white w-full max-w-150 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* الرأس */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            User Profile & Borrowing Details
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Close className="text-gray-500" />
          </button>
        </div>

        {/* بيانات المستخدم */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src="https://i.pravatar.cc/60"
            alt="Avatar"
            className="w-16 h-16 rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-bold text-lg">{user.name}</h3>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="text-gray-500 text-sm">{user.phone}</p>
          </div>
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1.5 ${statusClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass}`} />
            {user.status}
          </span>
        </div>

        {/* جدول الكتب المستعارة */}
        <p className="font-semibold text-gray-800 mb-4">
          Currently Borrowed Books
        </p>
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            <div>Book Name</div>
            <div>Borrow Date</div>
            <div>Due Date</div>
            <div>Time Remaining</div>
          </div>

          {borrowedBooks.map((book, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-4 px-4 py-4 items-center border-t border-gray-50 text-[13px]"
            >
              <div className="font-semibold">{book.title}</div>
              <div className="text-gray-500">{book.borrow}</div>
              <div className="text-gray-500">{book.due}</div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
                  book.type === "overdue"
                    ? "bg-red-50 text-red-400"
                    : "bg-blue-50 text-blue-500"
                }`}
              >
                {book.status}
              </span>
            </div>
          ))}
        </div>

        {/* زر الإغلاق */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-2.5 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
