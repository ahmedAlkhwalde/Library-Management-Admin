import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { useQuery } from "@tanstack/react-query";
import { getBookDetails } from "../services/booksService";

export default function BookDetailsModal({ 
  open, 
  onClose, 
  bookId,
  onEditClick // to switch from details modal to edit modal
}) {
  const [imageError, setImageError] = useState(false);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookDetails", bookId],
    queryFn: () => getBookDetails(bookId),
    enabled: open && !!bookId, // only fetch when modal is open and we have an ID
  });

  const book = response?.data?.book;

  if (!open) return null;

  const handleEdit = () => {
    onClose(); // close details modal first
    if (onEditClick) {
      onEditClick(book); // pass the book data to parent to open edit modal
    }
  };

  const totalCopies = (book?.available_copies || 0) + (book?.borrowed_copies || 0);
  const availabilityPercentage = totalCopies > 0 
    ? ((book?.available_copies / totalCopies) * 100).toFixed(0) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl rounded-3xl bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
            <p className="mt-1 text-sm text-gray-500">View complete book information</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {isLoading ? (
            // Skeleton loading state
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="aspect-[3/4] w-full rounded-2xl bg-gray-200 animate-pulse" />
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-6 w-1/2 bg-gray-200 rounded-lg animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-gray-200 rounded-xl animate-pulse" />
                  <div className="h-24 bg-gray-200 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          ) : isError ? (
            <div className="text-center py-10">
              <p className="text-red-600">Failed to load book details. Please try again.</p>
              <button
                onClick={onClose}
                className="mt-4 rounded-xl bg-gray-600 px-5 py-2.5 text-white"
              >
                Close
              </button>
            </div>
          ) : !book ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Book not found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              
              {/* Left Column - Cover Image */}
              <div className="md:col-span-1">
                <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-md">
                  {book.image && !imageError ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-auto w-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex aspect-[3/4] w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                      <MenuBookIcon sx={{ fontSize: 80, color: "#9CA3AF" }} />
                      <p className="mt-4 text-sm text-gray-500">No cover image</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="md:col-span-2 space-y-6">
                {/* Title & Status */}
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        book.status === "available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <LocalLibraryIcon fontSize="small" />
                      {book.status === "available" ? "Available" : "Borrowed"}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-gray-600">
                    <PersonIcon fontSize="small" className="text-gray-400" />
                    <span className="text-lg">by {book.author}</span>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Total Copies</p>
                        <p className="text-2xl font-bold text-blue-900">{totalCopies}</p>
                      </div>
                      <ContentCopyIcon className="text-blue-500" />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600">Available</p>
                        <p className="text-2xl font-bold text-green-900">{book.available_copies}</p>
                      </div>
                      <MenuBookIcon className="text-green-500" />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-4 border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-600">Borrowed</p>
                        <p className="text-2xl font-bold text-orange-900">{book.borrowed_copies}</p>
                      </div>
                      <LocalLibraryIcon className="text-orange-500" />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-4 border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-600">Availability</p>
                        <p className="text-2xl font-bold text-purple-900">{availabilityPercentage}%</p>
                      </div>
                      <CategoryIcon className="text-purple-500" />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                    <CategoryIcon className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Category</p>
                      <p className="font-semibold text-gray-900">{book.category_name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                    <MenuBookIcon className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Book ID</p>
                      <p className="font-semibold text-gray-900">#{book.id}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">Created at:</p>
                    <p className="text-sm font-medium text-gray-700">{book.created_at}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {totalCopies > 0 && (
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-gray-700">Availability Rate</span>
                      <span className="font-semibold text-blue-600">{availabilityPercentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                        style={{ width: `${availabilityPercentage}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                  <button
                    onClick={onClose}
                    className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                  >
                    <EditOutlinedIcon fontSize="small" />
                    Edit Book
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}