import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../config/apiClient";

export const loginUser = async (payload) => {
  const response = await apiClient.post("/login", payload);
  return response.data;
};

export const useLoginMutation = (options = {}) =>
  useMutation({
    mutationFn: loginUser,
    ...options,
  });
