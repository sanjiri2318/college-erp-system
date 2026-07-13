const prisma = require("../../config/prisma");

const allocateStudentTransport = async (data) => {
  const {
    studentId,
    busId,
    stopId,
  } = data;

  const student = await prisma.student.findUnique({
    where: {
      id: Number(studentId),
    },
  });

  if (!student) {
    throw new Error("Student not found.");
  }

  const bus = await prisma.transportBus.findUnique({
    where: {
      id: Number(busId),
    },
    include: {
      students: true,
    },
  });

  if (!bus) {
    throw new Error("Transport bus not found.");
  }

  const stop = await prisma.transportStop.findUnique({
    where: {
      id: Number(stopId),
    },
  });

  if (!stop) {
    throw new Error("Transport stop not found.");
  }

  const existingAllocation =
    await prisma.studentTransport.findUnique({
      where: {
        studentId: Number(studentId),
      },
    });

  if (existingAllocation) {
    throw new Error(
      "Student already has transport allocation."
    );
  }

  if (bus.students.length >= bus.capacity) {
    throw new Error("Bus is full.");
  }

  if (stop.routeId !== bus.routeId) {
    throw new Error(
      "Selected stop does not belong to the selected bus route."
    );
  }

  return prisma.studentTransport.create({
    data: {
      studentId: Number(studentId),
      busId: Number(busId),
      stopId: Number(stopId),
    },
    include: {
      student: true,
      bus: {
        include: {
          route: true,
        },
      },
      stop: true,
    },
  });
};

const getAllStudentTransport = async () => {
  return prisma.studentTransport.findMany({
    include: {
      student: true,
      bus: {
        include: {
          route: true,
        },
      },
      stop: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getStudentTransportById = async (id) => {
  const allocation =
    await prisma.studentTransport.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        student: true,
        bus: {
          include: {
            route: true,
          },
        },
        stop: true,
      },
    });

  if (!allocation) {
    throw new Error(
      "Transport allocation not found."
    );
  }

  return allocation;
};

const deleteStudentTransport = async (id) => {
  const allocation =
    await prisma.studentTransport.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!allocation) {
    throw new Error(
      "Transport allocation not found."
    );
  }

  return prisma.studentTransport.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  allocateStudentTransport,
  getAllStudentTransport,
  getStudentTransportById,
  deleteStudentTransport,
};