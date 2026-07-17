import api from "./axios";

export const getAllPublishers = () =>
  api.get("/publishers");

export const getPublisherById = (id) =>
  api.get(`/publishers/${id}`);

export const createPublisher = (data) =>
  api.post("/publishers", data);

export const updatePublisher = (id, data) =>
  api.put(`/publishers/${id}`, data);

export const deletePublisher = (id) =>
  api.delete(`/publishers/${id}`);