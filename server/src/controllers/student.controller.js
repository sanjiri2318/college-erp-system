// Student controller
// Handles: createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent

const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');

// ─────────────────────────────────────────────
// HELPER — Generate registration number
// Format : YYYY + DeptCode + 3-digit sequence
// Example: 2026CSBS001
// Sequence resets per department per year
// ─────────────────────────────────────────────
const generateRegNumber = async (departmentId) => {
  const year = new Date().getFullYear().toString();

  const department = await prisma.department.findUnique({
    where: { id: departmentId },
  });

  const prefix = `${year}${department.code}`;

  const latest = await prisma.student.findFirst({
    where: {
      regNumber: {
        startsWith: prefix,
      },
    },
    orderBy: {
      regNumber: 'desc',
    },
  });

  let sequence = 1;

  if (latest) {
    const lastSequence = parseInt(latest.regNumber.slice(-3));
    sequence = lastSequence + 1;
  }

  const padded = sequence.toString().padStart(3, '0');

  return `${prefix}${padded}`;
};

// ─────────────────────────────────────────────
// @route   POST /api/students
// @access  ADMIN only
// ─────────────────────────────────────────────
const createStudent = async (req, res) => {
  let { name, email, phone, semester, departmentId } = req.body;

  if (!name || !email || !semester || !departmentId) {
    return res.status(400).json({
      success: false,
      message: 'name, email, semester, and departmentId are required.',
    });
  }

  name = name.trim();
  email = email.toLowerCase().trim();
  phone = phone ? phone.trim() : null;
  semester = parseInt(semester);
  departmentId = parseInt(departmentId);

  if (isNaN(semester) || isNaN(departmentId)) {
    return res.status(400).json({
      success: false,
      message: 'departmentId and semester must be valid numbers.',
    });
  }

  if (semester < 1 || semester > 8) {
    return res.status(400).json({
      success: false,
      message: 'Semester must be between 1 and 8.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'A user with this email already exists.',
    });
  }

  const department = await prisma.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  if (!department) {
    return res.status(404).json({
      success: false,
      message: 'Department not found.',
    });
  }

  const regNumber = await generateRegNumber(departmentId);

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash('student123', salt);

  const student = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        passwordHash,
        role: 'STUDENT',
        isActive: true,
        mustChangePassword: true,
      },
    });

    const newStudent = await tx.student.create({
      data: {
        name,
        regNumber,
        phone,
        semester,
        userId: user.id,
        departmentId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
            mustChangePassword: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    return newStudent;
  });

  return res.status(201).json({
    success: true,
    message: 'Student account created successfully.',
    data: {
      student,
    },
  });
};

// ─────────────────────────────────────────────
// @route   GET /api/students
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const getAllStudents = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;

  const pageNum = Math.max(parseInt(page) || 1, 1);
  const limitNum = Math.max(parseInt(limit) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

  const where = {};

  if (search) {
    const term = search.trim();

    where.OR = [
      {
        name: {
          contains: term,
        },
      },
      {
        regNumber: {
          contains: term,
        },
      },
    ];
  }

  const [total, students] = await Promise.all([
    prisma.student.count({ where }),
    prisma.student.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: {
        id: 'asc',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
            mustChangePassword: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    }),
  ]);

  return res.status(200).json({
    success: true,
    data: {
      students,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    },
  });
};

// ─────────────────────────────────────────────
// @route   GET /api/students/:id
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const getStudentById = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student ID.',
    });
  }

  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          isActive: true,
          mustChangePassword: true,
          createdAt: true,
        },
      },
      department: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
  });

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found.',
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      student,
    },
  });
};

