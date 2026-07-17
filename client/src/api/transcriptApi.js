import API from "./axios";

/* ===========================
   TRANSCRIPT
=========================== */

export const getStudentTranscript =
  async (studentId) => {
    const res = await API.get(
      `/transcript/${studentId}`
    );

    return res.data;
  };