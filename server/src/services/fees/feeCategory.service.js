const prisma = require("../../config/prisma");

const createFeeCategory = async (data) => {
  const { name, description } = data;

  const existingCategory = await prisma.feeCategory.findUnique({
    where: {
      name,
    },
  });

  if (existingCategory) {
    throw new Error("Fee category already exists.");
  }

  return prisma.feeCategory.create({
    data: {
      name,
      description,
    },
  });
};

const getAllFeeCategories = async () => {
  return prisma.feeCategory.findMany({
    include: {
      feeStructures: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getFeeCategoryById = async (id) => {
  const category = await prisma.feeCategory.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      feeStructures: true,
    },
  });

  if (!category) {
    throw new Error("Fee category not found.");
  }

  return category;
};

const updateFeeCategory = async (id, data) => {
  const category = await prisma.feeCategory.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!category) {
    throw new Error("Fee category not found.");
  }

  return prisma.feeCategory.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

const deleteFeeCategory = async (id) => {
  const category = await prisma.feeCategory.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!category) {
    throw new Error("Fee category not found.");
  }

  return prisma.feeCategory.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createFeeCategory,
  getAllFeeCategories,
  getFeeCategoryById,
  updateFeeCategory,
  deleteFeeCategory,
};