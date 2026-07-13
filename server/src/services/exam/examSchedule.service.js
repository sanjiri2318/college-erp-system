const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const { getPagination } = require("../../utils/pagination");

const createExamSchedule = async (data) => {
  const examType = await prisma.examType.findUnique({
    where: {
      id: Number(data.examTypeId),
    },
  });

  if (!examType) {
    throw new NotFoundError("Exam Type");
  }

  const subject = await prisma.subject.findUnique({
    where: {
      id: Number(data.subjectId),
    },
  });

  if (!subject) {
    throw new NotFoundError("Subject");
  }

  const faculty = await prisma.faculty.findUnique({
    where: {
      id: Number(data.facultyId),
    },
  });

  if (!faculty) {
    throw new NotFoundError("Faculty");
  }

  return prisma.examSchedule.create({
    data: {
      examTypeId: Number(data.examTypeId),
      subjectId: Number(data.subjectId),
      facultyId: Number(data.facultyId),
      semester: Number(data.semester),
      examDate: new Date(data.examDate),
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      totalMarks: Number(data.totalMarks),
      hall: data.hall,
    },
    include: {
      examType: true,
      subject: true,
      faculty: true,
    },
  });
};

const getAllExamSchedules = async (query) => {
  const { page, limit, skip } = getPagination(query);

  const [examSchedules, total] = await Promise.all([
    prisma.examSchedule.findMany({
      skip,
      take: limit,
      orderBy: {
        examDate: "asc",
      },
      include: {
        examType: true,
        subject: true,
        faculty: true,
      },
    }),

    prisma.examSchedule.count(),
  ]);

  return {
    data: examSchedules,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getExamScheduleById = async (id) => {
  const examSchedule = await prisma.examSchedule.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      examType: true,
      subject: true,
      faculty: true,
    },
  });

  if (!examSchedule) {
    throw new NotFoundError("Exam Schedule");
  }

  return examSchedule;
};

const updateExamSchedule = async (id, data) => {
  await getExamScheduleById(id);

  return prisma.examSchedule.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
      examTypeId: data.examTypeId
        ? Number(data.examTypeId)
        : undefined,
      subjectId: data.subjectId
        ? Number(data.subjectId)
        : undefined,
      facultyId: data.facultyId
        ? Number(data.facultyId)
        : undefined,
      semester: data.semester
        ? Number(data.semester)
        : undefined,
      totalMarks: data.totalMarks
        ? Number(data.totalMarks)
        : undefined,
      examDate: data.examDate
        ? new Date(data.examDate)
        : undefined,
      startTime: data.startTime
        ? new Date(data.startTime)
        : undefined,
      endTime: data.endTime
        ? new Date(data.endTime)
        : undefined,
    },
    include: {
      examType: true,
      subject: true,
      faculty: true,
    },
  });
};

const deleteExamSchedule = async (id) => {
  await getExamScheduleById(id);

  return prisma.examSchedule.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createExamSchedule,
  getAllExamSchedules,
  getExamScheduleById,
  updateExamSchedule,
  deleteExamSchedule,
};