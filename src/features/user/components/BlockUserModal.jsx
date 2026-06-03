import React from "react";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import CircularProgress from '@mui/material/CircularProgress'; // تأكد من تثبيت mui

export default function BlockUserModal({ isOpen, onClose, onConfirm, userName, isBlocked, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-[600px] rounded-xl px-20 py-15 shadow-2xl flex flex-col items-center text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isBlocked ? 'bg-green-50' : 'bg-red-50'}`}>
          {isBlocked ? <LockOpenOutlinedIcon className="text-green-500 !w-10 !h-10" /> : <WarningAmberRoundedIcon className="text-red-500 !w-10 !h-10" />}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{isBlocked ? "Unblock User?" : "Block User?"}</h2>
        <p className="text-gray-500 mb-8">Are you sure you want to {isBlocked ? "unblock" : "block"} <strong>{userName}</strong>?</p>
        <div className="flex w-full gap-3">
          <button onClick={onClose} disabled={isLoading} className="flex-1 py-3 rounded-xl border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} disabled={isLoading} className={`flex-1 py-3 rounded-xl font-semibold text-white ${isBlocked ? 'bg-blue-600' : 'bg-red-600'} flex items-center justify-center`}>
            {isLoading ? <CircularProgress size={20} color="inherit" /> : `Yes, ${isBlocked ? "Unblock" : "Block"}`}
          </button>
        </div>
      </div>
    </div>
  );
}