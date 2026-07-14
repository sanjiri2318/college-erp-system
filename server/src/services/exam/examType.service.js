const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const createExamType = async (data) => {
  const existingExamType = await prisma.examType.findFirst({
    where: {
      name: data.name,
    },
  });

  if (existingExamType) {
    throw new ConflictError("Exam type already exists.");
  }

  return prisma.examType.create({
    data: {
      name: data.name,
      description: data.description,

      isFinalExam: data.isFinalExam ?? false,

      maxInternalMarks:
        data.maxInternalMarks ?? 40,

      maxExternalMarks:
        data.maxExternalMarks ?? 60,

      passMarks:
        data.passMarks ?? 50,
    },
  });
};

const getAllExamTypes = async (query) => {
  const { page, limit, skip } = getPagination(query);

  const where = query.search
    ? {
        name: {
          contains: query.search,
        },
      }
      
    : {};

  const [examTypes, total] = await Promise.all([
    prisma.examType.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        name: "asc",
      },
    }),

    prisma.examType.count({
      where,
    }),
  ]);

  return {
    data: examTypes,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getExamTypeById = async (id) => {
  const examType = await prisma.examType.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!examType) {
    throw new NotFoundError("Exam Type");
  }

  return examType;
};

const updateExamType = async (id, data) => {
  await getExamTypeById(id);

  if (data.name) {
    const duplicate = await prisma.examType.findFirst({
      where: {
        name: data.name,
        NOT: {
          id: Number(id),
        },
      },
    });

    if (duplicate) {
      throw new ConflictError("Exam type already exists.");
    }
  }

  return prisma.examType.update({
    where: {
      id: Number(id),
    },
    data: {
      name: data.name,
      description: data.description,

      isFinalExam: data.isFinalExam,

      maxInternalMarks: data.maxInternalMarks,

      maxExternalMarks: data.maxExternalMarks,

      passMarks: data.passMarks,
    },
  });
};

const deleteExamType = async (id) => {
  await getExamTypeById(id);

  return prisma.examType.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createExamType,
  getAllExamTypes,
  getExamTypeById,
  updateExamType,
  deleteExamType,
};