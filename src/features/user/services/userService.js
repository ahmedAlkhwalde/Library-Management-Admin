import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../../config/apiClient";

export const fetchUsers = async (params = {}) => {
  const response = await apiClient.get("/users", { params });
  return response.data;
};

export const useUsersQuery = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
    ...options,
  });

export const updateUserStatus = async ({ id, status }) => {
  const response = await apiClient.patch(`/users/${id}`, { status });
  return response.data;
};

export const useUpdateUserStatusMutation = (options = {}) =>
  useMutation({
    mutationFn: updateUserStatus,
    ...options,
  });
