import React from "react";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CircularProgress from '@mui/material/CircularProgress';

export default function LogoutModal({ isOpen, onClose, onConfirm, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-[450px] rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
        
        {/* أيقونة الخروج */}
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <LogoutOutlinedIcon className="text-red-500 !w-8 !h-8" />
        </div>
        
        {/* النصوص */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Leave?</h2>
        <p className="text-gray-500 mb-8">
          Are you sure you want to log out of your account? You will need to sign in again.
        </p>

        {/* الأزرار */}
        <div className="flex w-full gap-3">
          <button 
            onClick={onClose} 
            disabled={isLoading} 
            className="flex-1 py-3 cursor-pointer rounded-xl border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            disabled={isLoading} 
            className="flex-1 py-3 cursor-pointer rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}