import API from "./axios";

export const getFacultyDashboard = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/dashboard/faculty", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

export const getDashboardAnalytics = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/dashboard/analytics", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
}; 