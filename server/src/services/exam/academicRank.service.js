const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const generateAcademicRanks = async (data) => {
  const academicYear = data.academicYear;

  const existing = await prisma.academicRank.findFirst({
    where: {
      academicYear,
    },
  });

  if (existing) {
    throw new ConflictError(
      "Academic ranks already generated."
    );
  }

  const cgpas = await prisma.cGPA.findMany({
    where: {
      academicYear,
    },
    include: {
      student: {
        include: {
          department: true,
        },
      },
    },
    orderBy: {
      cgpa: "desc",
    },
  });

  if (cgpas.length === 0) {
    throw new NotFoundError("CGPA Records");
  }

  const departmentRanks = {};

  const createdRanks = [];

  for (let i = 0; i < cgpas.length; i++) {
    const record = cgpas[i];

    const departmentId = record.student.departmentId;

    if (!departmentRanks[departmentId]) {
      departmentRanks[departmentId] = 1;
    }

    const academicRank =
      await prisma.academicRank.create({
        data: {
          studentId: record.studentId,
          academicYear,

          cgpa: record.cgpa,

          departmentRank:
            departmentRanks[departmentId],

          overallRank: i + 1,
        },

        include: {
          student: {
            include: {
              department: true,
            },
          },
        },
      });

    departmentRanks[departmentId]++;

    createdRanks.push(academicRank);
  }

  return createdRanks;
};

const getAllAcademicRanks = async (query) => {
  const { page, limit, skip } =
    getPagination(query);

  const [ranks, total] = await Promise.all([
    prisma.academicRank.findMany({
      skip,
      take: limit,

      orderBy: {
        overallRank: "asc",
      },

      include: {
        student: {
          include: {
            department: true,
          },
        },
      },
    }),

    prisma.academicRank.count(),
  ]);

  return {
    data: ranks,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getAcademicRankById = async (id) => {
  const rank =
    await prisma.academicRank.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        student: {
          include: {
            department: true,
          },
        },
      },
    });

  if (!rank) {
    throw new NotFoundError(
      "Academic Rank"
    );
  }

  return rank;
};

module.exports = {
  generateAcademicRanks,
  getAllAcademicRanks,
  getAcademicRankById,
};