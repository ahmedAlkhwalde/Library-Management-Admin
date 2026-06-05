import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../store/borrowSlice";

export default function BorrowPagination({ pagination }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((s) => s.borrow.currentPage);
  
  if (!pagination || pagination.last_page <= 1) return null;

  const { last_page, total } = pagination;

  // دالة لتغيير الصفحة والتأكد من أنها ضمن الحدود
  const handlePageChange = (page) => {
    if (page >= 1 && page <= last_page) {
      dispatch(setCurrentPage(page));
      // التمرير لأعلى الصفحة عند تغيير الصفحة لتحسين تجربة المستخدم
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-between items-center p-6 border-t border-gray-100 bg-white">
      <span className="text-sm text-gray-500 font-medium">
        Showing total <span className="font-bold text-gray-900">{total}</span> items
      </span>
      
      <div className="flex gap-1.5">
        <button 
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Previous
        </button>
        
        {/* عرض أرقام الصفحات */}
        {Array.from({ length: last_page }, (_, i) => i + 1).map((p) => (
          <button 
            key={p} 
            onClick={() => handlePageChange(p)} 
            className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
              currentPage === p 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "border border-gray-200 hover:bg-gray-50 text-gray-600"
            }`}
          >
            {p}
          </button>
        ))}
        
        <button 
          disabled={currentPage === last_page}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
}