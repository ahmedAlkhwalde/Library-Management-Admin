import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../config/apiClient";

// ─── API functions ─────────────────────────────────────────────────────────────


export const fetchBorrowRequests = async () => {
  const response = await apiClient.get("/borrows", {
    params: { status: "pending" }
  });
  // API returns an array directly or wrapped in a data property
  return Array.isArray(response.data) ? response.data : (response.data?.data || []);
};

export const fetchLateBorrowings = async () => {
  const response = await apiClient.get("/borrows", {
    params: { status: "borrowed" }
  });
  // API returns an array directly or wrapped in a data property
  return Array.isArray(response.data) ? response.data : (response.data?.data || []);
};

export const confirmBorrowRequest = async (borrowId) => {
  const response = await apiClient.post("/borrows/confirm", { borrow_id: borrowId });
  return response.data;
};

// ─── React Query hooks ─────────────────────────────────────────────────────────



export const useBorrowRequestsQuery = () =>
  useQuery({
    queryKey: ["borrow-requests", "pending"],
    queryFn: () => fetchBorrowRequests(),
  });

export const useLateBorrowingsQuery = () =>
  useQuery({
    queryKey: ["borrow-requests", "late"],
    queryFn: () => fetchLateBorrowings(),
  });

export const useConfirmBorrowMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmBorrowRequest,
    onMutate: async (id) => {
      // Cancel ongoing queries
      await queryClient.cancelQueries({ queryKey: ["borrow-requests"] });
      
      // Get previous data
      const previousBorrowData = queryClient.getQueryData(["borrow-requests", "pending"]);
      
      // Optimistically update borrow requests
      queryClient.setQueryData(["borrow-requests", "pending"], (old) => ({
        ...old,
        data: (old?.data || []).filter((req) => req.id !== id),
      }));
      
      return { previousBorrowData };
    },
    onError: (err, id, context) => {
      // Rollback on error
      queryClient.setQueryData(["borrow-requests", "pending"], context.previousBorrowData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["borrow-requests"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    ...options,
  });
};
