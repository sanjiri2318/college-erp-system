const prisma = require("../../config/prisma");

const createTransportStop = async (data) => {
  const { stopName, stopOrder, routeId } = data;

  const route = await prisma.transportRoute.findUnique({
    where: { id: Number(routeId) },
  });

  if (!route) {
    throw new Error("Transport route not found.");
  }

  const existingStop = await prisma.transportStop.findFirst({
    where: {
      routeId: Number(routeId),
      stopOrder: Number(stopOrder),
    },
  });

  if (existingStop) {
    throw new Error("Stop order already exists for this route.");
  }

  return prisma.transportStop.create({
    data: {
      stopName,
      stopOrder: Number(stopOrder),
      routeId: Number(routeId),
    },
    include: {
      route: true,
    },
  });
};

const getAllTransportStops = async () => {
  return prisma.transportStop.findMany({
    include: {
      route: true,
    },
    orderBy: [
      {
        routeId: "asc",
      },
      {
        stopOrder: "asc",
      },
    ],
  });
};

const getTransportStopById = async (id) => {
  const stop = await prisma.transportStop.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      route: true,
      students: {
        include: {
          student: true,
          bus: true,
        },
      },
    },
  });

  if (!stop) {
    throw new Error("Transport stop not found.");
  }

  return stop;
};

const updateTransportStop = async (id, data) => {
  const stop = await prisma.transportStop.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!stop) {
    throw new Error("Transport stop not found.");
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

  if (data.stopOrder) {
    const duplicate = await prisma.transportStop.findFirst({
      where: {
        routeId: Number(data.routeId ?? stop.routeId),
        stopOrder: Number(data.stopOrder),
        NOT: {
          id: Number(id),
        },
      },
    });

    if (duplicate) {
      throw new Error("Stop order already exists for this route.");
    }
  }

  return prisma.transportStop.update({
    where: {
      id: Number(id),
    },
    data: {
      stopName: data.stopName,
      stopOrder:
        data.stopOrder !== undefined
          ? Number(data.stopOrder)
          : undefined,
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

const deleteTransportStop = async (id) => {
  const stop = await prisma.transportStop.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!stop) {
    throw new Error("Transport stop not found.");
  }

  return prisma.transportStop.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createTransportStop,
  getAllTransportStops,
  getTransportStopById,
  updateTransportStop,
  deleteTransportStop,
};