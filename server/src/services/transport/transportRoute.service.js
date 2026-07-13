const prisma = require("../../config/prisma");

const createTransportRoute = async (data) => {
  const existing = await prisma.transportRoute.findUnique({
    where: {
      routeCode: data.routeCode,
    },
  });

  if (existing) {
    throw new Error("Route code already exists.");
  }

  return prisma.transportRoute.create({
    data,
  });
};

const getAllTransportRoutes = async () => {
  return prisma.transportRoute.findMany({
    include: {
      stops: true,
      buses: true,
    },
    orderBy: {
      id: "asc",
    },
  });
};

const getTransportRouteById = async (id) => {
  const route = await prisma.transportRoute.findUnique({
    where: {
      id,
    },
    include: {
      stops: true,
      buses: true,
    },
  });

  if (!route) {
    throw new Error("Transport route not found.");
  }

  return route;
};

const updateTransportRoute = async (id, data) => {
  await getTransportRouteById(id);

  return prisma.transportRoute.update({
    where: {
      id,
    },
    data,
  });
};

const deleteTransportRoute = async (id) => {
  await getTransportRouteById(id);

  return prisma.transportRoute.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createTransportRoute,
  getAllTransportRoutes,
  getTransportRouteById,
  updateTransportRoute,
  deleteTransportRoute,
};