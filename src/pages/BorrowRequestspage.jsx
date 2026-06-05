import { Outlet } from "react-router-dom";
import BorrowTabs from "../features/borrow/components/BorrowTabs";
import BorrowPagination from "../features/borrow/components/BorrowPagination"; // يقرأ ويكتب في Redux

export default function BorrowRequestsView() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Borrow Management</h1>
        <BorrowTabs />
        <div className="bg-white rounded-2xl border border-gray-200 mt-6 shadow-sm">
          {/* هنا يتم عرض الجدول الخاص بكل صفحة */}
          <Outlet /> 
          <BorrowPagination />
        </div>
      </div>
    </div>
  );
}