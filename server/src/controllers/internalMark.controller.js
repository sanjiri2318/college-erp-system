// InternalMark controller
// Handles: createInternalMark, getAllInternalMarks, getInternalMarkById,
//          updateInternalMark, deleteInternalMark,
//          getStudentAverageMarks, getSubjectMarksReport

const prisma = require('../config/prisma');

// Reusable include block — keeps selects consistent across all functions
const markInclude = {
  student: {
    select: { id: true, regNumber: true, name: true },
  },
  subject: {
    select: { id: true, code: true, name: true },
  },
};

// ─────────────────────────────────────────────
// @route   POST /api/internal-marks
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const createInternalMark = async (req, res) => {
  try {
    const { internalNumber, marksObtained, studentId, subjectId } = req.body;

    // 1. Validate required fields
    if (
      internalNumber === undefined ||
      marksObtained  === undefined ||
      studentId      === undefined ||
      subjectId      === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: 'internalNumber, marksObtained, studentId, and subjectId are required.',
      });
    }

    // 2. Parse and type-check
    const parsedInternal  = parseInt(internalNumber);
    const parsedMarks     = parseFloat(marksObtained);
    const parsedStudentId = parseInt(studentId);
    const parsedSubjectId = parseInt(subjectId);

    if (
      isNaN(parsedInternal)  ||
      isNaN(parsedMarks)     ||
      isNaN(parsedStudentId) ||
      isNaN(parsedSubjectId)
    ) {
      return res.status(400).json({
        success: false,
        message: 'internalNumber, marksObtained, studentId, and subjectId must be valid numbers.',
      });
    }

    // 3. Validate internalNumber range
    if (parsedInternal < 1 || parsedInternal > 3) {
      return res.status(400).json({
        success: false,
        message: 'internalNumber must be 1, 2, or 3.',
      });
    }

    // 4. Validate marksObtained range
    if (parsedMarks < 0 || parsedMarks > 100) {
      return res.status(400).json({
        success: false,
        message: 'marksObtained must be between 0 and 100.',
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

    // 7. Check duplicate — same student + subject + internalNumber
    const duplicate = await prisma.internalMark.findUnique({
      where: {
        studentId_subjectId_internalNumber: {
          studentId:      parsedStudentId,
          subjectId:      parsedSubjectId,
          internalNumber: parsedInternal,
        },
      },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: `Internal ${parsedInternal} marks for this student and subject already exist.`,
      });
    }

    // 8. Create record
    const mark = await prisma.internalMark.create({
      data: {
        internalNumber: parsedInternal,
        marksObtained:  parsedMarks,
        studentId:      parsedStudentId,
        subjectId:      parsedSubjectId,
      },
      include: markInclude,
    });

    return res.status(201).json({
      success: true,
      message: 'Internal mark created successfully.',
      data: { mark },
    });
  } catch (error) {
    console.error('[createInternalMark]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create internal mark.',
    });
  }
};

// ─────────────────────────────────────────────
// @route   GET /api/internal-marks
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const getAllInternalMarks = async (req, res) => {
  try {
    const {
      search,
      page  = 1,
      limit = 10,
    } = req.query;

    const pageNum  = parseInt(page);
    const limitNum = parseInt(limit);
    const skip     = (pageNum - 1) * limitNum;

    // Dynamic where clause
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
    const [total, marks] = await Promise.all([
      prisma.internalMark.count({ where }),
      prisma.internalMark.findMany({
        where,
        skip,
        take:    limitNum,
        orderBy: { id: 'asc' },
        include: markInclude,
      }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return res.status(200).json({
      success: true,
      data: {
        marks,
        pagination: {
          total,
          page:  pageNum,
          limit: limitNum,
          totalPages,
        },
      },
    });
  } catch (error) {
    console.error('[getAllInternalMarks]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch internal marks.',
    });
  }
};

// ─────────────────────────────────────────────
// @route   GET /api/internal-marks/:id
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const getInternalMarkById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid internal mark ID.',
      });
    }

    const mark = await prisma.internalMark.findUnique({
      where: { id },
      include: markInclude,
    });

    if (!mark) {
      return res.status(404).json({
        success: false,
        message: 'Internal mark not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: { mark },
    });
  } catch (error) {
    console.error('[getInternalMarkById]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch internal mark.',
    });
  }
};

// ─────────────────────────────────────────────
// @route   PUT /api/internal-marks/:id
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const updateInternalMark = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid internal mark ID.',
      });
    }

    // 1. Check record exists
    const mark = await prisma.internalMark.findUnique({
      where: { id },
    });

    if (!mark) {
      return res.status(404).json({
        success: false,
        message: 'Internal mark not found.',
      });
    }

    // 2. Only marksObtained is updatable
    if (req.body.marksObtained === undefined) {
      return res.status(400).json({
        success: false,
        message: 'marksObtained is required for update.',
      });
    }

    const parsedMarks = parseFloat(req.body.marksObtained);

    if (isNaN(parsedMarks)) {
      return res.status(400).json({
        success: false,
        message: 'marksObtained must be a valid number.',
      });
    }

    if (parsedMarks < 0 || parsedMarks > 100) {
      return res.status(400).json({
        success: false,
        message: 'marksObtained must be between 0 and 100.',
      });
    }

    const updated = await prisma.internalMark.update({
      where: { id },
      data:  { marksObtained: parsedMarks },
      include: markInclude,
    });

    return res.status(200).json({
      success: true,
      message: 'Internal mark updated successfully.',
      data: { mark: updated },
    });
  } catch (error) {
    console.error('[updateInternalMark]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update internal mark.',
    });
  }
};

