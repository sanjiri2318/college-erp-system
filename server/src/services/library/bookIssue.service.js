const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");
const ConflictError = require("../../errors/ConflictError");
const { getPagination } = require("../../utils/pagination");

const ISSUE_DAYS = 14;

const createBookIssue = async (data) => {
  const student = await prisma.student.findUnique({
    where: {
      id: Number(data.studentId),
    },
  });

  if (!student) {
    throw new NotFoundError("Student");
  }

  const copy = await prisma.bookCopy.findUnique({
    where: {
      id: Number(data.bookCopyId),
    },
    include: {
      book: true,
    },
  });

  if (!copy) {
    throw new NotFoundError("Book Copy");
  }

  if (copy.status !== "AVAILABLE") {
    throw new ConflictError(
      "Book copy is not available."
    );
  }

  const issueDate = new Date();

  const dueDate = new Date(issueDate);

  dueDate.setDate(dueDate.getDate() + ISSUE_DAYS);

  return prisma.$transaction(async (tx) => {
    const issue = await tx.bookIssue.create({
      data: {
        studentId: Number(data.studentId),
        bookCopyId: Number(data.bookCopyId),
        issueDate,
        dueDate,
        remarks: data.remarks,
      },
      include: {
        student: true,
        bookCopy: {
          include: {
            book: true,
          },
        },
      },
    });

    await tx.bookCopy.update({
      where: {
        id: Number(data.bookCopyId),
      },
      data: {
        status: "ISSUED",
      },
    });

    return issue;
  });
};

const getAllBookIssues = async (query) => {
  const { page, limit, skip } = getPagination(query);

  const where = {};

  if (query.studentId) {
    where.studentId = Number(query.studentId);
  }

  if (query.status) {
    where.status = query.status;
  }

  const [issues, total] = await Promise.all([
    prisma.bookIssue.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        issueDate: "desc",
      },
      include: {
        student: true,
        bookCopy: {
          include: {
            book: true,
          },
        },
      },
    }),

    prisma.bookIssue.count({
      where,
    }),
  ]);

  return {
    data: issues,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getBookIssueById = async (id) => {
  const issue = await prisma.bookIssue.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      student: true,
      bookCopy: {
        include: {
          book: true,
        },
      },
    },
  });

  if (!issue) {
    throw new NotFoundError("Book Issue");
  }

  return issue;
};

const returnBook = async (id) => {
  const issue = await prisma.bookIssue.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      bookCopy: true,
    },
  });

  if (!issue) {
    throw new NotFoundError("Book Issue");
  }

  if (issue.status === "RETURNED") {
    throw new ConflictError("Book has already been returned.");
  }

  const returnDate = new Date();

  let fine = 0;

  if (returnDate > issue.dueDate) {
    const lateDays = Math.ceil(
      (returnDate - issue.dueDate) / (1000 * 60 * 60 * 24)
    );

    fine = lateDays * 10; // ₹10 per day
  }

  return prisma.$transaction(async (tx) => {
    const updatedIssue = await tx.bookIssue.update({
      where: {
        id: Number(id),
      },
      data: {
        returnDate,
        fine,
        status: fine > 0 ? "OVERDUE" : "RETURNED",
      },
    });

    await tx.bookCopy.update({
      where: {
        id: issue.bookCopyId,
      },
      data: {
        status: "AVAILABLE",
      },
    });

    return await tx.bookIssue.findUnique({
      where: {
        id: updatedIssue.id,
      },
      include: {
        student: true,
        bookCopy: {
          include: {
            book: true,
          },
        },
      },
    });
  });
};

module.exports = {
  createBookIssue,
  getAllBookIssues,
  getBookIssueById,
  returnBook,
};