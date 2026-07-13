const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const createExamHallAllocation = async (data) => {
  const examSchedule = await prisma.examSchedule.findUnique({
    where: {
      id: Number(data.examScheduleId),
    },
  });

  if (!examSchedule) {
    throw new NotFoundError("Exam Schedule");
  }

  const examHall = await prisma.examHall.findUnique({
    where: {
      id: Number(data.examHallId),
    },
  });

  if (!examHall) {
    throw new NotFoundError("Exam Hall");
  }

  const existingAllocation =
    await prisma.examHallAllocation.findUnique({
      where: {
        examScheduleId_examHallId: {
          examScheduleId: Number(data.examScheduleId),
          examHallId: Number(data.examHallId),
        },
      },
    });

  if (existingAllocation) {
    throw new ConflictError(
      "Hall already allocated for this exam schedule."
    );
  }

  const allocatedStudents = Number(
    data.allocatedStudents || 0
  );

  if (allocatedStudents > examHall.capacity) {
    throw new ConflictError(
      "Allocated students exceed hall capacity."
    );
  }

  return prisma.examHallAllocation.create({
    data: {
      examScheduleId: Number(data.examScheduleId),
      examHallId: Number(data.examHallId),
      allocatedStudents,
    },
    include: {
      examSchedule: {
        include: {
          examType: true,
          subject: true,
        },
      },
      examHall: true,
    },
  });
};

const getAllExamHallAllocations = async (query) => {
  const { page, limit, skip } = getPagination(query);

  const [allocations, total] = await Promise.all([
    prisma.examHallAllocation.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        examSchedule: {
          include: {
            examType: true,
            subject: true,
          },
        },
        examHall: true,
      },
    }),

    prisma.examHallAllocation.count(),
  ]);

  return {
    data: allocations,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getExamHallAllocationById = async (id) => {
  const allocation =
    await prisma.examHallAllocation.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        examSchedule: {
          include: {
            examType: true,
            subject: true,
          },
        },
        examHall: true,
      },
    });

  if (!allocation) {
    throw new NotFoundError("Exam Hall Allocation");
  }

  return allocation;
};

const deleteExamHallAllocation = async (id) => {
  await getExamHallAllocationById(id);

  return prisma.examHallAllocation.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createExamHallAllocation,
  getAllExamHallAllocations,
  getExamHallAllocationById,
  deleteExamHallAllocation,
};