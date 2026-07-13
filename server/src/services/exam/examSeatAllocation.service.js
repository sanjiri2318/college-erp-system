const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const createExamSeatAllocation = async (data) => {
  return prisma.$transaction(async (tx) => {
    const hallAllocation =
      await tx.examHallAllocation.findUnique({
        where: {
          id: Number(data.examHallAllocationId),
        },
        include: {
          examHall: true,
        },
      });

    if (!hallAllocation) {
      throw new NotFoundError("Exam Hall Allocation");
    }

    const student = await tx.student.findUnique({
      where: {
        id: Number(data.studentId),
      },
    });

    if (!student) {
      throw new NotFoundError("Student");
    }

    const existingStudent =
      await tx.examSeatAllocation.findFirst({
        where: {
          examHallAllocationId: Number(data.examHallAllocationId),
          studentId: Number(data.studentId),
        },
      });

    if (existingStudent) {
      throw new ConflictError(
        "Student already has a seat allocation."
      );
    }

    const existingSeat =
      await tx.examSeatAllocation.findFirst({
        where: {
          examHallAllocationId: Number(data.examHallAllocationId),
          seatNumber: data.seatNumber,
        },
      });

    if (existingSeat) {
      throw new ConflictError(
        "Seat number already allocated."
      );
    }

    if (
      hallAllocation.allocatedStudents >=
      hallAllocation.examHall.capacity
    ) {
      throw new ConflictError(
        "Hall capacity exceeded."
      );
    }

    const allocation =
      await tx.examSeatAllocation.create({
        data: {
          examHallAllocationId: Number(
            data.examHallAllocationId
          ),
          studentId: Number(data.studentId),
          seatNumber: data.seatNumber,
        },
        include: {
          student: true,
          examHallAllocation: {
            include: {
              examHall: true,
              examSchedule: {
                include: {
                  subject: true,
                  examType: true,
                },
              },
            },
          },
        },
      });

    await tx.examHallAllocation.update({
      where: {
        id: Number(data.examHallAllocationId),
      },
      data: {
        allocatedStudents: {
          increment: 1,
        },
      },
    });

    return allocation;
  });
};

const getAllExamSeatAllocations = async (query) => {
  const { page, limit, skip } = getPagination(query);

  const [allocations, total] = await Promise.all([
    prisma.examSeatAllocation.findMany({
      skip,
      take: limit,
      orderBy: {
        seatNumber: "asc",
      },
      include: {
        student: true,
        examHallAllocation: {
          include: {
            examHall: true,
            examSchedule: {
              include: {
                subject: true,
                examType: true,
              },
            },
          },
        },
      },
    }),

    prisma.examSeatAllocation.count(),
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

const getExamSeatAllocationById = async (id) => {
  const allocation =
    await prisma.examSeatAllocation.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        student: true,
        examHallAllocation: {
          include: {
            examHall: true,
            examSchedule: {
              include: {
                subject: true,
                examType: true,
              },
            },
          },
        },
      },
    });

  if (!allocation) {
    throw new NotFoundError("Exam Seat Allocation");
  }

  return allocation;
};

const deleteExamSeatAllocation = async (id) => {
  return prisma.$transaction(async (tx) => {
    const allocation =
      await tx.examSeatAllocation.findUnique({
        where: {
          id: Number(id),
        },
      });

    if (!allocation) {
      throw new NotFoundError("Exam Seat Allocation");
    }

    await tx.examSeatAllocation.delete({
      where: {
        id: Number(id),
      },
    });

    await tx.examHallAllocation.update({
      where: {
        id: allocation.examHallAllocationId,
      },
      data: {
        allocatedStudents: {
          decrement: 1,
        },
      },
    });

    return true;
  });
};

module.exports = {
  createExamSeatAllocation,
  getAllExamSeatAllocations,
  getExamSeatAllocationById,
  deleteExamSeatAllocation,
};