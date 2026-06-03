import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../../config/apiClient";

// جلب المستخدمين
export const fetchUsers = async (params = {}) => {
  const response = await apiClient.get("/users", { params });
  return response.data;
};

// جلب تفاصيل مستخدم واحد - مع إعدادات Header لضمان عدم حدوث 422
export const fetchUserDetails = async (user_id) => {
  const response = await apiClient.get("/users/show-user", {
    params: { user_id: user_id }
  });
  console.log(response.data);
  return response.data;
};

// عمليات الحظر
export const banUser = async (user_id) => await apiClient.post("/users/ban", { user_id });
export const activateUser = async (user_id) => await apiClient.post("/users/activate", { user_id });

export const useUsersQuery = (params, options) => useQuery({ queryKey: ["users", params], queryFn: () => fetchUsers(params), ...options });
export const useUserDetailsQuery = (user_id, options) => useQuery({ queryKey: ["user", user_id], queryFn: () => fetchUserDetails(user_id), enabled: !!user_id, ...options });
export const useBanUserMutation = (options) => useMutation({ mutationFn: banUser, ...options });
export const useActivateUserMutation = (options) => useMutation({ mutationFn: activateUser, ...options });