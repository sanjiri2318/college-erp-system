import API from "./axios";

/* ===========================
   EXAM SCHEDULE
=========================== */

export const getExamSchedules = async (
  params = {}
) => {
  const res = await API.get(
    "/exam-schedules",
    {
      params,
    }
  );

  return res.data;
};

export const getExamScheduleById =
  async (id) => {
    const res = await API.get(
      `/exam-schedules/${id}`
    );

    return res.data;
  };

export const createExamSchedule =
  async (data) => {
    const res = await API.post(
      "/exam-schedules",
      data
    );

    return res.data;
  };

export const updateExamSchedule =
  async (id, data) => {
    const res = await API.put(
      `/exam-schedules/${id}`,
      data
    );

    return res.data;
  };

export const deleteExamSchedule =
  async (id) => {
    const res = await API.delete(
      `/exam-schedules/${id}`
    );

    return res.data;
  };