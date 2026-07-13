const prisma = require("../../config/prisma");

const createHostelBlock = async (data) => {
  const {
    name,
    hostelId,
  } = data;

  const hostel = await prisma.hostel.findUnique({
    where: {
      id: Number(hostelId),
    },
  });

  if (!hostel) {
    throw new Error("Hostel not found.");
  }

  const existingBlock =
    await prisma.hostelBlock.findFirst({
      where: {
        hostelId: Number(hostelId),
        name,
      },
    });

  if (existingBlock) {
    throw new Error(
      "Hostel block already exists."
    );
  }

  return prisma.hostelBlock.create({
    data: {
      name,
      hostelId: Number(hostelId),
    },
  });
};

const getAllHostelBlocks =
  async () => {
    return prisma.hostelBlock.findMany({
      include: {
        hostel: true,
        rooms: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  };

const getHostelBlockById =
  async (id) => {
    const block =
      await prisma.hostelBlock.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          hostel: true,
          rooms: true,
        },
      });

    if (!block) {
      throw new Error(
        "Hostel block not found."
      );
    }

    return block;
  };

const updateHostelBlock =
  async (id, data) => {
    const block =
      await prisma.hostelBlock.findUnique({
        where: {
          id: Number(id),
        },
      });

    if (!block) {
      throw new Error(
        "Hostel block not found."
      );
    }

    return prisma.hostelBlock.update({
      where: {
        id: Number(id),
      },
      data: {
        ...data,
        hostelId: data.hostelId
          ? Number(data.hostelId)
          : undefined,
      },
    });
  };

const deleteHostelBlock =
  async (id) => {
    const block =
      await prisma.hostelBlock.findUnique({
        where: {
          id: Number(id),
        },
      });

    if (!block) {
      throw new Error(
        "Hostel block not found."
      );
    }

    return prisma.hostelBlock.delete({
      where: {
        id: Number(id),
      },
    });
  };

module.exports = {
  createHostelBlock,
  getAllHostelBlocks,
  getHostelBlockById,
  updateHostelBlock,
  deleteHostelBlock,
};