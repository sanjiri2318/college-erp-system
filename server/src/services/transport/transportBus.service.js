const prisma = require("../../config/prisma");

const createTransportBus = async (data) => {
  const {
    busNumber,
    vehicleType,
    capacity,
    driverName,
    driverPhone,
    routeId,
  } = data;

  const route = await prisma.transportRoute.findUnique({
    where: {
      id: Number(routeId),
    },
  });

  if (!route) {
    throw new Error("Transport route not found.");
  }

  const existingBus = await prisma.transportBus.findUnique({
    where: {
      busNumber,
    },
  });

  if (existingBus) {
    throw new Error("Bus number already exists.");
  }

  return prisma.transportBus.create({
    data: {
      busNumber,
      vehicleType,
      capacity: Number(capacity),
      driverName,
      driverPhone,
      routeId: Number(routeId),
    },
    include: {
      route: true,
    },
  });
};

const getAllTransportBuses = async () => {
  return prisma.transportBus.findMany({
    include: {
      route: true,
      students: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getTransportBusById = async (id) => {
  const bus = await prisma.transportBus.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      route: true,
      students: {
        include: {
          student: true,
          stop: true,
        },
      },
    },
  });

  if (!bus) {
    throw new Error("Transport bus not found.");
  }

  return bus;
};

const updateTransportBus = async (id, data) => {
  const bus = await prisma.transportBus.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!bus) {
    throw new Error("Transport bus not found.");
  }

  if (data.routeId) {
    const route = await prisma.transportRoute.findUnique({
      where: {
        id: Number(data.routeId),
      },
    });

    if (!route) {
      throw new Error("Transport route not found.");
    }
  }

  if (data.busNumber) {
    const duplicate = await prisma.transportBus.findFirst({
      where: {
        busNumber: data.busNumber,
        NOT: {
          id: Number(id),
        },
      },
    });

    if (duplicate) {
      throw new Error("Bus number already exists.");
    }
  }

  return prisma.transportBus.update({
    where: {
      id: Number(id),
    },
    data: {
      busNumber: data.busNumber,
      vehicleType: data.vehicleType,
      capacity:
        data.capacity !== undefined
          ? Number(data.capacity)
          : undefined,
      driverName: data.driverName,
      driverPhone: data.driverPhone,
      routeId:
        data.routeId !== undefined
          ? Number(data.routeId)
          : undefined,
    },
    include: {
      route: true,
    },
  });
};

const deleteTransportBus = async (id) => {
  const bus = await prisma.transportBus.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      students: true,
    },
  });

  if (!bus) {
    throw new Error("Transport bus not found.");
  }

  if (bus.students.length > 0) {
    throw new Error(
      "Cannot delete bus because students are allocated."
    );
  }

  return prisma.transportBus.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createTransportBus,
  getAllTransportBuses,
  getTransportBusById,
  updateTransportBus,
  deleteTransportBus,
};