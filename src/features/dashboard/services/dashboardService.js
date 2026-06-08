import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../config/apiClient";

// ─── API functions ─────────────────────────────────────────────────────────────

export const fetchDashboardStats = async () => {
  const response = await apiClient.get("/statistics");
  return response.data?.data || {
    total_books: 0,
    total_users: 0,
    borrowed_books: 0,
    available_books: 0,
    pending_requests: 0,
    overdue_borrows: 0,
    banned_users: 0,
  };
};

export const fetchBorrowRequests = async () => {
  const response = await apiClient.get("/borrows", {
    params: { status: "pending" }
  });
  return Array.isArray(response.data) ? response.data : (response.data?.data || []);
};

export const fetchActiveBorrows = async () => {
  const response = await apiClient.get("/borrows", {
    params: { status: "borrowed", page: 1 }
  });
  // shape: { data: { borrows: [...], pagination: {...} } }
  const borrows = response.data?.data?.borrows;
  if (Array.isArray(borrows)) return borrows;
  // fallback: flat array
  if (Array.isArray(response.data?.data)) return response.data.data;
  if (Array.isArray(response.data)) return response.data;
  return [];
};

export const fetchOverdueBorrows = async () => {
  const response = await apiClient.get("/borrows", {
    params: { status: "overdue", page: 1 }
  });
  const borrows = response.data?.data?.borrows;
  if (Array.isArray(borrows)) return borrows;
  if (Array.isArray(response.data?.data)) return response.data.data;
  if (Array.isArray(response.data)) return response.data;
  return [];
};

export const confirmBorrowRequest = async (borrowId) => {
  const response = await apiClient.post("/borrows/confirm", { borrow_id: borrowId });
  return response.data;
};

// ─── React Query hooks ─────────────────────────────────────────────────────────

export const useDashboardStatsQuery = () =>
  useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: () => fetchDashboardStats(),
  });

export const useBorrowRequestsQuery = () =>
  useQuery({
    queryKey: ["borrow-requests", "pending"],
    queryFn: () => fetchBorrowRequests(),
  });

export const useActiveBorrowsQuery = () =>
  useQuery({
    queryKey: ["dashboard-borrows", "borrowed"],
    queryFn: () => fetchActiveBorrows(),
  });

export const useOverdueBorrowsQuery = () =>
  useQuery({
    queryKey: ["dashboard-borrows", "overdue"],
    queryFn: () => fetchOverdueBorrows(),
  });

export const useConfirmBorrowMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmBorrowRequest,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["borrow-requests"] });
      const previousBorrowData = queryClient.getQueryData(["borrow-requests", "pending"]);
      queryClient.setQueryData(["borrow-requests", "pending"], (old) => ({
        ...old,
        data: (old?.data || []).filter((req) => req.id !== id),
      }));
      return { previousBorrowData };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["borrow-requests", "pending"], context.previousBorrowData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["borrow-requests"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    ...options,
  });
};
