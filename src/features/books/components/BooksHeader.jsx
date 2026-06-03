import AddIcon from "@mui/icons-material/Add";

export default function BooksHeader({ onAddBook }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Book Management
        </h1>

        <p className="mt-2 text-lg text-gray-500">
          Add, edit, delete and manage library books.
        </p>
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