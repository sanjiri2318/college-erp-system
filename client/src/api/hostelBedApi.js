import api from "./axios";

export const getAllHostelBeds = () =>
  api.get("/hostel-beds");

export const getHostelBedById = (id) =>
  api.get(`/hostel-beds/${id}`);

export const createHostelBed = (data) =>
  api.post("/hostel-beds", data);

export const updateHostelBed = (id, data) =>
  api.put(`/hostel-beds/${id}`, data);

export const deleteHostelBed = (id) =>
  api.delete(`/hostel-beds/${id}`);