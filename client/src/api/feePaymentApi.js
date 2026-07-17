import api from "./axios";

export const getAllPayments = () =>
  api.get("/fee-payments");

export const getPaymentById = (id) =>
  api.get(`/fee-payments/${id}`);

export const createFeePayment = (data) =>
  api.post("/fee-payments", data);

export const deletePayment = (id) =>
  api.delete(`/fee-payments/${id}`);