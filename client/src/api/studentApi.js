import API from "./axios";

/* ===========================
   ADMIN
=========================== */

export const getStudents = async (params = {}) => {
  const res = await API.get("/students", {
    params,
  });

  return res.data;
};

export const getStudentById = async (id) => {
  const res = await API.get(`/students/${id}`);
  return res.data;
};

export const createStudent = async (data) => {
  const res = await API.post("/students", data);
  return res.data;
};

export const updateStudent = async (id, data) => {
  const res = await API.put(
    `/students/${id}`,
    data
  );

  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await API.delete(
    `/students/${id}`
  );

  return res.data;
};

/* ===========================
   STUDENT PORTAL
=========================== */

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