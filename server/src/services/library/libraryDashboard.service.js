const prisma = require("../../config/prisma");

const getLibraryDashboard = async () => {
  const [
    totalBooks,
    totalCopies,
    availableCopies,
    issuedCopies,
    lostCopies,
    damagedCopies,
    totalIssuedBooks,
    overdueBooks,
    totalFineCollected,
  ] = await Promise.all([
    prisma.book.count(),

    prisma.bookCopy.count(),

    prisma.bookCopy.count({
      where: {
        status: "AVAILABLE",
      },
    }),

    prisma.bookCopy.count({
      where: {
        status: "ISSUED",
      },
    }),

    prisma.bookCopy.count({
      where: {
        status: "LOST",
      },
    }),

    prisma.bookCopy.count({
      where: {
        status: "DAMAGED",
      },
    }),

    prisma.bookIssue.count({
      where: {
        status: "ISSUED",
      },
    }),

    prisma.bookIssue.count({
      where: {
        status: "OVERDUE",
      },
    }),

    prisma.bookIssue.aggregate({
      _sum: {
        fine: true,
      },
    }),
  ]);

  return {
    overview: {
      totalBooks,
      totalCopies,
      availableCopies,
      issuedCopies,
      lostCopies,
      damagedCopies,
    },

    circulation: {
      totalIssuedBooks,
      overdueBooks,
    },

    finance: {
      totalFineCollected:
        totalFineCollected._sum.fine || 0,
    },
  };
};

module.exports = {
  getLibraryDashboard,
};