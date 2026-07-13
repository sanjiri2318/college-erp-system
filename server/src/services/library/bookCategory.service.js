const prisma = require("../../config/prisma");
const ValidationError = require("../../errors/ValidationError");
const NotFoundError = require("../../errors/NotFoundError");
const { getPagination } = require("../../utils/pagination");

const createBookCategory = async (data) => {
  const existingCategory = await prisma.bookCategory.findUnique({
    where: {
      name: data.name,
    },
  });

  if (existingCategory) {
    throw new ValidationError(
      "Book category already exists."
    );
  }

  return prisma.bookCategory.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
};

const getAllBookCategories = async (query) => {
  const { page, limit, skip } = getPagination(query);

  const where = query.search
    ? {
        name: {
          contains: query.search,
        },
      }
    : {};

  const [categories, total] = await Promise.all([
    prisma.bookCategory.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        name: "asc",
      },
    }),

    prisma.bookCategory.count({
      where,
    }),
  ]);

  return {
    data: categories,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getBookCategoryById = async (id) => {
  const category = await prisma.bookCategory.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!category) {
    throw new NotFoundError("Book Category");
  }

  return category;
};

const updateBookCategory = async (id, data) => {
  const category = await prisma.bookCategory.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!category) {
    throw new NotFoundError("Book Category");
  }

  if (data.name) {
    const duplicate = await prisma.bookCategory.findFirst({
      where: {
        name: data.name,
        NOT: {
          id: Number(id),
        },
      },
    });

    if (duplicate) {
      throw new ValidationError(
        "Book category already exists."
      );
    }
  }

  return prisma.bookCategory.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

const deleteBookCategory = async (id) => {
  const category = await prisma.bookCategory.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      books: true,
    },
  });

  if (!category) {
    throw new NotFoundError("Book Category");
  }

  if (category.books.length > 0) {
    throw new ValidationError(
      "Cannot delete category because books are assigned."
    );
  }

  return prisma.bookCategory.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createBookCategory,
  getAllBookCategories,
  getBookCategoryById,
  updateBookCategory,
  deleteBookCategory,
};