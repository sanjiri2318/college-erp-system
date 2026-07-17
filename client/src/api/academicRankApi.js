import API from "./axios";

/* ===========================
   ACADEMIC RANK
=========================== */

export const getAcademicRanks = async (params = {}) => {
  const res = await API.get("/academic-ranks", {
    params,
  });

  return res.data;
};

export const getAcademicRankById = async (id) => {
  const res = await API.get(`/academic-ranks/${id}`);

  return res.data;
};

export const generateAcademicRanks = async (data) => {
  const res = await API.post(
    "/academic-ranks/generate",
    data
  );

  return res.data;
};

export const deleteAcademicRanks = async () => {
  const res = await API.delete("/academic-ranks");

  return res.data;
};