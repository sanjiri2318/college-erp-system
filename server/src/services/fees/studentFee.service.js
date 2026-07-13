const prisma = require("../../config/prisma");

const createStudentFee = async (data) => {
  const {
    studentId,
    feeStructureId,
  } = data;

  const student = await prisma.student.findUnique({
    where: {
      id: Number(studentId),
    },
  });

  if (!student) {
    throw new Error("Student not found.");
  }

  const feeStructure = await prisma.feeStructure.findUnique({
    where: {
      id: Number(feeStructureId),
    },
  });

  if (!feeStructure) {
    throw new Error("Fee structure not found.");
  }

  const existingStudentFee =
    await prisma.studentFee.findUnique({
      where: {
        studentId_feeStructureId: {
          studentId: Number(studentId),
          feeStructureId: Number(feeStructureId),
        },
      },
    });

  if (existingStudentFee) {
    throw new Error(
      "Fee already assigned to this student."
    );
  }

  return prisma.studentFee.create({
    data: {
      studentId: Number(studentId),
      feeStructureId: Number(feeStructureId),
      totalAmount: feeStructure.amount,
      paidAmount: 0,
      dueAmount: feeStructure.amount,
      status: "PENDING",
    },
  });
};

const getAllStudentFees = async () => {
  return prisma.studentFee.findMany({
    include: {
      student: {
        include: {
          department: true,
        },
      },
      feeStructure: {
        include: {
          category: true,
          department: true,
        },
      },
      payments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getStudentFeeById = async (id) => {
  const studentFee =
    await prisma.studentFee.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        student: {
          include: {
            department: true,
          },
        },
        feeStructure: {
          include: {
            category: true,
            department: true,
          },
        },
        payments: true,
      },
    });

  if (!studentFee) {
    throw new Error("Student fee not found.");
  }

  return studentFee;
};

const updateStudentFee = async (
  id,
  data
) => {
  const studentFee =
    await prisma.studentFee.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!studentFee) {
    throw new Error("Student fee not found.");
  }

  return prisma.studentFee.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
      totalAmount:
        data.totalAmount !== undefined
          ? Number(data.totalAmount)
          : undefined,
      paidAmount:
        data.paidAmount !== undefined
          ? Number(data.paidAmount)
          : undefined,
      dueAmount:
        data.dueAmount !== undefined
          ? Number(data.dueAmount)
          : undefined,
    },
  });
};

const deleteStudentFee = async (id) => {
  const studentFee =
    await prisma.studentFee.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!studentFee) {
    throw new Error("Student fee not found.");
  }

  return prisma.studentFee.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createStudentFee,
  getAllStudentFees,
  getStudentFeeById,
  updateStudentFee,
  deleteStudentFee,
};