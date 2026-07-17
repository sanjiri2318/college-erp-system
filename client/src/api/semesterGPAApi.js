import API from "./axios";

/* ===========================
   SEMESTER GPA
=========================== */

export const getSemesterGPAs = async (
  params = {}
) => {
  const res = await API.get(
    "/semester-gpa",
    {
      params,
    }
  );

  return res.data;
};

export const getSemesterGPAById =
  async (id) => {
    const res = await API.get(
      `/semester-gpa/${id}`
    );

    return res.data;
  };

export const createSemesterGPA =
  async (data) => {
    const res = await API.post(
      "/semester-gpa",
      data
    );

    return res.data;
  };