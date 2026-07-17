import api from "./axios";

export const getAllHostelRooms = () =>
  api.get("/hostel-rooms");

export const getHostelRoomById = (id) =>
  api.get(`/hostel-rooms/${id}`);

export const createHostelRoom = (data) =>
  api.post("/hostel-rooms", data);

export const updateHostelRoom = (id, data) =>
  api.put(`/hostel-rooms/${id}`, data);

export const deleteHostelRoom = (id) =>
  api.delete(`/hostel-rooms/${id}`);