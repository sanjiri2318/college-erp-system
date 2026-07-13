const prisma = require("../../config/prisma");

const createHostelBed = async (data) => {
  const {
    bedNo,
    hostelRoomId,
  } = data;

  const room = await prisma.hostelRoom.findUnique({
    where: {
      id: Number(hostelRoomId),
    },
  });

  if (!room) {
    throw new Error("Hostel room not found.");
  }

  const existingBed = await prisma.hostelBed.findFirst({
    where: {
      hostelRoomId: Number(hostelRoomId),
      bedNo,
    },
  });

  if (existingBed) {
    throw new Error("Bed already exists.");
  }

  return prisma.hostelBed.create({
    data: {
      bedNo,
      hostelRoomId: Number(hostelRoomId),
    },
  });
};

const getAllHostelBeds = async () => {
  return prisma.hostelBed.findMany({
    include: {
      hostelRoom: {
        include: {
          hostelBlock: {
            include: {
              hostel: true,
            },
          },
        },
      },
      allocation: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getHostelBedById = async (id) => {
  const bed = await prisma.hostelBed.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      hostelRoom: {
        include: {
          hostelBlock: {
            include: {
              hostel: true,
            },
          },
        },
      },
      allocation: true,
    },
  });

  if (!bed) {
    throw new Error("Hostel bed not found.");
  }

  return bed;
};

const updateHostelBed = async (id, data) => {
  const bed = await prisma.hostelBed.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!bed) {
    throw new Error("Hostel bed not found.");
  }

  return prisma.hostelBed.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
      hostelRoomId:
        data.hostelRoomId !== undefined
          ? Number(data.hostelRoomId)
          : undefined,
    },
  });
};

const deleteHostelBed = async (id) => {
  const bed = await prisma.hostelBed.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!bed) {
    throw new Error("Hostel bed not found.");
  }

  return prisma.hostelBed.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createHostelBed,
  getAllHostelBeds,
  getHostelBedById,
  updateHostelBed,
  deleteHostelBed,
};