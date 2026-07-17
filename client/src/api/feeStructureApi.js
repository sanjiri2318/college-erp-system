import api from "./axios";

export const getAllFeeStructures = () =>
  api.get("/fee-structures");

export const getFeeStructureById = (id) =>
  api.get(`/fee-structures/${id}`);

export const createFeeStructure = (data) =>
  api.post("/fee-structures", data);

export const updateFeeStructure = (id, data) =>
  api.put(`/fee-structures/${id}`, data);

export const deleteFeeStructure = (id) =>
  api.delete(`/fee-structures/${id}`);