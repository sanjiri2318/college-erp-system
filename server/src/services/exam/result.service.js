const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const createResult = async (data) => {
  const studentId = Number(data.studentId);
  const subjectId = Number(data.subjectId);
  const examTypeId = Number(data.examTypeId);

  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    throw new NotFoundError("Student");
  }

  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
  });

  if (!subject) {
    throw new NotFoundError("Subject");
  }

  const examType = await prisma.examType.findUnique({
    where: { id: examTypeId },
  });

  if (!examType) {
    throw new NotFoundError("Exam Type");
  }
  if (!examType.isFinalExam) {
    throw new ConflictError(
      "Results can only be generated for Final Examinations."
    );
  }

  const existingResult = await prisma.result.findFirst({
    where: {
      studentId,
      subjectId,
      examTypeId,
    },
  });

  if (existingResult) {
    throw new ConflictError("Result already generated.");
  }

  // Fetch all internal marks
  const internalMarksList = await prisma.internalMark.findMany({
    where: {
      studentId,
      subjectId,
    },
    orderBy: {
      internalNumber: "asc",
    },
  });

  if (internalMarksList.length === 0) {
    throw new NotFoundError("Internal Marks");
  }

  // Calculate average obtained marks
    const averageObtained =
    internalMarksList.reduce(
        (sum, item) => sum + item.marksObtained,
        0
    ) / internalMarksList.length;

    // Calculate average maximum marks
    const averageMaxMarks =
    internalMarksList.reduce(
        (sum, item) => sum + item.maxMarks,
        0
    ) / internalMarksList.length;

    // Normalize internal marks to ExamType maximum
    const internalMarks = Number(
    (
        (averageObtained / averageMaxMarks) *
        examType.maxInternalMarks
    ).toFixed(2)
    );

  // Fetch external marks
  const markEntry = await prisma.markEntry.findFirst({
    where: {
      studentId,
      subjectId,
      examTypeId,
    },
  });

  if (!markEntry) {
    throw new NotFoundError("Mark Entry");
  }

  const externalMarks = Number(
    (
        (markEntry.marks / markEntry.maxMarks) *
        examType.maxExternalMarks
    ).toFixed(2)
    );

  if (internalMarks > examType.maxInternalMarks) {
    throw new ConflictError(
      `Internal marks cannot exceed ${examType.maxInternalMarks}.`
    );
  }

  if (externalMarks > examType.maxExternalMarks) {
    throw new ConflictError(
      `External marks cannot exceed ${examType.maxExternalMarks}.`
    );
  }

  const totalMarks = Number(
    (internalMarks + externalMarks).toFixed(2)
  );

  const maxMarks =
    examType.maxInternalMarks +
    examType.maxExternalMarks;

  const percentage = Number(
    ((totalMarks / maxMarks) * 100).toFixed(2)
  );

  let grade = "F";

  if (percentage >= 90) grade = "O";
  else if (percentage >= 80) grade = "A+";
  else if (percentage >= 70) grade = "A";
  else if (percentage >= 60) grade = "B+";
  else if (percentage >= 50) grade = "B";
  else if (percentage >= 40) grade = "C";

  let gradePoint = 0;

  switch (grade) {
    case "O":
      gradePoint = 10;
      break;
    case "A+":
      gradePoint = 9;
      break;
    case "A":
      gradePoint = 8;
      break;
    case "B+":
      gradePoint = 7;
      break;
    case "B":
      gradePoint = 6;
      break;
    case "C":
      gradePoint = 5;
      break;
    default:
      gradePoint = 0;
  }

  const resultStatus =
    totalMarks >= examType.passMarks
      ? "PASS"
      : "FAIL";

  return prisma.result.create({
    data: {
      studentId,
      subjectId,
      examTypeId,
      internalMarks,
      externalMarks,
      totalMarks,
      percentage,
      grade,
      resultStatus,
      gradePoint,
      remarks: data.remarks,
    },
    include: {
      student: true,
      subject: true,
      examType: true,
    },
  });
};

const getAllResults = async (query) => {
  const { page, limit, skip } = getPagination(query);

  const where = query.search
    ? {
        OR: [
          {
            student: {
              name: {
                contains: query.search,
              },
            },
          },
          {
            student: {
              regNumber: {
                contains: query.search,
              },
            },
          },
          {
            subject: {
              name: {
                contains: query.search,
              },
            },
          },
          {
            subject: {
              code: {
                contains: query.search,
              },
            },
          },
          {
            examType: {
              name: {
                contains: query.search,
              },
            },
          },
          {
            grade: {
              contains: query.search,
            },
          },
          {
            resultStatus: {
              contains: query.search,
            },
          },
        ],
      }
    : {};

  const [results, total] = await Promise.all([
    prisma.result.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        student: true,
        subject: true,
        examType: true,
      },
    }),

    prisma.result.count({
      where,
    }),
  ]);

  return {
    data: results,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getResultById = async (id) => {
  const result = await prisma.result.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      student: true,
      subject: true,
      examType: true,
    },
  });

  if (!result) {
    throw new NotFoundError("Result");
  }

  return result;
};

module.exports = {
  createResult,
  getAllResults,
  getResultById,
};