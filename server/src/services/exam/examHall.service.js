const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const createExamHall = async (data) => {
  const existingHall = await prisma.examHall.findFirst({
    where: {
      name: data.name,
    },
  });

  if (existingHall) {
    throw new ConflictError("Exam hall already exists.");
  }

  return prisma.examHall.create({
    data: {
      name: data.name,
      building: data.building,
      floor: Number(data.floor),
      capacity: Number(data.capacity),
    },
  });
};

const getAllExamHalls = async (query) => {
  const { page, limit, skip } = getPagination(query);

  const where = query.search
    ? {
        OR: [
          {
            name: {
              contains: query.search,
            },
          },
          {
            building: {
              contains: query.search,
            },
          },
        ],
      }
    : {};

  const [examHalls, total] = await Promise.all([
    prisma.examHall.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        name: "asc",
      },
    }),

    prisma.examHall.count({
      where,
    }),
  ]);

  return {
    data: examHalls,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getExamHallById = async (id) => {
  const hall = await prisma.examHall.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!hall) {
    throw new NotFoundError("Exam Hall");
  }

  return hall;
};

const updateExamHall = async (id, data) => {
  await getExamHallById(id);

  if (data.name) {
    const duplicate = await prisma.examHall.findFirst({
      where: {
        name: data.name,
        NOT: {
          id: Number(id),
        },
      },
    });

    if (duplicate) {
      throw new ConflictError("Exam hall already exists.");
    }
  }

  return prisma.examHall.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
      floor:
        data.floor !== undefined
          ? Number(data.floor)
          : undefined,
      capacity:
        data.capacity !== undefined
          ? Number(data.capacity)
          : undefined,
    },
  });
};

const deleteExamHall = async (id) => {
  await getExamHallById(id);

  return prisma.examHall.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createExamHall,
  getAllExamHalls,
  getExamHallById,
  updateExamHall,
  deleteExamHall,
};