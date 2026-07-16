const prisma = require("../../config/prisma");

const getDashboardAnalytics = async () => {
  const [
    totalStudents,
    totalFaculty,
    totalDepartments,
    totalSubjects,
    totalResults,
    totalPublishedResults,
    totalSemesterGPAs,
    totalCGPAs,
    totalAcademicRanks,
    recentResults,
    topStudents,
    averageCGPA,
  ] = await Promise.all([
    prisma.student.count(),

    prisma.faculty.count(),

    prisma.department.count(),

    prisma.subject.count(),

    prisma.result.count(),

    prisma.result.count({
      where: {
        publishStatus: "PUBLISHED",
      },
    }),

    prisma.semesterGPA.count(),

    prisma.cGPA.count(),

    prisma.academicRank.count(),

    prisma.result.findMany({
      take: 5,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        student: true,
        subject: true,
      },
    }),

    prisma.academicRank.findMany({
      take: 10,

      orderBy: {
        overallRank: "asc",
      },

      include: {
        student: {
          include: {
            department: true,
          },
        },
      },
    }),

    prisma.cGPA.aggregate({
      _avg: {
        cgpa: true,
      },
    }),
  ]);

  const passCount = await prisma.result.count({
    where: {
      resultStatus: "PASS",
      publishStatus: "PUBLISHED",
    },
  });

  const failCount = await prisma.result.count({
    where: {
      resultStatus: "FAIL",
      publishStatus: "PUBLISHED",
    },
  });

  const passPercentage =
    totalPublishedResults === 0
      ? 0
      : Number(
          (
            (passCount / totalPublishedResults) *
            100
          ).toFixed(2)
        );

  const failPercentage =
    totalPublishedResults === 0
      ? 0
      : Number(
          (
            (failCount / totalPublishedResults) *
            100
          ).toFixed(2)
        );

  return {
    overview: {
      totalStudents,
      totalFaculty,
      totalDepartments,
      totalSubjects,
    },

    academics: {
      totalResults,
      totalPublishedResults,
      totalSemesterGPAs,
      totalCGPAs,
      totalAcademicRanks,

      averageCGPA: Number(
        (
          averageCGPA._avg.cgpa || 0
        ).toFixed(2)
      ),

      passPercentage,
      failPercentage,
    },

    topStudents,

    recentResults,
  };
};

module.exports = {
  getDashboardAnalytics,
};