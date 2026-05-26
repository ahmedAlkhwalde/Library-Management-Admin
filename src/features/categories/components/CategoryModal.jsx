import { useState, useLayoutEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "../services/categoriesService";

export default function CategoryModal({ open, category, onClose, onSuccess, onError }) {
  const isEditing = !!category;
  const [values, setValues] = useState({ name: "", description: "", status: "active" });
  const createMutation = useCreateCategoryMutation();
  const updateMutation = useUpdateCategoryMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  useLayoutEffect(() => {
    if (open) {
      setValues(category
        ? { name: category.name ?? "", description: category.description ?? "", status: category.status ?? "active" }
        : { name: "", description: "", status: "active" }
      );
    }
  }, [category, open]);

  if (!open) return null;

  const handleChange = (e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!values.name.trim()) { onError?.("Category name is required."); return; }
    const mutation = isEditing ? updateMutation : createMutation;
    const payload = isEditing ? { id: category.id, ...values } : values;
    mutation.mutate(payload, {
      onSuccess: () => { onSuccess?.(`Category ${isEditing ? "updated" : "created"} successfully.`); onClose?.(); },
      onError: (err) => onError?.(err?.response?.data?.message || "Something went wrong."),
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">
              {isEditing ? "Edit Category" : "Add New Category"}
            </h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
              <CloseIcon className="!w-5 !h-5" />
            </button>
          </div>

          <div className="px-6 py-5 space-y-4">
            <Field label="Category Name" required>
              <input name="name" value={values.name} onChange={handleChange} placeholder="e.g. Science Fiction"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors" />
            </Field>
            <Field label="Description">
              <textarea name="description" value={values.description} onChange={handleChange} rows={3}
                placeholder="Brief description of the category…"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors resize-none" />
            </Field>
            <Field label="Status">
              <select name="status" value={values.status} onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-indigo-400 transition-colors">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={isPending}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
              {isPending ? "Saving…" : isEditing ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}