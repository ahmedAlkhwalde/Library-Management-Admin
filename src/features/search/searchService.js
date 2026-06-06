import apiClient from "../../config/apiClient";

export const searchBooks = async (value) => {
  const response = await apiClient.get("/books/search", {
    params: { value },
  });

  return response.data;
};