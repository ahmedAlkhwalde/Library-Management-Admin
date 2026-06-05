import apiClient from "../../../config/apiClient";

export const profileKeys = {
  all: ["profile"],
  details: () => [...profileKeys.all, "details"],
};

export const fetchProfile = async () => {
  const { data } = await apiClient.get("/profile");
  return data.data.user;
};

// هنا نمرر الـ formData كما هي
export const updateProfile = async ({ id, formData }) => {
  const { data } = await apiClient.post(`/profile/${id}`, formData);
  return data;
};