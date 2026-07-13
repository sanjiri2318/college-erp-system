const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const createPublisher = async (data) => {
  const existingPublisher = await prisma.publisher.findFirst({
    where: {
      name: data.name,
    },
  });

  if (existingPublisher) {
    throw new ConflictError("Publisher already exists.");
  }

  return prisma.publisher.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    },
  });
};

const getAllPublishers = async (query) => {
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
        ],
      }
    : {};

  const [publishers, total] = await Promise.all([
    prisma.publisher.findMany({
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
    prisma.publisher.count({
      where,
    }),
  ]);

  return {
    data: publishers,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getPublisherById = async (id) => {
  const publisher = await prisma.publisher.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      books: true,
    },
  });

  if (!publisher) {
    throw new NotFoundError("Publisher");
  }

  return publisher;
};

const updatePublisher = async (id, data) => {
  await getPublisherById(id);

  if (data.name) {
    const duplicate = await prisma.publisher.findFirst({
      where: {
        name: data.name,
        NOT: {
          id: Number(id),
        },
      },
    });

    if (duplicate) {
      throw new ConflictError("Publisher already exists.");
    }
  }

  return prisma.publisher.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

const deletePublisher = async (id) => {
  const publisher = await prisma.publisher.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      books: true,
    },
  });

  if (!publisher) {
    throw new NotFoundError("Publisher");
  }

  if (publisher.books.length > 0) {
    throw new ConflictError(
      "Cannot delete publisher because books are assigned."
    );
  }

  return prisma.publisher.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createPublisher,
  getAllPublishers,
  getPublisherById,
  updatePublisher,
  deletePublisher,
};