// ─────────────────────────────────────────────
// @route   PUT /api/students/:id
// @access  ADMIN only
// ─────────────────────────────────────────────
const updateStudent = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student ID.',
    });
  }

  const student = await prisma.student.findUnique({
    where: { id },
  });

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found.',
    });
  }

  if (
    req.body.regNumber !== undefined ||
    req.body.userId !== undefined
  ) {
    return res.status(400).json({
      success: false,
      message: 'regNumber and userId cannot be changed.',
    });
  }

  const updateData = {};

  if (req.body.name !== undefined) {
    const name = req.body.name.trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name cannot be empty.',
      });
    }

    updateData.name = name;
  }

  if (req.body.phone !== undefined) {
    updateData.phone = req.body.phone
      ? req.body.phone.trim()
      : null;
  }

  if (req.body.semester !== undefined) {
    const semester = parseInt(req.body.semester);

    if (isNaN(semester) || semester < 1 || semester > 8) {
      return res.status(400).json({
        success: false,
        message: 'Semester must be between 1 and 8.',
      });
    }

    updateData.semester = semester;
  }

  if (req.body.departmentId !== undefined) {
    const departmentId = parseInt(req.body.departmentId);

    if (isNaN(departmentId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid departmentId.',
      });
    }

    const department = await prisma.department.findUnique({
      where: {
        id: departmentId,
      },
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found.',
      });
    }

    updateData.departmentId = departmentId;
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      success: false,
      message:
        'Provide at least one field to update.',
    });
  }

  const updated = await prisma.student.update({
    where: { id },
    data: updateData,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          isActive: true,
        },
      },
      department: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
  });

  return res.status(200).json({
    success: true,
    message: 'Student updated successfully.',
    data: {
      student: updated,
    },
  });
};

// ─────────────────────────────────────────────
// @route   DELETE /api/students/:id
// @access  ADMIN only
// ─────────────────────────────────────────────
const deleteStudent = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student ID.',
    });
  }

  const student = await prisma.student.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      userId: true,
    },
  });

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found.',
    });
  }

  await prisma.$transaction(async (tx) => {
    await tx.student.delete({
      where: {
        id,
      },
    });

    await tx.user.delete({
      where: {
        id: student.userId,
      },
    });
  });

  return res.status(200).json({
    success: true,
    message: `Student "${student.name}" and linked user account deleted successfully.`,
  });
};


const getStudentDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const student = await prisma.student.findFirst({
      where: {
        userId,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const subjectCount = await prisma.subject.count({
      where: {
        semester: student.semester,
        departmentId: student.departmentId,
      },
    });

    const attendanceCount = await prisma.attendance.count({
      where: {
        studentId: student.id,
        status: true,
      },
    });

    const marksCount = await prisma.internalMark.count({
      where: {
        studentId: student.id,
      },
    });

    res.json({
      success: true,
      dashboard: {
        subjectCount,
        attendanceCount,
        marksCount,
        semester: student.semester,
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

const getStudentSubjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const student = await prisma.student.findUnique({
      where: {
        userId,
      },
      include: {
        department: {
          include: {
            subjects: true,
          },
        },
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      subjects: student.department.subjects,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getStudentAttendance = async (req, res) => {
  try {
    const userId = req.user.id;

    const student = await prisma.student.findUnique({
      where: {
        userId,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const subjects = await prisma.subject.findMany({
      where: {
        semester: student.semester,
        departmentId: student.departmentId,
      },
    });

    const attendanceData = [];

    for (const subject of subjects) {
      const total = await prisma.attendance.count({
        where: {
          studentId: student.id,
          subjectId: subject.id,
        },
      });

      const present = await prisma.attendance.count({
        where: {
          studentId: student.id,
          subjectId: subject.id,
          status: true,
        },
      });

      const percentage =
        total === 0
          ? 0
          : ((present / total) * 100).toFixed(2);

      attendanceData.push({
        subject: subject.name,
        present,
        total,
        percentage,
      });
    }

    res.json({
      success: true,
      attendance: attendanceData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const getStudentMarks = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const marks = await prisma.internalMark.findMany({
      where: {
        studentId: student.id,
      },
      include: {
        subject: true,
      },
    });

    res.json({
      success: true,
      marks,
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
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentDashboard,
  getStudentSubjects,
  getStudentAttendance,
  getStudentMarks,
};