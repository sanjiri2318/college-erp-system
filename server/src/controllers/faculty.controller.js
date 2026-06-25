// Faculty controller
// Handles: createFaculty, getAllFaculty, getFacultyById, updateFaculty, deleteFaculty

const bcrypt = require('bcryptjs');
const prisma  = require('../config/prisma');

// ─────────────────────────────────────────────
// HELPER — Validate email format
// ─────────────────────────────────────────────
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ─────────────────────────────────────────────
// HELPER — Generate employee ID
// Format  : EMP001, EMP002, EMP003 ...
// Sequence: global (not per department)
// ─────────────────────────────────────────────
const generateEmpId = async () => {
  // Find the faculty with the highest empId
  const latest = await prisma.faculty.findFirst({
    orderBy: { empId: 'desc' },
    select:  { empId: true },
  });

  let sequence = 1;

  if (latest) {
    // Strip "EMP" prefix and parse the number
    const lastNumber = parseInt(latest.empId.replace('EMP', ''));
    if (!isNaN(lastNumber)) {
      sequence = lastNumber + 1;
    }
  }

  // Pad to 3 digits: 1 → "001", 12 → "012"
  return `EMP${sequence.toString().padStart(3, '0')}`;
};

// ─────────────────────────────────────────────
// @route   POST /api/faculty
// @access  ADMIN only
// ─────────────────────────────────────────────
const createFaculty = async (req, res) => {
  let { name, email, departmentId } = req.body;

  // 1. Validate required fields
  if (!name || !email || !departmentId) {
    return res.status(400).json({
      success: false,
      message: 'name, email, and departmentId are required.',
    });
  }

  // 2. Sanitize
  name         = name.trim();
  email        = email.toLowerCase().trim();
  departmentId = parseInt(departmentId);

  if (isNaN(departmentId)) {
    return res.status(400).json({
      success: false,
      message: 'departmentId must be a valid number.',
    });
  }

  // 3. Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format.',
    });
  }

  // 4. Check email uniqueness
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'A user with this email already exists.',
    });
  }

  // 5. Check department exists
  const department = await prisma.department.findUnique({
    where: { id: departmentId },
  });

  if (!department) {
    return res.status(404).json({
      success: false,
      message: 'Department not found.',
    });
  }

  // 6. Generate employee ID
  const empId = await generateEmpId();

  // 7. Hash default password
  const salt         = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash('faculty123', salt);

  // 8. Create User + Faculty atomically
  const faculty = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        passwordHash,
        role:               'FACULTY',
        isActive:           true,
        mustChangePassword: true,
      },
    });

    const newFaculty = await tx.faculty.create({
      data: {
        name,
        empId,
        userId:       user.id,
        departmentId,
      },
      include: {
        user: {
          select: {
            id:                 true,
            email:              true,
            role:               true,
            isActive:           true,
            mustChangePassword: true,
          },
        },
        department: {
          select: { id: true, name: true, code: true },
        },
      },
    });

    return newFaculty;
  });

  return res.status(201).json({
    success: true,
    message: 'Faculty account created successfully.',
    data: { faculty },
  });
};

// ─────────────────────────────────────────────
// @route   GET /api/faculty
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const getAllFaculty = async (req, res) => {
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
      { name:  { contains: term } },
      { empId: { contains: term } },
    ];
  }

  // Parallel count + fetch
  const [total, faculty] = await Promise.all([
    prisma.faculty.count({ where }),
    prisma.faculty.findMany({
      where,
      skip,
      take:    limitNum,
      orderBy: { id: 'asc' },
      include: {
        user: {
          select: {
            id:                 true,
            email:              true,
            role:               true,
            isActive:           true,
            mustChangePassword: true,
          },
        },
        department: {
          select: { id: true, name: true, code: true },
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return res.status(200).json({
    success: true,
    data: {
      faculty,
      pagination: {
        total,
        page:  pageNum,
        limit: limitNum,
        totalPages,
      },
    },
  });
};

// ─────────────────────────────────────────────
// @route   GET /api/faculty/:id
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const getFacultyById = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid faculty ID.',
    });
  }

  const faculty = await prisma.faculty.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id:                 true,
          email:              true,
          role:               true,
          isActive:           true,
          mustChangePassword: true,
          createdAt:          true,
        },
      },
      department: {
        select: { id: true, name: true, code: true },
      },
    },
  });

  if (!faculty) {
    return res.status(404).json({
      success: false,
      message: 'Faculty not found.',
    });
  }

  return res.status(200).json({
    success: true,
    data: { faculty },
  });
};

