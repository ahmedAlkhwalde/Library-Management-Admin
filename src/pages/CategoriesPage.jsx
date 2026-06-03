import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import AppSnackbar from "../components/AppSnackbar";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import CategoryFiltersBar from "../features/categories/components/CategoryFiltersBar";
import CategoryTable from "../features/categories/components/CategoryTable";
import CategoryModal from "../features/categories/components/CategoryModal";
import { useCategoriesQuery, useDeleteCategoryMutation } from "../features/categories/services/categoriesService";

// ─── Fallback mock data (used when the API is not reachable) ──────────────────
const MOCK_CATEGORIES = [
  { id: 1, name: "Fiction", description: "Fictional stories and novels", books_count: 128, created_date: "May 12, 2024", created_time: "10:30 AM", status: "active", icon: "📘" },
  { id: 2, name: "Science", description: "Science and research books", books_count: 96, created_date: "Apr 24, 2024", created_time: "02:15 PM", status: "active", icon: "🔬" },
  { id: 3, name: "History", description: "Historical events and periods", books_count: 75, created_date: "Apr 10, 2024", created_time: "11:20 AM", status: "active", icon: "🏛️" },
  { id: 4, name: "Health", description: "Health and wellness books", books_count: 42, created_date: "Mar 18, 2024", created_time: "09:45 AM", status: "active", icon: "❤️" },
  { id: 5, name: "Technology", description: "Technology and computing", books_count: 42, created_date: "Mar 05, 2024", created_time: "03:18 PM", status: "active", icon: "💻" },
  { id: 6, name: "Arts", description: "Art, music and culture", books_count: 38, created_date: "Feb 20, 2024", created_time: "01:00 PM", status: "inactive", icon: "🎨" },
];

export default function CategoriesPage() {
  // ─── Filters state ──────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ─── Modal state ────────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  // ─── Delete confirmation state ───────────────────────────────────────────
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  // ─── Snackbar state ─────────────────────────────────────────────────────────
  const [snackbar, setSnackbar] = useState({ open: false, message: "", variant: "success" });
  const openSnackbar = (message, variant = "success") =>
    setSnackbar({ open: true, message, variant });

  // ─── Data fetching ──────────────────────────────────────────────────────────
  const { data, isLoading, isError } = useCategoriesQuery({ page: currentPage, search, status });

  // Use real data if available, otherwise fall back to mock
  const categories = data?.data ?? (isError ? applyLocalFilters(MOCK_CATEGORIES, search, status) : []);
  const totalCount = data?.total ?? (isError ? categories.length : 0);
  const totalPages = data?.last_page ?? (isError ? Math.ceil(totalCount / 6) : 1);

  // ─── Delete ─────────────────────────────────────────────────────────────────
  const deleteMutation = useDeleteCategoryMutation();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!categoryToDelete) return;
    setDeletingId(categoryToDelete.id);
    deleteMutation.mutate(categoryToDelete.id, {
      onSuccess: () => {
        openSnackbar("Category deleted successfully.");
        setDeletingId(null);
        setDeleteDialogOpen(false);
        setCategoryToDelete(null);
      },
      onError: (err) => {
        const msg = err?.response?.data?.message || "Failed to delete category.";
        openSnackbar(msg, "error");
        setDeletingId(null);
      },
    });
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  // ─── Edit ───────────────────────────────────────────────────────────────────
  const handleEdit = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Main content ── */}
      <main className="p-6 max-w-7xl mx-auto">
        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <FolderOpenOutlinedIcon className="!w-5 !h-5 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Category Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage book categories, add new categories, edit or remove existing ones.
              </p>
            </div>
          </div>

          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            <AddIcon className="!w-5 !h-5" />
            Add Category
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          {/* Filters */}
          <div className="px-6 pt-5 pb-4 border-b border-gray-100">
            <CategoryFiltersBar
              onSearchChange={(v) => { setSearch(v); setCurrentPage(1); }}
              onStatusChange={(v) => { setStatus(v === "All Status" ? "" : v.toLowerCase()); setCurrentPage(1); }}
              onCategoryChange={() => setCurrentPage(1)}
            />
          </div>

          {/* Table */}
          <CategoryTable
            categories={categories}
            isLoading={isLoading && !isError}
            totalCount={totalCount}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        </div>
      </main>

      {/* ── Modal ── */}
      <CategoryModal
        open={modalOpen}
        category={editingCategory}
        onClose={handleModalClose}
      />

      {/* ── Delete Confirmation Dialog ── */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={deletingId === categoryToDelete?.id}
      />

      {/* ── Snackbar ── */}
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        variant={snackbar.variant}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
      />
    </div>
  );
}

// Applies search + status filters locally on mock data
function applyLocalFilters(categories, search, status) {
  return categories.filter((c) => {
    const matchesSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !status || c.status === status;
    return matchesSearch && matchesStatus;
  });
}