// ─────────────────────────────────────────────
// @route   DELETE /api/internal-marks/:id
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const deleteInternalMark = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid internal mark ID.',
      });
    }

    // 1. Check record exists
    const mark = await prisma.internalMark.findUnique({
      where: { id },
      include: markInclude,
    });

    if (!mark) {
      return res.status(404).json({
        success: false,
        message: 'Internal mark not found.',
      });
    }

    // 2. Delete record
    await prisma.internalMark.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: `Internal ${mark.internalNumber} mark for "${mark.student.name}" in "${mark.subject.name}" deleted successfully.`,
    });
  } catch (error) {
    console.error('[deleteInternalMark]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete internal mark.',
    });
  }
};

// ─────────────────────────────────────────────
// @route   GET /api/internal-marks/student/:studentId/average
// @access  ADMIN, FACULTY, STUDENT
// ─────────────────────────────────────────────
const getStudentAverageMarks = async (req, res) => {
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
      where:  { id: studentId },
      select: { id: true, name: true, regNumber: true },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found.',
      });
    }

    // 2. Fetch all marks for this student
    const records = await prisma.internalMark.findMany({
      where:  { studentId },
      select: {
        internalNumber: true,
        marksObtained:  true,
        subject: { select: { id: true, code: true, name: true } },
      },
      orderBy: [
        { subjectId:      'asc' },
        { internalNumber: 'asc' },
      ],
    });

    const totalInternals = records.length;

    // Overall average across all internals and subjects
    const averageMarks =
      totalInternals > 0
        ? parseFloat(
            (
              records.reduce((sum, r) => sum + r.marksObtained, 0) /
              totalInternals
            ).toFixed(2)
          )
        : 0;

    // 3. Build subject-wise breakdown — computed in memory, no extra DB calls
    const subjectMap = {};

    for (const record of records) {
      const key = record.subject.id;

      if (!subjectMap[key]) {
        subjectMap[key] = {
          subjectId:   record.subject.id,
          subjectCode: record.subject.code,
          subjectName: record.subject.name,
          internals:   [],
        };
      }

      subjectMap[key].internals.push({
        internalNumber: record.internalNumber,
        marksObtained:  record.marksObtained,
      });
    }

    const subjectBreakdown = Object.values(subjectMap).map((s) => {
      const total   = s.internals.reduce((sum, i) => sum + i.marksObtained, 0);
      const average = parseFloat((total / s.internals.length).toFixed(2));

      return {
        subjectId:      s.subjectId,
        subjectCode:    s.subjectCode,
        subjectName:    s.subjectName,
        totalInternals: s.internals.length,
        internals:      s.internals,
        averageMarks:   average,
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        studentId:       student.id,
        studentName:     student.name,
        regNumber:       student.regNumber,
        totalInternals,
        averageMarks,
        subjectBreakdown,
      },
    });
  } catch (error) {
    console.error('[getStudentAverageMarks]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate average marks.',
    });
  }
};

// ─────────────────────────────────────────────
// @route   GET /api/internal-marks/subject/:subjectId/report
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const getSubjectMarksReport = async (req, res) => {
  try {
    const subjectId = parseInt(req.params.subjectId);

    if (isNaN(subjectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subject ID.',
      });
    }

    // 1. Verify subject exists
    const subject = await prisma.subject.findUnique({
      where:  { id: subjectId },
      select: { id: true, code: true, name: true, semester: true },
    });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found.',
      });
    }

    // 2. Fetch all marks for this subject
    const records = await prisma.internalMark.findMany({
      where:  { subjectId },
      select: {
        id:             true,
        internalNumber: true,
        marksObtained:  true,
        student: { select: { id: true, regNumber: true, name: true } },
      },
      orderBy: [
        { studentId:      'asc' },
        { internalNumber: 'asc' },
      ],
    });

    // 3. Build per-student marks table — computed in memory
    const studentMap = {};

    for (const record of records) {
      const key = record.student.id;

      if (!studentMap[key]) {
        studentMap[key] = {
          studentId: record.student.id,
          regNumber: record.student.regNumber,
          name:      record.student.name,
          internal1: null,
          internal2: null,
          internal3: null,
          average:   null,
        };
      }

      if (record.internalNumber === 1) studentMap[key].internal1 = record.marksObtained;
      if (record.internalNumber === 2) studentMap[key].internal2 = record.marksObtained;
      if (record.internalNumber === 3) studentMap[key].internal3 = record.marksObtained;
    }

    // Compute per-student average from whichever internals exist
    const studentReports = Object.values(studentMap).map((s) => {
      const available = [s.internal1, s.internal2, s.internal3].filter(
        (v) => v !== null
      );
      s.average =
        available.length > 0
          ? parseFloat(
              (available.reduce((sum, v) => sum + v, 0) / available.length).toFixed(2)
            )
          : null;
      return s;
    });

    // 4. Class-level statistics
    const allMarks = records.map((r) => r.marksObtained);

    const classAverage =
      allMarks.length > 0
        ? parseFloat(
            (allMarks.reduce((sum, m) => sum + m, 0) / allMarks.length).toFixed(2)
          )
        : null;

    const highestMark = allMarks.length > 0 ? Math.max(...allMarks) : null;
    const lowestMark  = allMarks.length > 0 ? Math.min(...allMarks) : null;

    return res.status(200).json({
      success: true,
      data: {
        subject,
        totalStudents: studentReports.length,
        classAverage,
        highestMark,
        lowestMark,
        studentReports,
      },
    });
  } catch (error) {
    console.error('[getSubjectMarksReport]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate subject marks report.',
    });
  }
};

module.exports = {
  createInternalMark,
  getAllInternalMarks,
  getInternalMarkById,
  updateInternalMark,
  deleteInternalMark,
  getStudentAverageMarks,
  getSubjectMarksReport,
};