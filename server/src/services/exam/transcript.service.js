const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");

const getStudentTranscript = async (studentId) => {
  studentId = Number(studentId);

  // Check Student
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },

    include: {
      department: true,
    },
  });

  if (!student) {
    throw new NotFoundError("Student");
  }

  // Fetch Semester GPAs
  const semesterGPAs = await prisma.semesterGPA.findMany({
    where: {
      studentId,
    },

    orderBy: {
      semester: "asc",
    },
  });

  // Fetch CGPA
  const cgpa = await prisma.cGPA.findFirst({
    where: {
      studentId,
    },
  });

  // Fetch Published Final Results
  const results = await prisma.result.findMany({
    where: {
      studentId,

      publishStatus: "PUBLISHED",

      examType: {
        isFinalExam: true,
      },
    },

    include: {
      subject: true,
      examType: true,
    },

    orderBy: [
      {
        subject: {
          semester: "asc",
        },
      },
      {
        subjectId: "asc",
      },
    ],
  });

  // Group Results Semester Wise
  const semesterMap = {};

  for (const result of results) {
    const semester = result.subject.semester;

    if (!semesterMap[semester]) {
      const semesterGPA = semesterGPAs.find(
        (item) => item.semester === semester
      );

      semesterMap[semester] = {
        semester,
        gpa: semesterGPA ? semesterGPA.gpa : 0,
        subjects: [],
      };
    }

    semesterMap[semester].subjects.push({
      code: result.subject.code,
      name: result.subject.name,
      credits: result.subject.credits,

      internalMarks: result.internalMarks,
      externalMarks: result.externalMarks,
      totalMarks: result.totalMarks,

      percentage: result.percentage,

      grade: result.grade,
      gradePoint: result.gradePoint,

      resultStatus: result.resultStatus,
    });
  }

  return {
    student: {
        id: student.id,
        registerNumber: student.regNumber,
        name: student.name,
        department: student.department.name,
    },

    semesters: Object.values(semesterMap),

    cgpa: cgpa ? cgpa.cgpa : 0,
  };
};

module.exports = {
  getStudentTranscript,
};