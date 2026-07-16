import API from "./axios";

/* ===========================
   EXAM TYPES
=========================== */

export const getExamTypes = async (params = {}) => {
  const res = await API.get("/exam-types", {
    params,
  });

  return res.data;
};

export const getExamTypeById = async (id) => {
  const res = await API.get(`/exam-types/${id}`);

  return res.data;
};

export const createExamType = async (data) => {
  const res = await API.post(
    "/exam-types",
    data
  );

  return res.data;
};

export const updateExamType = async (
  id,
  data
) => {
  const res = await API.put(
    `/exam-types/${id}`,
    data
  );

  return res.data;
};

export const deleteExamType = async (id) => {
  const res = await API.delete(
    `/exam-types/${id}`
  );

  return res.data;
};