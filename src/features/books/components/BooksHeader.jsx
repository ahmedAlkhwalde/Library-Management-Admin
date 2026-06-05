import AddIcon from "@mui/icons-material/Add";
import MenuBookIcon from '@mui/icons-material/MenuBook';export default function BooksHeader({ onAddBook }) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <MenuBookIcon className="!w-5 !h-5 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Book Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Add, edit, delete and manage library books.
              </p>
            </div>
          </div>

      <button
        onClick={onAddBook}
        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
      >
        <AddIcon fontSize="small" />
        Add New Book
      </button>
    </div>
  );
}