import API from "./axios";

/* ===========================
   RESULTS
=========================== */

export const getResults = async (
  params = {}
) => {
  const res = await API.get(
    "/results",
    {
      params,
    }
  );

  return res.data;
};

export const getResultById =
  async (id) => {
    const res = await API.get(
      `/results/${id}`
    );

    return res.data;
  };

export const createResult =
  async (data) => {
    const res = await API.post(
      "/results",
      data
    );

    return res.data;
  };