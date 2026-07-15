const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const createCGPA = async (data) => {
  const studentId = Number(data.studentId);
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

  // Prevent Duplicate CGPA
  const existing = await prisma.cGPA.findFirst({
    where: {
      studentId,
      academicYear,
    },
  });

  if (existing) {
    throw new ConflictError(
      "CGPA already generated."
    );
  }

  // Fetch Semester GPAs
  const semesterGPAs = await prisma.semesterGPA.findMany({
    where: {
      studentId,
      academicYear,
    },

    orderBy: {
      semester: "asc",
    },
  });

  if (semesterGPAs.length === 0) {
    throw new NotFoundError(
      "Semester GPA records"
    );
  }

  let totalCredits = 0;
  let earnedCredits = 0;
  let totalGradePoints = 0;

  for (const semester of semesterGPAs) {
    totalCredits += semester.totalCredits;
    earnedCredits += semester.earnedCredits;
    totalGradePoints += semester.totalGradePoints;
  }

  const cgpa =
    totalCredits === 0
      ? 0
      : Number(
          (
            totalGradePoints /
            totalCredits
          ).toFixed(2)
        );

  const cgpaRecord = await prisma.cGPA.create({
    data: {
      studentId,
      academicYear,

      totalCredits,
      earnedCredits,

      cgpa,
    },

    include: {
      student: true,
    },
  });

  return cgpaRecord;
};

const getAllCGPAs = async (query) => {
  const { page, limit, skip } =
    getPagination(query);

  const [cgpas, total] = await Promise.all([
    prisma.cGPA.findMany({
      skip,
      take: limit,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        student: true,
      },
    }),

    prisma.cGPA.count(),
  ]);

  return {
    data: cgpas,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getCGPAById = async (id) => {
  const cgpa = await prisma.cGPA.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      student: true,
    },
  });

  if (!cgpa) {
    throw new NotFoundError("CGPA");
  }

  return cgpa;
};

module.exports = {
  createCGPA,
  getAllCGPAs,
  getCGPAById,
};
