import API from "./axios";

export const getProfile = async () => {
  const res = await API.get("/auth/me");
  return res.data.data.user;
};