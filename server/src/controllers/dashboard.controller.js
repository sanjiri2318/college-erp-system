const prisma = require("../config/prisma");

// ======================================================
// ADMIN DASHBOARD
// ======================================================

const getAdminDashboard = async (req, res) => {
  try {
    const [
      totalStudents,
      totalFaculty,
      totalDepartments,
      totalSubjects,
      totalAttendanceRecords,
      totalInternalMarks,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.faculty.count(),
      prisma.department.count(),
      prisma.subject.count(),
      prisma.attendance.count(),
      prisma.internalMark.count(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalFaculty,
        totalDepartments,
        totalSubjects,
        totalAttendanceRecords,
        totalInternalMarks,
      },
    });
  } catch (error) {
    console.error("[getAdminDashboard]", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard.",
    });
  }
};

// ======================================================
// FACULTY DASHBOARD
// ======================================================

const getFacultyDashboard = async (req, res) => {
  try {
    // Get Faculty
    const faculty = await prisma.faculty.findUnique({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty profile not found.",
      });
    }

    // Get Assigned Subjects
    const assignedSubjects = await prisma.subject.findMany({
      where: {
        facultyId: faculty.id,
      },
      select: {
        id: true,
      },
    });

    const subjectIds = assignedSubjects.map(
      (subject) => subject.id
    );

    const totalSubjectsHandled = subjectIds.length;

    // Today Start & End
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Current Day (Prisma Enum Safe)
    const jsDay = new Date().getDay();

    const todayMap = {
      1: "MONDAY",
      2: "TUESDAY",
      3: "WEDNESDAY",
      4: "THURSDAY",
      5: "FRIDAY",
      6: "SATURDAY",
    };

    const today = todayMap[jsDay] || null;

        const [
      totalStudents,
      attendanceMarkedToday,
      internalMarksEntered,
      todayClasses,
      recentAttendance,
      recentMarks,
    ] = await Promise.all([
      subjectIds.length > 0
        ? prisma.attendance
            .groupBy({
              by: ["studentId"],
              where: {
                subjectId: {
                  in: subjectIds,
                },
              },
            })
            .then(
              (groups) =>
                groups.length
            )
        : Promise.resolve(0),

      subjectIds.length > 0
        ? prisma.attendance.count({
            where: {
              subjectId: {
                in: subjectIds,
              },
              date: {
                gte: todayStart,
                lte: todayEnd,
              },
            },
          })
        : Promise.resolve(0),

      subjectIds.length > 0
        ? prisma.internalMark.count({
            where: {
              subjectId: {
                in: subjectIds,
              },
            },
          })
        : Promise.resolve(0),

      today
        ? prisma.timetable.findMany({
            where: {
              facultyId: faculty.id,
              day: today,
            },
            include: {
              subject: {
                select: {
                  name: true,
                  code: true,
                },
              },
              department: {
                select: {
                  code: true,
                },
              },
            },
            orderBy: {
              period: "asc",
            },
          })
        : Promise.resolve([]),

      subjectIds.length > 0
        ? prisma.attendance.findMany({
            where: {
              subjectId: {
                in: subjectIds,
              },
            },
            include: {
              student: {
                select: {
                  name: true,
                  regNumber: true,
                },
              },
              subject: {
                select: {
                  name: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 5,
          })
        : Promise.resolve([]),

      subjectIds.length > 0
        ? prisma.internalMark.findMany({
            where: {
              subjectId: {
                in: subjectIds,
              },
            },
            include: {
              student: {
                select: {
                  name: true,
                  regNumber: true,
                },
              },
              subject: {
                select: {
                  name: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 5,
          })
        : Promise.resolve([]),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        facultyName:
          faculty.name,

        totalSubjectsHandled,

        totalStudents,

        attendanceMarkedToday,

        internalMarksEntered,

        todayClasses,

        recentAttendance,

        recentMarks,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to load faculty dashboard.",
    });
  }
};

// ======================================================
// STUDENT DASHBOARD
// ======================================================
const getStudentDashboard = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
        name: true,
        regNumber: true,
        semester: true,
        departmentId: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found.",
      });
    }

    const [
      attendanceRecords,
      markRecords,
      totalSubjects,
    ] = await Promise.all([
      prisma.attendance.findMany({
        where: {
          studentId: student.id,
        },
        select: {
          status: true,
        },
      }),

      prisma.internalMark.findMany({
        where: {
          studentId: student.id,
        },
        select: {
          marksObtained: true,
        },
      }),

      prisma.subject.count({
        where: {
          departmentId:
            student.departmentId,
          semester:
            student.semester,
        },
      }),
    ]);

    const totalClasses =
      attendanceRecords.length;

    const presentClasses =
      attendanceRecords.filter(
        (record) =>
          record.status === true
      ).length;

    const attendancePercentage =
      totalClasses > 0
        ? Number(
            (
              (presentClasses /
                totalClasses) *
              100
            ).toFixed(2)
          )
        : 0;

    const totalMarksRecords =
      markRecords.length;

    const averageMarks =
      totalMarksRecords > 0
        ? Number(
            (
              markRecords.reduce(
                (sum, record) =>
                  sum +
                  record.marksObtained,
                0
              ) /
              totalMarksRecords
            ).toFixed(2)
          )
        : 0;

    return res.status(200).json({
      success: true,
      data: {
        studentName: student.name,
        regNumber:
          student.regNumber,
        semester:
          student.semester,

        totalClasses,
        presentClasses,
        attendancePercentage,

        totalMarksRecords,
        averageMarks,

        totalSubjects,
      },
    });
  } catch (error) {
    console.error(
      "[getStudentDashboard]",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load student dashboard.",
    });
  }
};

// ======================================================
// DASHBOARD ANALYTICS
// ======================================================
const getDashboardAnalytics = async (
  req,
  res
) => {
  try {
    const departments =
      await prisma.department.findMany({
        include: {
          students: true,
          faculty: true,
        },
      });

    const studentsByDepartment =
      departments.map((department) => ({
        name: department.code,
        count:
          department.students.length,
      }));

    const facultyByDepartment =
      departments.map((department) => ({
        name: department.code,
        count:
          department.faculty.length,
      }));

    const subjects =
      await prisma.subject.findMany();

    const semesterMap = {};

    subjects.forEach((subject) => {
      semesterMap[
        subject.semester
      ] =
        (semesterMap[
          subject.semester
        ] || 0) + 1;
    });

    const subjectsBySemester =
      Object.keys(semesterMap).map(
        (semester) => ({
          name: `Sem ${semester}`,
          count:
            semesterMap[
              semester
            ],
        })
      );

    return res.status(200).json({
      success: true,
      data: {
        studentsByDepartment,
        facultyByDepartment,
        subjectsBySemester,
      },
    });
  } catch (error) {
    console.error(
      "[getDashboardAnalytics]",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load dashboard analytics.",
    });
  }
};

module.exports = {
  getAdminDashboard,
  getFacultyDashboard,
  getStudentDashboard,
  getDashboardAnalytics,
};