const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const createSemesterGPA = async (data) => {
  const studentId = Number(data.studentId);
  const semester = Number(data.semester);
  const academicYear = data.academicYear;

  // Check Student
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  if (!student) {
    throw new NotFoundError("Student");
  }

  // Prevent Duplicate GPA
  const existing = await prisma.semesterGPA.findUnique({
    where: {
      studentId_semester_academicYear: {
        studentId,
        semester,
        academicYear,
      },
    },
  });

  if (existing) {
    throw new ConflictError(
      "Semester GPA already generated."
    );
  }

  // Fetch Published Final Exam Results
  const results = await prisma.result.findMany({
    where: {
      studentId,
      publishStatus: "PUBLISHED",

      examType: {
        isFinalExam: true,
      },

      subject: {
        semester,
      },

      // Uncomment if Result model has academicYear
      // academicYear,
    },

    include: {
      subject: true,
    },

    orderBy: {
      subjectId: "asc",
    },
  });

  if (results.length === 0) {
    throw new NotFoundError(
      "Published Results for this semester"
    );
  }

  let totalCredits = 0;
  let earnedCredits = 0;
  let totalGradePoints = 0;

  for (const result of results) {
    const credits = result.subject.credits;

    totalCredits += credits;

    if (result.resultStatus === "PASS") {
      earnedCredits += credits;
    }

    totalGradePoints +=
      result.gradePoint * credits;
  }

  const calculatedGPA =
    totalCredits === 0
      ? 0
      : Number(
          (
            totalGradePoints /
            totalCredits
          ).toFixed(2)
        );

  const semesterGPA =
    await prisma.semesterGPA.create({
      data: {
        studentId,
        semester,
        academicYear,

        totalCredits,
        earnedCredits,
        totalGradePoints,

        gpa: calculatedGPA,
      },

      include: {
        student: true,
      },
    });

  return semesterGPA;
};

const getAllSemesterGPAs = async (query) => {
  const { page, limit, skip } =
    getPagination(query);

  const [semesterGPAs, total] =
    await Promise.all([
      prisma.semesterGPA.findMany({
        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          student: true,
        },
      }),

      prisma.semesterGPA.count(),
    ]);

  return {
    data: semesterGPAs,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit
      ),
    },
  };
};

const getSemesterGPAById = async (id) => {
  const semesterGPA =
    await prisma.semesterGPA.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        student: true,
      },
    });

  if (!semesterGPA) {
    throw new NotFoundError(
      "Semester GPA"
    );
  }

  return semesterGPA;
};

module.exports = {
  createSemesterGPA,
  getAllSemesterGPAs,
  getSemesterGPAById,
};