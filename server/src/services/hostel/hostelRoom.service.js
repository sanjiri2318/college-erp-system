const prisma = require("../../config/prisma");

const createHostelRoom = async (data) => {
  const {
    roomNumber,
    floor,
    capacity,
    price,
    hostelBlockId,
  } = data;

  const block = await prisma.hostelBlock.findUnique({
    where: {
      id: Number(hostelBlockId),
    },
  });

  if (!block) {
    throw new Error("Hostel block not found.");
  }

  const existingRoom = await prisma.hostelRoom.findFirst({
    where: {
      hostelBlockId: Number(hostelBlockId),
      roomNumber,
    },
  });

  if (existingRoom) {
    throw new Error("Room already exists.");
  }

  return prisma.hostelRoom.create({
    data: {
      roomNumber,
      floor: Number(floor),
      capacity: Number(capacity),
      price: Number(price),
      hostelBlockId: Number(hostelBlockId),
    },
  });
};

const getAllHostelRooms = async () => {
  return prisma.hostelRoom.findMany({
    include: {
      hostelBlock: {
        include: {
          hostel: true,
        },
      },
      beds: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getHostelRoomById = async (id) => {
  const room = await prisma.hostelRoom.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      hostelBlock: {
        include: {
          hostel: true,
        },
      },
      beds: true,
    },
  });

  if (!room) {
    throw new Error("Hostel room not found.");
  }

  return room;
};

const updateHostelRoom = async (id, data) => {
  const room = await prisma.hostelRoom.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!room) {
    throw new Error("Hostel room not found.");
  }

  return prisma.hostelRoom.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
      floor:
        data.floor !== undefined
          ? Number(data.floor)
          : undefined,
      capacity:
        data.capacity !== undefined
          ? Number(data.capacity)
          : undefined,
      price:
        data.price !== undefined
          ? Number(data.price)
          : undefined,
      hostelBlockId:
        data.hostelBlockId !== undefined
          ? Number(data.hostelBlockId)
          : undefined,
    },
  });
};

const deleteHostelRoom = async (id) => {
  const room = await prisma.hostelRoom.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!room) {
    throw new Error("Hostel room not found.");
  }

  return prisma.hostelRoom.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createHostelRoom,
  getAllHostelRooms,
  getHostelRoomById,
  updateHostelRoom,
  deleteHostelRoom,
};