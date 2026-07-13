const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const createBookCopy = async (data) => {
  const book = await prisma.book.findUnique({
    where: {
      id: Number(data.bookId),
    },
  });

  if (!book) {
    throw new NotFoundError("Book");
  }

  const barcodeExists = await prisma.bookCopy.findUnique({
    where: {
      barcode: data.barcode,
    },
  });

  if (barcodeExists) {
    throw new ConflictError("Barcode already exists.");
  }

  const accessionExists = await prisma.bookCopy.findUnique({
    where: {
      accessionNumber: data.accessionNumber,
    },
  });

  if (accessionExists) {
    throw new ConflictError(
      "Accession number already exists."
    );
  }

  const copy = await prisma.bookCopy.create({
    data: {
      barcode: data.barcode,
      accessionNumber: data.accessionNumber,
      shelfNumber: data.shelfNumber,
      rackNumber: data.rackNumber,
      purchaseDate: data.purchaseDate,
      purchasePrice: data.purchasePrice,
      remarks: data.remarks,
      bookId: Number(data.bookId),
    },
    include: {
      book: true,
    },
  });

  await prisma.book.update({
    where: {
      id: Number(data.bookId),
    },
    data: {
      totalCopies: {
        increment: 1,
      },
    },
  });

  return copy;
};

const getAllBookCopies = async (query) => {
  const { page, limit, skip } = getPagination(query);

  const where = {};

  if (query.bookId) {
    where.bookId = Number(query.bookId);
  }

  if (query.status) {
    where.status = query.status;
  }

  if (query.search) {
    where.OR = [
      {
        barcode: {
          contains: query.search,
        },
      },
      {
        accessionNumber: {
          contains: query.search,
        },
      },
    ];
  }

  const [copies, total] = await Promise.all([
    prisma.bookCopy.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        book: true,
      },
    }),

    prisma.bookCopy.count({
      where,
    }),
  ]);

  return {
    data: copies,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getBookCopyById = async (id) => {
  const copy = await prisma.bookCopy.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      book: true,
    },
  });

  if (!copy) {
    throw new NotFoundError("Book Copy");
  }

  return copy;
};

const updateBookCopy = async (id, data) => {
  await getBookCopyById(id);

  return prisma.bookCopy.update({
    where: {
      id: Number(id),
    },
    data,
    include: {
      book: true,
    },
  });
};

const deleteBookCopy = async (id) => {
  const copy = await getBookCopyById(id);

  await prisma.bookCopy.delete({
    where: {
      id: Number(id),
    },
  });

  await prisma.book.update({
    where: {
      id: copy.bookId,
    },
    data: {
      totalCopies: {
        decrement: 1,
      },
    },
  });

  return true;
};

module.exports = {
  createBookCopy,
  getAllBookCopies,
  getBookCopyById,
  updateBookCopy,
  deleteBookCopy,
};