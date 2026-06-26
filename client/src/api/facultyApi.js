import API from "./axios";

/* ===========================
   Dashboard
=========================== */

export const getFacultyDashboard = async () => {
  const res = await API.get(
    "/dashboard/faculty"
  );

  return res.data.data;
};

/* ===========================
   Subjects
=========================== */

export const getMySubjects = async () => {
  const res = await API.get(
    "/faculty/subjects"
  );

  return res.data;
};

export const getFacultySubjects =
  getMySubjects;

/* ===========================
   Attendance
=========================== */

export const getStudentsBySubject =
  async (subjectId) => {
    // Get selected subject
    const subjectRes = await API.get(
      `/subjects/${subjectId}`
    );

    const subject =
      subjectRes.data.data.subject;

    // Get students of that department
    // and semester
    const studentRes = await API.get(
      `/students/filter?departmentId=${subject.departmentId}&semester=${subject.semester}`
    );

    return studentRes.data.data;
  };

export const saveAttendance =
  async (data) => {
    const res = await API.post(
      "/attendance",
      data
    );

    return res.data;
  };

/* ===========================
   Internal Marks
=========================== */

export const getStudentsForMarks =
  async (subjectId) => {
    const res = await API.get(
      `/faculty/marks/students/${subjectId}`
    );

    return res.data;
  };

export const saveInternalMarks =
  async (data) => {
    const res = await API.post(
      "/faculty/marks",
      data
    );

    return res.data;
  };