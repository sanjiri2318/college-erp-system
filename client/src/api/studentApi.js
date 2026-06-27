import API from "./axios";

export const getStudentDashboard = async () => {
  const res = await API.get(
    "/students/dashboard"
  );

  return res.data;
};

export const getStudentSubjects = async () => {
  const res = await API.get(
    "/students/subjects"
  );

  return res.data;
};

export const getStudentAttendance = async () => {
  const res = await API.get(
    "/students/attendance"
  );

  return res.data;
};

export const getStudentMarks = async () => {
  const res = await API.get(
    "/students/marks"
  );

  return res.data;
};