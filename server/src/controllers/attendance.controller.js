// Attendance controller
// Handles: createAttendance, getAllAttendance, getAttendanceById,
//          updateAttendance, deleteAttendance, getStudentAttendancePercentage

const prisma = require('../config/prisma');

// ─────────────────────────────────────────────
// HELPER — Normalize date to midnight UTC
// Strips time component so "2026-06-23T14:30:00"
// and "2026-06-23" both store as 2026-06-23T00:00:00.000Z
// This is critical for the @@unique([studentId, subjectId, date]) constraint
// ─────────────────────────────────────────────
const normalizeDate = (dateInput) => {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return null;
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

// Reusable include block — keeps all selects consistent across functions
const attendanceInclude = {
  student: {
    select: { id: true, regNumber: true, name: true },
  },
  subject: {
    select: { id: true, code: true, name: true },
  },
};

// ─────────────────────────────────────────────
// @route   POST /api/attendance
// @access  FACULTY, ADMIN
// ─────────────────────────────────────────────
const createAttendance = async (req, res) => {
  try {
    const { date, status, studentId, subjectId } = req.body;

    // 1. Validate required fields
    if (!date || studentId === undefined || subjectId === undefined) {
      return res.status(400).json({
        success: false,
        message: 'date, studentId, and subjectId are required.',
      });
    }

    // 2. Parse and validate IDs
    const parsedStudentId = parseInt(studentId);
    const parsedSubjectId = parseInt(subjectId);

    if (isNaN(parsedStudentId) || isNaN(parsedSubjectId)) {
      return res.status(400).json({
        success: false,
        message: 'studentId and subjectId must be valid numbers.',
      });
    }

    // 3. Normalize date — strip time component
    const normalizedDate = normalizeDate(date);

    if (!normalizedDate) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD.',
      });
    }

    // 4. Reject future dates
    const today = normalizeDate(new Date());
    if (normalizedDate > today) {
      return res.status(400).json({
        success: false,
        message: 'Attendance cannot be marked for a future date.',
      });
    }

    // 5. Check student exists
    const student = await prisma.student.findUnique({
      where: { id: parsedStudentId },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found.',
      });
    }

    // 6. Check subject exists
    const subject = await prisma.subject.findUnique({
      where: { id: parsedSubjectId },
    });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found.',
      });
    }

    // 7. Check duplicate — same student + subject + date
    const duplicate = await prisma.attendance.findUnique({
      where: {
        studentId_subjectId_date: {
          studentId: parsedStudentId,
          subjectId: parsedSubjectId,
          date:      normalizedDate,
        },
      },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: 'Attendance for this student and subject on this date already exists.',
      });
    }

    // 8. Create attendance record
    // status defaults to true (present) if not provided
    const attendance = await prisma.attendance.create({
      data: {
        date:      normalizedDate,
        status:    status !== undefined ? Boolean(status) : true,
        studentId: parsedStudentId,
        subjectId: parsedSubjectId,
      },
      include: attendanceInclude,
    });

    return res.status(201).json({
      success: true,
      message: 'Attendance marked successfully.',
      data: { attendance },
    });
  } catch (error) {
    console.error('[createAttendance]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create attendance record.',
    });
  }
};

// ─────────────────────────────────────────────
// @route   GET /api/attendance
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const getAllAttendance = async (req, res) => {
  try {
    const {
      search,
      page  = 1,
      limit = 10,
    } = req.query;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.max(parseInt(limit) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    // Dynamic where clause — search across student name, regNumber, subject code, subject name
    const where = {};

    if (search) {
      const term = search.trim();
      where.OR = [
        { student: { name:      { contains: term } } },
        { student: { regNumber: { contains: term } } },
        { subject: { code:      { contains: term } } },
        { subject: { name:      { contains: term } } },
      ];
    }

    // Parallel count + fetch
    const [total, attendances] = await Promise.all([
      prisma.attendance.count({ where }),
      prisma.attendance.findMany({
        where,
        skip,
        take:    limitNum,
        orderBy: { date: 'desc' },
        include: attendanceInclude,
      }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return res.status(200).json({
      success: true,
      data: {
        attendances,
        pagination: {
          total,
          page:  pageNum,
          limit: limitNum,
          totalPages,
        },
      },
    });
  } catch (error) {
    console.error('[getAllAttendance]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch attendance records.',
    });
  }
};

// ─────────────────────────────────────────────
// @route   GET /api/attendance/:id
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const getAttendanceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid attendance ID.',
      });
    }

    const attendance = await prisma.attendance.findUnique({
      where: { id },
      include: attendanceInclude,
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: { attendance },
    });
  } catch (error) {
    console.error('[getAttendanceById]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch attendance record.',
    });
  }
};

