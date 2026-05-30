import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../config/apiClient";

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const formatTime = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

const normalizeCategory = (cat) => ({
  ...cat,
  status: cat.status || "active",
  created_date: formatDate(cat.created_at),
  created_time: formatTime(cat.created_at),
});

export const fetchCategories = async ({ page = 1, search = "", status = "" } = {}) => {
  const response = await apiClient.get("/categories", { params: { page, search, status } });
  const raw = response.data?.data?.categories || [];
  const categories = raw.map(normalizeCategory);
  const total = categories.length;
  return { data: categories, total, last_page: Math.max(1, Math.ceil(total / 6)) };
};

export const createCategory = async (payload) => {
  const response = await apiClient.post("/categories/create", payload);
  return response.data;
};

export const updateCategory = async ({ id, ...payload }) => {
  const response = await apiClient.post("/categories/update", { category_id: id, ...payload });
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await apiClient.delete("/categories/delete", { data: { category_id: id } });
  return response.data;
};

export const useCategoriesQuery = (params = {}) =>
  useQuery({
    queryKey: ["categories", params],
    queryFn: () => fetchCategories(params),
    placeholderData: (prev) => prev,
  });

export const useCreateCategoryMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onMutate: async (newCategory) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previous = queryClient.getQueryData(["categories"]);
      queryClient.setQueryData(["categories"], (old) => ({
        ...old,
        data: [...(old?.data || []), { ...newCategory, id: Date.now() }],
        total: (old?.total || 0) + 1,
      }));
      return { previous };
    },
    onError: (_err, _vars, context) => queryClient.setQueryData(["categories"], context.previous),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    ...options,
  });
};

export const useUpdateCategoryMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previous = queryClient.getQueryData(["categories"]);
      queryClient.setQueryData(["categories"], (old) => ({
        ...old,
        data: (old?.data || []).map((cat) => cat.id === updated.id ? { ...cat, ...updated } : cat),
      }));
      return { previous };
    },
    onError: (_err, _vars, context) => queryClient.setQueryData(["categories"], context.previous),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    ...options,
  });
};

export const useDeleteCategoryMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previous = queryClient.getQueryData(["categories"]);
      queryClient.setQueryData(["categories"], (old) => ({
        ...old,
        data: (old?.data || []).filter((cat) => cat.id !== id),
        total: Math.max(0, (old?.total || 1) - 1),
      }));
      return { previous };
    },
    onError: (_err, _vars, context) => queryClient.setQueryData(["categories"], context.previous),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    ...options,
  });
};