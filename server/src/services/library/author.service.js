const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const createAuthor = async (data) => {
  const existingAuthor = await prisma.author.findFirst({
    where: {
      name: data.name,
    },
  });

  if (existingAuthor) {
    throw new ConflictError("Author already exists.");
  }

  return prisma.author.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
    },
  });
};

const getAllAuthors = async (query) => {
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
            email: {
              contains: query.search,
            },
          },
          {
            country: {
              contains: query.search,
            },
          },
        ],
      }
    : {};

  const [authors, total] = await Promise.all([
    prisma.author.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        name: "asc",
      },
      include: {
        books: true,
      },
    }),

    prisma.author.count({
      where,
    }),
  ]);

  return {
    data: authors,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getAuthorById = async (id) => {
  const author = await prisma.author.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      books: true,
    },
  });

  if (!author) {
    throw new NotFoundError("Author");
  }

  return author;
};

const updateAuthor = async (id, data) => {
  await getAuthorById(id);

  if (data.name) {
    const duplicate = await prisma.author.findFirst({
      where: {
        name: data.name,
        NOT: {
          id: Number(id),
        },
      },
    });

    if (duplicate) {
      throw new ConflictError("Author already exists.");
    }
  }

  return prisma.author.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

const deleteAuthor = async (id) => {
  const author = await prisma.author.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      books: true,
    },
  });

  if (!author) {
    throw new NotFoundError("Author");
  }

  if (author.books.length > 0) {
    throw new ConflictError(
      "Cannot delete author because books are assigned."
    );
  }

  return prisma.author.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};