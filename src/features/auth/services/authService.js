import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../config/apiClient";

export const loginUser = async (payload) => {
  const response = await apiClient.post("/login", payload);
  return response.data;
};

export const logoutUser = async () => {
  const token = localStorage.getItem("token");
  const response = await apiClient.post("/logout", null, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data;
};

export const useLoginMutation = (options = {}) =>
  useMutation({
    mutationFn: loginUser,
    ...options,
  });

export const useLogoutMutation = (options = {}) =>
  useMutation({
    mutationFn: logoutUser,
    ...options,
  });
