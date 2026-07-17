import api from "./axios";

export const getAllAuthors = () =>
  api.get("/authors");

export const getAuthorById = (id) =>
  api.get(`/authors/${id}`);

export const createAuthor = (data) =>
  api.post("/authors", data);

export const updateAuthor = (id, data) =>
  api.put(`/authors/${id}`, data);

export const deleteAuthor = (id) =>
  api.delete(`/authors/${id}`);