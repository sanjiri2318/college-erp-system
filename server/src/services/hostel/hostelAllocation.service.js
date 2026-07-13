const prisma = require("../../config/prisma");

const allocateBed = async (data) => {
  const {
    studentId,
    hostelBedId,
  } = data;

  const student = await prisma.student.findUnique({
    where: {
      id: Number(studentId),
    },
  });

  if (!student) {
    throw new Error("Student not found.");
  }

  const bed = await prisma.hostelBed.findUnique({
    where: {
      id: Number(hostelBedId),
    },
  });

  if (!bed) {
    throw new Error("Hostel bed not found.");
  }

  const existingStudentAllocation =
    await prisma.hostelAllocation.findUnique({
      where: {
        studentId: Number(studentId),
      },
    });

  if (existingStudentAllocation) {
    throw new Error("Student is already allocated.");
  }

  const existingBedAllocation =
    await prisma.hostelAllocation.findUnique({
      where: {
        hostelBedId: Number(hostelBedId),
      },
    });

  if (existingBedAllocation) {
    throw new Error("Hostel bed is already allocated.");
  }

  return prisma.hostelAllocation.create({
    data: {
      studentId: Number(studentId),
      hostelBedId: Number(hostelBedId),
    },
  });
};

const getAllAllocations = async () => {
  return prisma.hostelAllocation.findMany({
    include: {
      student: true,
      hostelBed: {
        include: {
          hostelRoom: {
            include: {
              hostelBlock: {
                include: {
                  hostel: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getAllocationById = async (id) => {
  const allocation =
    await prisma.hostelAllocation.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        student: true,
        hostelBed: {
          include: {
            hostelRoom: {
              include: {
                hostelBlock: {
                  include: {
                    hostel: true,
                  },
                },
              },
            },
          },
        },
      },
    });

  if (!allocation) {
    throw new Error("Allocation not found.");
  }

  return allocation;
};

const checkoutAllocation = async (id) => {
  const allocation =
    await prisma.hostelAllocation.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!allocation) {
    throw new Error("Allocation not found.");
  }

  return prisma.hostelAllocation.update({
    where: {
      id: Number(id),
    },
    data: {
      endDate: new Date(),
    },
  });
};

const deleteAllocation = async (id) => {
  const allocation =
    await prisma.hostelAllocation.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!allocation) {
    throw new Error("Allocation not found.");
  }

  return prisma.hostelAllocation.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  allocateBed,
  getAllAllocations,
  getAllocationById,
  checkoutAllocation,
  deleteAllocation,
};