import api from "./axios";

export const getAllHostelBlocks = () =>
  api.get("/hostel-blocks");

export const getHostelBlockById = (id) =>
  api.get(`/hostel-blocks/${id}`);

export const createHostelBlock = (data) =>
  api.post("/hostel-blocks", data);

export const updateHostelBlock = (id, data) =>
  api.put(`/hostel-blocks/${id}`, data);

export const deleteHostelBlock = (id) =>
  api.delete(`/hostel-blocks/${id}`);