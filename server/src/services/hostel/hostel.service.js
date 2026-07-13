const prisma = require("../../config/prisma");

const createHostel = async (data) => {
  const {
    name,
    code,
    type,
    address,
    wardenName,
    wardenPhone,
    description,
  } = data;

  const existingHostel = await prisma.hostel.findFirst({
    where: {
      OR: [
        { name },
        { code },
      ],
    },
  });

  if (existingHostel) {
    throw new Error("Hostel with this name or code already exists.");
  }

  return prisma.hostel.create({
    data: {
      name,
      code,
      type,
      address,
      wardenName,
      wardenPhone,
      description,
    },
  });
};

const getAllHostels = async () => {
  return prisma.hostel.findMany({
    include: {
      blocks: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getHostelById = async (id) => {
  const hostel = await prisma.hostel.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      blocks: {
        include: {
          rooms: {
            include: {
              beds: true,
            },
          },
        },
      },
    },
  });

  if (!hostel) {
    throw new Error("Hostel not found.");
  }

  return hostel;
};

const updateHostel = async (id, data) => {
  const hostel = await prisma.hostel.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!hostel) {
    throw new Error("Hostel not found.");
  }

  return prisma.hostel.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
    },
  });
};

const deleteHostel = async (id) => {
  const hostel = await prisma.hostel.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!hostel) {
    throw new Error("Hostel not found.");
  }

  return prisma.hostel.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
  deleteHostel,
};