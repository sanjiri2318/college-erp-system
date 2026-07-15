const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const { getPagination } = require("../../utils/pagination");

const logAudit = async (data) => {
  return prisma.auditLog.create({
    data: {
      userId: Number(data.userId),

      module: data.module,

      action: data.action,

      description: data.description,

      ipAddress: data.ipAddress,
    },

    include: {
      user: true,
    },
  });
};

const getAllAuditLogs = async (query) => {
  const { page, limit, skip } =
    getPagination(query);

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      skip,
      take: limit,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    }),

    prisma.auditLog.count(),
  ]);

  return {
    data: logs,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getAuditLogById = async (id) => {
  const log = await prisma.auditLog.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  if (!log) {
    throw new NotFoundError("Audit Log");
  }

  return log;
};

module.exports = {
  logAudit,
  getAllAuditLogs,
  getAuditLogById,
};