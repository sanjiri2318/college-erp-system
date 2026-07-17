import api from "./axios";

export const getAllStudentFees = () =>
  api.get("/student-fees");

export const getStudentFeeById = (id) =>
  api.get(`/student-fees/${id}`);

export const createStudentFee = (data) =>
  api.post("/student-fees", data);

export const updateStudentFee = (id, data) =>
  api.put(`/student-fees/${id}`, data);

export const deleteStudentFee = (id) =>
  api.delete(`/student-fees/${id}`);