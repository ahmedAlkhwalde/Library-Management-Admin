// BookTable.jsx
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BookDetailsModal from "./BookDetailsModal";
import BooksModal from "./BooksModal";

export default function BookTable({
  books = [],
  isLoading,
  onEdit,
  onDelete,
  onUpdateBook, // if you need separate update handler
}) {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
// eslint-disable-next-line no-unused-vars
const [imgError, setImgError] = useState(false);    
  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setDetailsModalOpen(true);
  };

  const handleEditFromDetails = (book) => {
    setSelectedBook(book);
    setEditModalOpen(true);
    setDetailsModalOpen(false);
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setDetailsModalOpen(false);
    setSelectedBook(null);
  };

  const handleUpdateSubmit = (formData) => {
    if (onUpdateBook) {
      onUpdateBook(formData);
    } else if (onEdit) {
      onEdit(formData);
    }
    handleModalClose();
  };

  return (
    <>
      <div className="overflow-hidden bg-white rounded-2xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {[
                  "BOOK",
                  "AUTHOR",
                  "CATEGORY",
                  "TOTAL COPIES",
                  "AVAILABLE",
                  "BORROWED",
                  "STATUS",
                  "ACTIONS",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-3 text-left text-xs font-bold tracking-wider text-gray-600"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j} className="px-3 py-3">
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : books.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-10 text-center text-sm text-gray-400"
                  >
                    No books found.
                  </td>
                </tr>
              ) : (
                books.map((book) => {
                  const totalCopies =
                    Number(book.available_copies) +
                    Number(book.borrowed_copies);

                  return (
                    <tr
                      key={book.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleViewDetails(book)}
                    >
                      {/* BOOK */}
                      <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3">
                          <img
                             src={imgError ? "https://picsum.photos/id/24/400/500" : book.image}
                            alt={book.title}
                            className="w-10 h-14 rounded-lg object-cover border border-gray-200 cursor-pointer hover:opacity-80"
                            onClick={() => handleViewDetails(book)}
                          />
                          <div>
                            <p
                              className="font-semibold text-sm text-gray-900 cursor-pointer hover:text-blue-600"
                              onClick={() => handleViewDetails(book)}
                            >
                              {book.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              Book #{book.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* AUTHOR */}
                      <td className="px-3 py-3 text-sm text-gray-700">
                        {book.author}
                      </td>

                      {/* CATEGORY */}
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
                          {book.category_name}
                        </span>
                      </td>

                      {/* TOTAL COPIES */}
                      <td className="px-3 py-3 text-sm font-medium text-gray-700">
                        {totalCopies}
                      </td>

                      {/* AVAILABLE */}
                      <td className="px-3 py-3 text-sm text-gray-700">
                        {book.available_copies}
                      </td>

                      {/* BORROWED */}
                      <td className="px-3 py-3 text-sm text-gray-700">
                        {book.borrowed_copies}
                      </td>

                      {/* STATUS */}
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
                            book.status === "available"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          {book.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1">
                          <button
                            className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                            onClick={() => handleViewDetails(book)}
                            title="View Details"
                          >
                            <VisibilityOutlinedIcon fontSize="small" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                            onClick={() => handleEditClick(book)}
                            title="Edit"
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                            onClick={() => onDelete?.(book)}
                            title="Delete"
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      <BookDetailsModal
        open={detailsModalOpen}
        onClose={handleModalClose}
        bookId={selectedBook?.id}
        onEditClick={handleEditFromDetails}
      />

      {/* Edit Modal - reusing your existing BooksModal */}
      <BooksModal
        open={editModalOpen}
        onClose={handleModalClose}
        mode="edit"
        book={selectedBook}
        onSubmit={handleUpdateSubmit}
        isLoading={false} 
      />
    </>
  );
}