import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../config/apiClient";

const fetchBorrows = async ({ status, page }) => {
  const { data } = await apiClient.get(`/borrows`, { 
    params: { status, page }
  });
  return data; 
};

export const useBorrows = (status, page) => {
  return useQuery({
    queryKey: ['borrows', status, page],
    queryFn: () => fetchBorrows({ status, page }),
    keepPreviousData: true,
  });
};

export const useReturnBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (borrow_id) => apiClient.post(`/borrows/return`, { borrow_id }),
    onSuccess: () => {
      // تحديث الكاش لإعادة جلب البيانات بعد إرجاع كتاب
      queryClient.invalidateQueries(['borrows']);
    },
  });
};

// أضف هذه الـ Mutation الجديدة للطلبات المعلقة
export const useConfirmPickup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (borrow_id) => apiClient.post(`/borrows/confirm`, { borrow_id }),
    onSuccess: () => {
      // تحديث الكاش لإعادة جلب البيانات بعد التأكيد
      queryClient.invalidateQueries(['borrows']);
    },
  });
};