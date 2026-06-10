import { useState } from "react";
import BooksHeader from "../features/books/components/BooksHeader";
import BookTable from "../features/books/components/BookTable";
import { useBooksQuery, useCreateBookMutation, useDeleteBookMutation, useUpdateBookMutation } from "../features/books/services/booksService";
import BooksModal from "../features/books/components/BooksModal";
import BookPagination from "../features/books/components/BookPagination";
import DeleteConfirmationDialog from "../features/books/components/DeleteConfirmationDialog";

function BooksPage() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filters, setFilters] = useState({ category_id: "", status: "all" });
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const { data, isLoading, error } = useBooksQuery(
    page,
    filters.category_id || null,
    filters.status
  );

  const createBookMutation = useCreateBookMutation({
    onSuccess: () => {
      setIsModalOpen(false);
    },
  });
  const updateBookMutation = useUpdateBookMutation({
    onSuccess: () => {
      setIsModalOpen(false);
      setSelectedBook(null);
    },
  });
  const deleteBookMutation = useDeleteBookMutation({
    onSuccess: () => {
      setDeleteDialogOpen(false);
      setBookToDelete(null);
      console.log("Book deleted successfully");
    },
    onError: (error) => {
      setDeleteDialogOpen(false);
      setBookToDelete(null);
      console.error("Delete failed:", error.response?.data || error);
    },
  });

  const handleCreateBook = (formData) => {
    createBookMutation.mutate(formData);
  };

  const handleUpdateBook = (formData) => {
    formData.append("book_id", selectedBook.id);
    updateBookMutation.mutate(formData);
  };

  const handleEditBook = (book) => {
    console.log("Editing book:", book);
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      deleteBookMutation.mutate(bookToDelete.id);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  if (error) {
    return <div>{JSON.stringify(error.response?.data)}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 max-w-7xl mx-auto">
        <BooksHeader onAddBook={() => setIsModalOpen(true)} />
        <BookTable
          books={data?.books || []}
          isLoading={isLoading}
          onEdit={handleEditBook}
          onDelete={handleDeleteClick}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <BookPagination
          currentPage={data?.pagination?.current_page}
          lastPage={data?.pagination?.last_page}
          onPageChange={setPage}
        />
      </main>

      <BooksModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBook(null);
        }}
        onSubmit={selectedBook ? handleUpdateBook : handleCreateBook}
        isLoading={selectedBook ? updateBookMutation.isPending : createBookMutation.isPending}
        mode={selectedBook ? "edit" : "create"}
        book={selectedBook}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setBookToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        isLoading={deleteBookMutation.isPending}
        bookTitle={bookToDelete?.title}
      />
    </div>
  );
}

export default BooksPage;