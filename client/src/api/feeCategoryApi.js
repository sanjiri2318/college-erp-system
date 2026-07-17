import api from "./axios";

export const getAllFeeCategories = () =>
  api.get("/fee-categories");

export const getFeeCategoryById = (id) =>
  api.get(`/fee-categories/${id}`);

export const createFeeCategory = (data) =>
  api.post("/fee-categories", data);

export const updateFeeCategory = (id, data) =>
  api.put(`/fee-categories/${id}`, data);

export const deleteFeeCategory = (id) =>
  api.delete(`/fee-categories/${id}`);