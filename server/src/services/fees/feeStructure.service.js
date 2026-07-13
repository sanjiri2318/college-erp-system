const prisma = require("../../config/prisma");

const createFeeStructure = async (data) => {
  const {
    name,
    feeType,
    amount,
    semester,
    departmentId,
    categoryId,
  } = data;

  const department = await prisma.department.findUnique({
    where: {
      id: Number(departmentId),
    },
  });

  if (!department) {
    throw new Error("Department not found.");
  }

  const category = await prisma.feeCategory.findUnique({
    where: {
      id: Number(categoryId),
    },
  });

  if (!category) {
    throw new Error("Fee category not found.");
  }

  const existingFeeStructure =
    await prisma.feeStructure.findFirst({
      where: {
        departmentId: Number(departmentId),
        semester: Number(semester),
        feeType,
      },
    });

  if (existingFeeStructure) {
    throw new Error("Fee structure already exists.");
  }

  return prisma.feeStructure.create({
    data: {
      name,
      feeType,
      amount: Number(amount),
      semester: Number(semester),
      departmentId: Number(departmentId),
      categoryId: Number(categoryId),
    },
  });
};

const getAllFeeStructures = async () => {
  return prisma.feeStructure.findMany({
    include: {
      department: true,
      category: true,
      studentFees: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getFeeStructureById = async (id) => {
  const feeStructure =
    await prisma.feeStructure.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        department: true,
        category: true,
        studentFees: true,
      },
    });

  if (!feeStructure) {
    throw new Error("Fee structure not found.");
  }

  return feeStructure;
};

const updateFeeStructure = async (id, data) => {
  const feeStructure =
    await prisma.feeStructure.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!feeStructure) {
    throw new Error("Fee structure not found.");
  }

  return prisma.feeStructure.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
      amount:
        data.amount !== undefined
          ? Number(data.amount)
          : undefined,
      semester:
        data.semester !== undefined
          ? Number(data.semester)
          : undefined,
      departmentId:
        data.departmentId !== undefined
          ? Number(data.departmentId)
          : undefined,
      categoryId:
        data.categoryId !== undefined
          ? Number(data.categoryId)
          : undefined,
    },
  });
};

const deleteFeeStructure = async (id) => {
  const feeStructure =
    await prisma.feeStructure.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!feeStructure) {
    throw new Error("Fee structure not found.");
  }

  return prisma.feeStructure.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createFeeStructure,
  getAllFeeStructures,
  getFeeStructureById,
  updateFeeStructure,
  deleteFeeStructure,
};