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
    // Get subject details
    const subjectRes = await API.get(
      `/subjects/${subjectId}`
    );

    const subject =
      subjectRes.data.data.subject;

    // Get students from same department and semester
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
    // Get selected subject
    const subjectRes = await API.get(
      `/subjects/${subjectId}`
    );

    const subject =
      subjectRes.data.data.subject;

    // Get students from same department and semester
    const studentRes = await API.get(
      `/students/filter?departmentId=${subject.departmentId}&semester=${subject.semester}`
    );

    return studentRes.data.data;
  };

export const saveInternalMarks =
  async (data) => {
    const res = await API.post(
      "/internal-marks",
      data
    );

    return res.data;
  };