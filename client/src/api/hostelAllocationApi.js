import api from "./axios";

export const getAllAllocations = () =>
  api.get("/hostel-allocations");

export const getAllocationById = (id) =>
  api.get(`/hostel-allocations/${id}`);

export const allocateBed = (data) =>
  api.post("/hostel-allocations", data);

export const checkoutAllocation = (id) =>
  api.put(`/hostel-allocations/${id}/checkout`);

export const deleteAllocation = (id) =>
  api.delete(`/hostel-allocations/${id}`);