// ─────────────────────────────────────────────
// @route   PUT /api/attendance/:id
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const updateAttendance = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid attendance ID.',
      });
    }

    // 1. Check record exists
    const attendance = await prisma.attendance.findUnique({
      where: { id },
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found.',
      });
    }

    // 2. Build update payload — only date and status are allowed
    const updateData = {};

    if (req.body.date !== undefined) {
      const normalizedDate = normalizeDate(req.body.date);

      if (!normalizedDate) {
        return res.status(400).json({
          success: false,
          message: 'Invalid date format. Use YYYY-MM-DD.',
        });
      }

      // Reject future dates
      const today = normalizeDate(new Date());
      if (normalizedDate > today) {
        return res.status(400).json({
          success: false,
          message: 'Attendance cannot be marked for a future date.',
        });
      }

      // Check duplicate with new date — exclude current record
      const duplicate = await prisma.attendance.findFirst({
        where: {
          studentId: attendance.studentId,
          subjectId: attendance.subjectId,
          date:      normalizedDate,
          NOT:       { id },
        },
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: 'An attendance record for this student and subject on that date already exists.',
        });
      }

      updateData.date = normalizedDate;
    }

    if (req.body.status !== undefined) {
      updateData.status = Boolean(req.body.status);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Provide at least one field to update: date or status.',
      });
    }

    const updated = await prisma.attendance.update({
      where: { id },
      data:  updateData,
      include: attendanceInclude,
    });

    return res.status(200).json({
      success: true,
      message: 'Attendance updated successfully.',
      data: { attendance: updated },
    });
  } catch (error) {
    console.error('[updateAttendance]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update attendance record.',
    });
  }
};

// ─────────────────────────────────────────────
// @route   DELETE /api/attendance/:id
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const deleteAttendance = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid attendance ID.',
      });
    }

    const attendance = await prisma.attendance.findUnique({
      where: { id },
      include: attendanceInclude,
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found.',
      });
    }

    await prisma.attendance.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: `Attendance record for "${attendance.student.name}" on ${attendance.date.toISOString().split('T')[0]} deleted successfully.`,
    });
  } catch (error) {
    console.error('[deleteAttendance]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete attendance record.',
    });
  }
};

// ─────────────────────────────────────────────
// @route   GET /api/attendance/student/:studentId/percentage
// @access  ADMIN, FACULTY, STUDENT
// ─────────────────────────────────────────────
const getStudentAttendancePercentage = async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);

    if (isNaN(studentId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID.',
      });
    }

    // 1. Verify student exists
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: { id: true, name: true, regNumber: true },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found.',
      });
    }

    // 2. Fetch all attendance records for this student
    const records = await prisma.attendance.findMany({
      where: { studentId },
      select: {
        status:  true,
        subject: { select: { id: true, code: true, name: true } },
      },
    });

    const totalClasses   = records.length;
    const presentClasses = records.filter((r) => r.status === true).length;
    const absentClasses  = totalClasses - presentClasses;

    // Avoid division by zero
    const attendancePercentage =
      totalClasses > 0
        ? parseFloat(((presentClasses / totalClasses) * 100).toFixed(2))
        : 0;

    // 3. Break down attendance percentage per subject
    const subjectMap = {};

    for (const record of records) {
      const key = record.subject.id;

      if (!subjectMap[key]) {
        subjectMap[key] = {
          subjectId:   record.subject.id,
          subjectCode: record.subject.code,
          subjectName: record.subject.name,
          total:       0,
          present:     0,
        };
      }

      subjectMap[key].total += 1;
      if (record.status) subjectMap[key].present += 1;
    }

    const subjectBreakdown = Object.values(subjectMap).map((s) => ({
      subjectId:            s.subjectId,
      subjectCode:          s.subjectCode,
      subjectName:          s.subjectName,
      totalClasses:         s.total,
      presentClasses:       s.present,
      attendancePercentage: s.total > 0
        ? parseFloat(((s.present / s.total) * 100).toFixed(2))
        : 0,
    }));

    return res.status(200).json({
      success: true,
      data: {
        studentId,
        studentName:          student.name,
        regNumber:            student.regNumber,
        totalClasses,
        presentClasses,
        absentClasses,
        attendancePercentage,
        subjectBreakdown,
      },
    });
  } catch (error) {
    console.error('[getStudentAttendancePercentage]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate attendance percentage.',
    });
  }
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  getStudentAttendancePercentage,
};