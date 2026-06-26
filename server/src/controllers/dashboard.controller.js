// Dashboard controller
// Handles: getAdminDashboard, getFacultyDashboard, getStudentDashboard

const prisma = require('../config/prisma');

// ─────────────────────────────────────────────
// @route   GET /api/dashboard/admin
// @access  ADMIN only
// ─────────────────────────────────────────────
const getAdminDashboard = async (req, res) => {
  try {
    // Run all count queries in parallel — no sequential DB round trips
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
    console.error('[getAdminDashboard]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to load admin dashboard.',
    });
  }
};

// ─────────────────────────────────────────────
// @route   GET /api/dashboard/faculty
// @access  FACULTY only
// ─────────────────────────────────────────────
const getFacultyDashboard = async (req, res) => {
  try {
    // 1. Resolve faculty profile from the authenticated user
    const faculty = await prisma.faculty.findUnique({
      where:  { userId: req.user.id },
      select: { id: true, name: true },
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty profile not found for this user.',
      });
    }

    // 2. Get all subject IDs assigned to this faculty member
    const assignedSubjects = await prisma.subject.findMany({
      where:  { facultyId: faculty.id },
      select: { id: true },
    });

    const subjectIds         = assignedSubjects.map((s) => s.id);
    const totalSubjectsHandled = subjectIds.length;

    // 3. Midnight today — used to scope "today" attendance count
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // 4. Run remaining queries in parallel
    // If faculty has no subjects yet, counts will correctly return 0
    const [
      totalStudents,
      attendanceMarkedToday,
      internalMarksEntered,
    ] = await Promise.all([
      // Distinct students across all subjects this faculty teaches
      subjectIds.length > 0
        ? prisma.attendance.groupBy({
            by:     ['studentId'],
            where:  { subjectId: { in: subjectIds } },
          }).then((groups) => groups.length)
        : Promise.resolve(0),

      // Attendance records marked today across this faculty's subjects
      subjectIds.length > 0
        ? prisma.attendance.count({
            where: {
              subjectId: { in: subjectIds },
              date: {
                gte: todayStart,
                lte: todayEnd,
              },
            },
          })
        : Promise.resolve(0),

      // Total internal mark records entered for this faculty's subjects
      subjectIds.length > 0
        ? prisma.internalMark.count({
            where: { subjectId: { in: subjectIds } },
          })
        : Promise.resolve(0),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        facultyName:           faculty.name,
        totalSubjectsHandled,
        totalStudents,
        attendanceMarkedToday,
        internalMarksEntered,
      },
    });
  } catch (error) {
    console.error('[getFacultyDashboard]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to load faculty dashboard.',
    });
  }
};

// ─────────────────────────────────────────────
// @route   GET /api/dashboard/student
// @access  STUDENT only
// ─────────────────────────────────────────────
const getStudentDashboard = async (req, res) => {
  try {
    // 1. Resolve student profile from the authenticated user
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id },
      select: {
        id:           true,
        name:         true,
        regNumber:    true,
        semester:     true,
        departmentId: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found for this user.',
      });
    }

    // 2. Fetch attendance records and internal marks in parallel
    const [attendanceRecords, markRecords, totalSubjects] = await Promise.all([
      // All attendance records for this student
      prisma.attendance.findMany({
        where:  { studentId: student.id },
        select: { status: true },
      }),

      // All internal mark records for this student
      prisma.internalMark.findMany({
        where:  { studentId: student.id },
        select: { marksObtained: true },
      }),

      // Total subjects offered in this student's department and semester
      prisma.subject.count({
        where: {
          departmentId: student.departmentId,
          semester:     student.semester,
        },
      }),
    ]);

    // 3. Compute attendance percentage
    const totalClasses   = attendanceRecords.length;
    const presentClasses = attendanceRecords.filter((r) => r.status === true).length;
    const attendancePercentage =
      totalClasses > 0
        ? parseFloat(((presentClasses / totalClasses) * 100).toFixed(2))
        : 0;

    // 4. Compute average internal marks
    const totalMarksRecords = markRecords.length;
    const averageMarks =
      totalMarksRecords > 0
        ? parseFloat(
            (
              markRecords.reduce((sum, r) => sum + r.marksObtained, 0) /
              totalMarksRecords
            ).toFixed(2)
          )
        : 0;

    return res.status(200).json({
      success: true,
      data: {
        studentName:          student.name,
        regNumber:            student.regNumber,
        semester:             student.semester,
        totalClasses,
        presentClasses,
        attendancePercentage,
        totalMarksRecords,
        averageMarks,
        totalSubjects,
      },
    });
  } catch (error) {
    console.error('[getStudentDashboard]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to load student dashboard.',
    });
  }
};

const getDashboardAnalytics = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        students: true,
        faculty: true,
      },
    });

    const studentsByDepartment = departments.map((d) => ({
      name: d.code,
      count: d.students.length,
    }));

    const facultyByDepartment = departments.map((d) => ({
      name: d.code,
      count: d.faculty.length,
    }));

    const subjects = await prisma.subject.findMany();

    const semesterMap = {};

    subjects.forEach((s) => {
      semesterMap[s.semester] =
        (semesterMap[s.semester] || 0) + 1;
    });

    const subjectsBySemester = Object.keys(
      semesterMap
    ).map((sem) => ({
      name: `Sem ${sem}`,
      count: semesterMap[sem],
    }));

    res.status(200).json({
      success: true,
      data: {
        studentsByDepartment,
        facultyByDepartment,
        subjectsBySemester,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getAdminDashboard,
  getFacultyDashboard,
  getStudentDashboard,
  getDashboardAnalytics,
};