const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const createMarkEntry = async (data) => {
  const student = await prisma.student.findUnique({
    where: {
      id: Number(data.studentId),
    },
  });

  if (!student) {
    throw new NotFoundError("Student");
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

  const examType = await prisma.examType.findUnique({
    where: {
      id: Number(data.examTypeId),
    },
  });

  if (!examType) {
    throw new NotFoundError("Exam Type");
  }

  const existing = await prisma.markEntry.findFirst({
    where: {
      studentId: Number(data.studentId),
      subjectId: Number(data.subjectId),
      examTypeId: Number(data.examTypeId),
    },
  });

  if (existing) {
    throw new ConflictError(
      "Marks already entered for this student."
    );
  }

  const marks = Number(data.marks);
  const maxMarks = Number(data.maxMarks ?? 100);

  if (marks < 0 || marks > maxMarks) {
    throw new ConflictError(
      `Marks cannot exceed ${maxMarks}.`
    );
  }

  return prisma.markEntry.create({
    data: {
      studentId: Number(data.studentId),
      subjectId: Number(data.subjectId),
      facultyId: Number(data.facultyId),
      examTypeId: Number(data.examTypeId),
      marks,
      maxMarks,
      remarks: data.remarks,
    },
    include: {
      student: true,
      subject: true,
      faculty: true,
      examType: true,
    },
  });
};

const getAllMarkEntries = async (query) => {
  const { page, limit, skip } = getPagination(query);

  const [entries, total] = await Promise.all([
    prisma.markEntry.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        student: true,
        subject: true,
        faculty: true,
        examType: true,
      },
    }),

    prisma.markEntry.count(),
  ]);

  return {
    data: entries,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getMarkEntryById = async (id) => {
  const entry = await prisma.markEntry.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      student: true,
      subject: true,
      faculty: true,
      examType: true,
    },
  });

  if (!entry) {
    throw new NotFoundError("Mark Entry");
  }

  return entry;
};

const updateMarkEntry = async (id, data) => {
  const existing = await getMarkEntryById(id);

  if (existing.status === "LOCKED") {
    throw new ConflictError(
      "Locked mark entry cannot be edited."
    );
  }

  if (existing.status === "PUBLISHED") {
    throw new ConflictError(
      "Published mark entry cannot be edited."
    );
  }

  const updatedMaxMarks =
    data.maxMarks !== undefined
      ? Number(data.maxMarks)
      : existing.maxMarks;

  if (
    data.marks !== undefined &&
    (Number(data.marks) < 0 ||
      Number(data.marks) > updatedMaxMarks)
  ) {
    throw new ConflictError(
      `Marks cannot exceed ${updatedMaxMarks}.`
    );
  }

  return prisma.markEntry.update({
    where: {
      id: Number(id),
    },
    data: {
      marks:
        data.marks !== undefined
          ? Number(data.marks)
          : undefined,

      maxMarks:
        data.maxMarks !== undefined
          ? Number(data.maxMarks)
          : undefined,

      remarks: data.remarks,
      status: data.status,
    },
    include: {
      student: true,
      subject: true,
      faculty: true,
      examType: true,
    },
  });
};

const deleteMarkEntry = async (id) => {
  const existing = await getMarkEntryById(id);

  if (existing.status === "PUBLISHED") {
    throw new ConflictError(
      "Published mark entry cannot be deleted."
    );
  }

  return prisma.markEntry.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createMarkEntry,
  getAllMarkEntries,
  getMarkEntryById,
  updateMarkEntry,
  deleteMarkEntry,
};