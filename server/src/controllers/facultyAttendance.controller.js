const prisma = require("../config/prisma");

/* ============================================================
   GET STUDENTS BY SUBJECT
   GET /api/faculty/subjects/:subjectId/students
============================================================ */

const getStudentsBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subject = await prisma.subject.findUnique({
      where: {
        id: Number(subjectId),
      },
      include: {
        department: true,
      },
    });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    const students = await prisma.student.findMany({
      where: {
        departmentId: subject.departmentId,
        semester: subject.semester,
      },
      orderBy: {
        regNumber: "asc",
      },
      select: {
        id: true,
        regNumber: true,
        name: true,
        semester: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: {
        subject,
        students,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to load students.",
    });
  }
};

/* ============================================================
   SAVE ATTENDANCE
   POST /api/attendance
============================================================ */

const saveAttendance = async (req, res) => {
  try {
    const {
      studentId,
      subjectId,
      date,
      status,
    } = req.body;

    const student =
      await prisma.student.findUnique({
        where: {
          id: Number(studentId),
        },
      });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    const subject =
      await prisma.subject.findUnique({
        where: {
          id: Number(subjectId),
        },
      });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    const attendance =
      await prisma.attendance.upsert({
        where: {
          studentId_subjectId_date: {
            studentId: Number(studentId),
            subjectId: Number(subjectId),
            date: new Date(date),
          },
        },

        update: {
          status,
        },

        create: {
          studentId: Number(studentId),
          subjectId: Number(subjectId),
          date: new Date(date),
          status,
        },
      });

    return res.status(200).json({
      success: true,
      message: "Attendance saved successfully.",
      data: attendance,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to save attendance.",
    });
  }
};
/* ============================================================
   GET ATTENDANCE HISTORY
   GET /api/attendance/history/:subjectId
============================================================ */

const getAttendanceHistory = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const attendance = await prisma.attendance.findMany({
      where: {
        subjectId: Number(subjectId),
      },
      include: {
        student: {
          select: {
            regNumber: true,
            name: true,
          },
        },
      },
      orderBy: [
        {
          date: "desc",
        },
        {
          student: {
            regNumber: "asc",
          },
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch attendance history.",
    });
  }
};

/* ============================================================
   UPDATE ATTENDANCE
   PUT /api/attendance/:id
============================================================ */

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const attendance =
      await prisma.attendance.findUnique({
        where: {
          id: Number(id),
        },
      });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found.",
      });
    }

    const updated =
      await prisma.attendance.update({
        where: {
          id: Number(id),
        },
        data: {
          status,
        },
      });

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update attendance.",
    });
  }
};

/* ============================================================
   DELETE ATTENDANCE
   DELETE /api/attendance/:id
============================================================ */

const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance =
      await prisma.attendance.findUnique({
        where: {
          id: Number(id),
        },
      });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found.",
      });
    }

    await prisma.attendance.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Attendance deleted successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete attendance.",
    });
  }
};

/* ============================================================
   EXPORTS
============================================================ */

module.exports = {
  getStudentsBySubject,
  saveAttendance,
  getAttendanceHistory,
  updateAttendance,
  deleteAttendance,
};