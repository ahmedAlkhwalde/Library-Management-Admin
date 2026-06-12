import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useCategoriesQuery } from "../../categories/services/categoriesService";

export default function BookModal({
  open,
  onClose,
  onSubmit,
  mode,
  book = null,
  isLoading,
}) {
  const { data: categoriesData } = useCategoriesQuery();
  const [errors, setErrors] = useState({});
  const categories = categoriesData?.data || [];
// eslint-disable-next-line no-unused-vars
const [imgError, setImgError] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);


  useEffect(() => {
  if (mode === "edit" && book) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(book.title || "");
    setAuthor(book.author || "");
    setAvailableCopies(book.available_copies || "");

    setPreview(book.image || null);
    setImage(null);
  }

  if (mode === "create") {
    setTitle("");
    setAuthor("");
    setCategoryId("");
    setAvailableCopies("");
    setImage(null);
    setPreview(null);
  }
}, [book, mode, categories]);


  if (!open) return null;

  const validate = () => {
  const newErrors = {};

  if (!title.trim()) {
    newErrors.title = "Title is required";
  }

  if (!author.trim()) {
    newErrors.author = "Author is required";
  }

  if (mode === "create" && !categoryId) {
    newErrors.categoryId = "Category is required";
  }

  if (!availableCopies || Number(availableCopies) <= 0) {
    newErrors.availableCopies =
      "Available copies must be greater than 0";
  }

  if (mode === "create" && !image) {
  newErrors.image = "Book cover is required";
}

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!validate()) return;

  const formData = new FormData();

  if (mode === "edit" && book?.id) {
    formData.append("book_id", book.id);
  }

  formData.append("title", title);
  formData.append("author", author);
  formData.append("category_id", categoryId);
  formData.append("available_copies", availableCopies);

  if (image instanceof File) {
    formData.append("image", image);
  }

  onSubmit?.(formData);
};
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
  {mode === "edit"
    ? "Edit Book"
    : "Add New Book"}
</h2>

            <p className="mt-1 text-sm text-gray-500">
  {mode === "edit"
    ? "Update book information."
    : "Create a new book in the library."}
</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Book Title
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
              {errors.title && (
  <p className="mt-1 text-sm text-red-500">
    {errors.title}
  </p>
)}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Author
              </label>

              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
              {
                errors.author && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.author}
                    </p>
               )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>

              <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  disabled={mode === "edit"}
                  className={`w-full rounded-xl border px-4 py-3 outline-none
                  ${
                    mode === "edit"
                      ? "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
              >
                
                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
                {errors.categoryId && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.categoryId}
                    </p>
                )}
                {mode === "edit" && (
                  <p className="mt-1 text-xs text-gray-500">
                    Category cannot be changed after creating the book.
                  </p>
                )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Available Copies
              </label>

              <input
                type="number"
                value={availableCopies}
                onChange={(e) =>
                  setAvailableCopies(e.target.value)
                }
                placeholder="0"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
              {errors.availableCopies && (
                <p className="mt-1 text-sm text-red-500">
                    {errors.availableCopies}
                </p>
               )}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Book Cover
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition hover:border-blue-500 hover:bg-blue-50">
              {preview ? (
                <img
                  src={imgError ? "https://picsum.photos/id/24/400/500" : preview}
                  alt="Preview"
                  className="h-40 rounded-xl object-cover"
                />
              ) : (
                <>
                  <CloudUploadOutlinedIcon
                    sx={{ fontSize: 40 }}
                    className="text-gray-400"
                  />

                  <p className="mt-3 font-medium text-gray-700">
                    Upload Book Cover
                  </p>

                  <p className="text-sm text-gray-500">
                    Click to browse image
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>

            {image && (
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <ImageOutlinedIcon fontSize="small" />
                {image.name}
              </div>
            )}
            {errors.image && (
                 <p className="mt-2 text-sm text-red-500">
                   {errors.image}
                 </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
  type="submit"
  disabled={isLoading}
  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
>
  {isLoading && (
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
  )}

  {isLoading
    ? mode === "edit"
      ? "Updating..."
      : "Saving..."
    : mode === "edit"
      ? "Update Book"
      : "Save Book"}
</button>
          </div>
        </form>
      </div>
    </div>
  );
}