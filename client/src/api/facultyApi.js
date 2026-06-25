import API from "./axios";

export const getFacultyDashboard = async () => {
  const res = await API.get("/faculty/dashboard");
  return res.data;
};

export const getMySubjects = async () => {
  const res = await API.get("/faculty/subjects");
  return res.data;
};

export const getFacultySubjects = getMySubjects;

export const getStudentsBySubject = async (subjectId) => {
  const res = await API.get(
    `/faculty/attendance/students/${subjectId}`
  );

  return res.data;
};

export const saveAttendance = async (data) => {
  const res = await API.post(
    "/faculty/attendance",
    data
  );

  return res.data;
};

export const getStudentsForMarks = async (subjectId) => {
  const res = await API.get(
    `/faculty/marks/students/${subjectId}`
  );

  return res.data;
};

export const saveInternalMarks = async (data) => {
  const res = await API.post(
    "/faculty/marks",
    data
  );

  return res.data;
};