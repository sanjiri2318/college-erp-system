import API from "./axios";

// ADMIN
export const getTimetables =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await API.get(
        "/timetable",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data.data;
  };

export const createTimetable =
  async (data) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await API.post(
        "/timetable",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data.data;
  };

export const updateTimetable =
  async (id, data) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await API.put(
        `/timetable/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data.data;
  };

export const deleteTimetable =
  async (id) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await API.delete(
        `/timetable/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };

// STUDENT
export const getStudentTimetable =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await API.get(
        "/timetable/student",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data.data;
  };

// FACULTY
export const getFacultyTimetable =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await API.get(
        "/timetable/faculty",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data.data;
  };