// ─────────────────────────────────────────────
// @route   PUT /api/faculty/:id
// @access  ADMIN only
// ─────────────────────────────────────────────
const updateFaculty = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid faculty ID.',
    });
  }

  // 1. Check faculty exists
  const faculty = await prisma.faculty.findUnique({
    where: { id },
  });

  if (!faculty) {
    return res.status(404).json({
      success: false,
      message: 'Faculty not found.',
    });
  }

  // 2. Block protected fields explicitly
  if (req.body.empId !== undefined || req.body.userId !== undefined) {
    return res.status(400).json({
      success: false,
      message: 'empId and userId cannot be changed.',
    });
  }

  // 3. Build update payload from allowed fields only
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

  if (req.body.departmentId !== undefined) {
    const departmentId = parseInt(req.body.departmentId);

    if (isNaN(departmentId)) {
      return res.status(400).json({
        success: false,
        message: 'departmentId must be a valid number.',
      });
    }

    const department = await prisma.department.findUnique({
      where: { id: departmentId },
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
      message: 'Provide at least one field to update: name or departmentId.',
    });
  }

  const updated = await prisma.faculty.update({
    where: { id },
    data:  updateData,
    include: {
      user: {
        select: {
          id: true, email: true, role: true, isActive: true,
        },
      },
      department: {
        select: { id: true, name: true, code: true },
      },
    },
  });

  return res.status(200).json({
    success: true,
    message: 'Faculty updated successfully.',
    data: { faculty: updated },
  });
};

// ─────────────────────────────────────────────
// @route   DELETE /api/faculty/:id
// @access  ADMIN only
// ─────────────────────────────────────────────
const deleteFaculty = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid faculty ID.',
    });
  }

  // 1. Check faculty exists — include subject count and userId
  const faculty = await prisma.faculty.findUnique({
    where: { id },
    include: {
      _count: {
        select: { subjects: true },
      },
    },
  });

  if (!faculty) {
    return res.status(404).json({
      success: false,
      message: 'Faculty not found.',
    });
  }

  // 2. Block deletion if faculty has assigned subjects
  if (faculty._count.subjects > 0) {
    return res.status(409).json({
      success: false,
      message: `Cannot delete faculty. They are assigned to ${faculty._count.subjects} subject(s). Reassign or remove subjects first.`,
    });
  }

  // 3. Delete Faculty then User atomically
  await prisma.$transaction(async (tx) => {
    await tx.faculty.delete({ where: { id } });
    await tx.user.delete({ where: { id: faculty.userId } });
  });

  return res.status(200).json({
    success: true,
    message: `Faculty "${faculty.name}" and linked user account deleted successfully.`,
  });
};

const getFacultyDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const faculty = await prisma.faculty.findFirst({
      where: {
        userId,
      },
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    const subjectCount = await prisma.subject.count({
      where: {
        facultyId: faculty.id,
      },
    });

    const studentCount = await prisma.student.count({
      where: {
        departmentId: faculty.departmentId,
      },
    });

    const attendanceToday = await prisma.attendance.count({
      where: {
        subject: {
          facultyId: faculty.id,
        },
      },
    });

    const internalMarksCount = await prisma.internalMark.count({
      where: {
        subject: {
          facultyId: faculty.id,
        },
      },
    });

    res.json({
      success: true,
      dashboard: {
        subjectCount,
        studentCount,
        attendanceToday,
        internalMarksCount,
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

const getMySubjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const faculty = await prisma.faculty.findFirst({
      where: {
        userId,
      },
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    const subjects = await prisma.subject.findMany({
      where: {
        facultyId: faculty.id,
      },
      include: {
        department: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: {
        semester: "asc",
      },
    });

    res.status(200).json({
      success: true,
      subjects,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getStudentsBySubject = async (req, res) => {
  try {
    const subjectId = parseInt(req.params.subjectId);

    const students = await prisma.student.findMany({
      where: {
        department: {
          subjects: {
            some: {
              id: subjectId,
            },
          },
        },
      },
      select: {
        id: true,
        regNumber: true,
        name: true,
      },
    });

    res.json({
      success: true,
      students,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getFacultySubjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const faculty = await prisma.faculty.findFirst({
      where: {
        userId,
      },
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    const subjects = await prisma.subject.findMany({
      where: {
        facultyId: faculty.id,
      },
      include: {
        department: true,
      },
    });

    res.json({
      success: true,
      subjects,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const saveAttendance = async (req, res) => {
  try {
    const { subjectId, attendance } = req.body;

    for (const studentId in attendance) {
      await prisma.attendance.create({
        data: {
          studentId: Number(studentId),
          subjectId: Number(subjectId),
          status: attendance[studentId],
          date: new Date(),
        },
      });
    }

    res.json({
      success: true,
      message: "Attendance saved successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getStudentsForMarks = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subject = await prisma.subject.findUnique({
      where: {
        id: Number(subjectId),
      },
      include: {
        department: {
          include: {
            students: true,
          },
        },
      },
    });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.json({
      success: true,
      students: subject.department.students,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const saveInternalMarks = async (req, res) => {
  try {
    const { subjectId, internalNumber, marks } = req.body;

    for (const studentId in marks) {
      await prisma.internalMark.upsert({
        where: {
          studentId_subjectId_internalNumber: {
            studentId: Number(studentId),
            subjectId: Number(subjectId),
            internalNumber: Number(internalNumber),
          },
        },
        update: {
          marksObtained: Number(marks[studentId]),
        },
        create: {
          studentId: Number(studentId),
          subjectId: Number(subjectId),
          internalNumber: Number(internalNumber),
          marksObtained: Number(marks[studentId]),
        },
      });
    }

    res.json({
      success: true,
      message: "Marks saved successfully",
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
  createFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  getFacultyDashboard,
  getFacultySubjects,
  getStudentsBySubject,
  saveAttendance,
  getStudentsForMarks,
  saveInternalMarks,
};