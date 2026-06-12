import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../config/apiClient";


export const fetchBooks = async (
  page = 1,
  categoryId = null,
  status = "all"
) => {

  const hasFilters =
    (categoryId !== null &&
      categoryId !== undefined &&
      categoryId !== "") ||
    status !== "all";

  if (hasFilters) {
    const params = {
      page,
      status,
    };

    if (
      categoryId !== null &&
      categoryId !== undefined &&
      categoryId !== ""
    ) {
      params.category_id = Number(categoryId);
    }

    const response = await apiClient.get("/books/filter", {
      params,
    });

    const data = response.data?.data;

    return {
      books: data?.books || [],
      pagination: data?.pagination,
    };
  }

  const response = await apiClient.get("/books", {
    params: {
      page,
      category_name: "All",
    },
  });

  const data = response.data?.data;

  return {
    books: data?.books || [],
    pagination: data?.pagination,
  };
};
export const useBooksQuery = (page = 1, categoryId = null, status = "all") => {
  return useQuery({
    queryKey: ["books", page, categoryId, status],
    queryFn: () => fetchBooks(page, categoryId, status),
    keepPreviousData: true, 
  });
};

export const searchBooks = async (value) => {
  const response = await apiClient.get("/books/search", {
    params: { value },
  });

  return response.data;
};

export const getBookDetails = async (bookId) => {
  const response = await apiClient.get("/books/show", {
    params: {
      book_id: bookId,
    },
  });

  return response.data;
};

export const createBook = async (formData) => {
  const response = await apiClient.post(
    "/books/create",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateBook = async (formData) => {
  const response = await apiClient.post(
    "/books/update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteBook = async (bookId) => {
  const response = await apiClient.delete("/books/delete", {
    data: {
      book_id: bookId,
    },
  });

  return response.data;
};

  export const useCreateBookMutation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBook,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["books"],
      });

      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
    },
  });
};

export const useUpdateBookMutation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBook,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["books"],
      });

      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
    },
  });
};

export const useDeleteBookMutation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["books"],
      });

      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
    },
  });
};

