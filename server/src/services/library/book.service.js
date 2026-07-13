const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const createBook = async (data) => {
  // Check duplicate ISBN
  const existingBook = await prisma.book.findUnique({
    where: {
      isbn: data.isbn,
    },
  });

  if (existingBook) {
    throw new ConflictError("Book with this ISBN already exists.");
  }

  // Validate Category
  const category = await prisma.bookCategory.findUnique({
    where: {
      id: Number(data.categoryId),
    },
  });

  if (!category) {
    throw new NotFoundError("Book Category");
  }

  // Validate Author
  const author = await prisma.author.findUnique({
    where: {
      id: Number(data.authorId),
    },
  });

  if (!author) {
    throw new NotFoundError("Author");
  }

  // Validate Publisher
  const publisher = await prisma.publisher.findUnique({
    where: {
      id: Number(data.publisherId),
    },
  });

  if (!publisher) {
    throw new NotFoundError("Publisher");
  }

  return prisma.book.create({
    data: {
      title: data.title,
      isbn: data.isbn,
      edition: data.edition,
      language: data.language,
      price: data.price,
      totalCopies: data.totalCopies || 0,
      categoryId: Number(data.categoryId),
      authorId: Number(data.authorId),
      publisherId: Number(data.publisherId),
    },
    include: {
      category: true,
      author: true,
      publisher: true,
    },
  });
};

const getAllBooks = async (query) => {
  const { page, limit, skip } = getPagination(query);

  const where = {};

  if (query.search) {
    where.OR = [
      {
        title: {
          contains: query.search,
        },
      },
      {
        isbn: {
          contains: query.search,
        },
      },
    ];
  }

  if (query.categoryId) {
    where.categoryId = Number(query.categoryId);
  }

  if (query.authorId) {
    where.authorId = Number(query.authorId);
  }

  if (query.publisherId) {
    where.publisherId = Number(query.publisherId);
  }

  const [books, total] = await Promise.all([
    prisma.book.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        title: "asc",
      },
      include: {
        category: true,
        author: true,
        publisher: true,
      },
    }),

    prisma.book.count({
      where,
    }),
  ]);

  return {
    data: books,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getBookById = async (id) => {
  const book = await prisma.book.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      category: true,
      author: true,
      publisher: true,
      copies: true,
    },
  });

  if (!book) {
    throw new NotFoundError("Book");
  }

  return book;
};

const updateBook = async (id, data) => {
  await getBookById(id);

  if (data.isbn) {
    const duplicate = await prisma.book.findFirst({
      where: {
        isbn: data.isbn,
        NOT: {
          id: Number(id),
        },
      },
    });

    if (duplicate) {
      throw new ConflictError(
        "Book with this ISBN already exists."
      );
    }
  }

  return prisma.book.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
      categoryId: data.categoryId
        ? Number(data.categoryId)
        : undefined,
      authorId: data.authorId
        ? Number(data.authorId)
        : undefined,
      publisherId: data.publisherId
        ? Number(data.publisherId)
        : undefined,
    },
    include: {
      category: true,
      author: true,
      publisher: true,
    },
  });
};

const deleteBook = async (id) => {
  const book = await prisma.book.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      copies: true,
    },
  });

  if (!book) {
    throw new NotFoundError("Book");
  }

  if (book.copies.length > 0) {
    throw new ConflictError(
      "Cannot delete book because copies are assigned."
    );
  }

  return prisma.book.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};