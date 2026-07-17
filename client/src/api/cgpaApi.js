import API from "./axios";

/* ===========================
   CGPA
=========================== */

export const getCGPAs = async (
  params = {}
) => {
  const res = await API.get(
    "/cgpa",
    {
      params,
    }
  );

  return res.data;
};

export const getCGPAById =
  async (id) => {
    const res = await API.get(
      `/cgpa/${id}`
    );

    return res.data;
  };

export const createCGPA =
  async (data) => {
    const res = await API.post(
      "/cgpa",
      data
    );

    return res.data;
  };