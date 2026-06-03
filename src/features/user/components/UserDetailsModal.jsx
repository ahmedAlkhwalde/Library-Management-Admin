import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useUserDetailsQuery } from "../services/userService";
import { CircularProgress } from "@mui/material";

export default function UserDetailsModal({ isOpen, onClose, userId }) {
  const { data, isLoading, isError } = useUserDetailsQuery(userId);
  const user = data?.data?.user;
  const borrowedBooks = user?.currently_borrowed_books || [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-[650px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#6366f1] px-6 py-4 flex justify-between items-center">
          <h2 className="text-white font-semibold">User Profile & Borrowing Details</h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1 transition-colors">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-20"><CircularProgress /></div>
        ) : isError || !user ? (
          <div className="p-20 text-center text-red-500">Error loading user data.</div>
        ) : (
          <div className="p-6">
            {/* User Info */}
            <div className="flex items-center gap-4 mb-8">
              <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full object-cover border border-gray-100" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.mobile}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                user.status === 'banned' 
                ? 'bg-red-50 text-red-600 border-red-100' 
                : 'bg-green-50 text-green-600 border-green-100'
              }`}>
                • {user.status.toUpperCase()}
              </div>
            </div>

            {/* Borrowed Books */}
            <h4 className="font-bold text-gray-900 mb-4">Currently Borrowed Books</h4>
            
            <div className="border border-gray-100 rounded-2xl overflow-hidden max-h-[300px] flex flex-col bg-white">
              {borrowedBooks.length > 0 ? (
                <div className="overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 text-[11px] font-bold text-gray-400 tracking-wider">BOOK NAME</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-gray-400 tracking-wider">BORROW DATE</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-gray-400 tracking-wider">DUE DATE</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-gray-400 tracking-wider">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {borrowedBooks.map((b, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4 font-medium text-gray-700">{b.book_name}</td>
                          <td className="px-4 py-4 text-gray-500">{b.borrow_date}</td>
                          <td className="px-4 py-4 text-gray-500">{b.due_date}</td>
                          <td className="px-4 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                              b.time_remaining.status === 'overdue' 
                              ? 'bg-red-50 text-red-600' 
                              : 'bg-green-50 text-green-600'
                            }`}>
                              {b.time_remaining.label}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400">
                  No books currently borrowed by this user.
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={onClose} 
                className="px-6 py-2 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}