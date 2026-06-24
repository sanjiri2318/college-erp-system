// Subject controller
// Handles: createSubject, getAllSubjects, getSubjectById, updateSubject, deleteSubject

const prisma = require('../config/prisma');

// ─────────────────────────────────────────────
// @route   POST /api/subjects
// @access  ADMIN only
// ─────────────────────────────────────────────
const createSubject = async (req, res) => {
  let { code, name, semester, departmentId, facultyId } = req.body;

  if (!code || !name || !semester || !departmentId) {
    return res.status(400).json({
      success: false,
      message: 'code, name, semester, and departmentId are required.',
    });
  }

  code = code.trim().toUpperCase();
  name = name.trim();
  semester = parseInt(semester);
  departmentId = parseInt(departmentId);
  facultyId = facultyId ? parseInt(facultyId) : null;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Code cannot be empty.',
    });
  }

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Name cannot be empty.',
    });
  }

  if (isNaN(semester) || isNaN(departmentId)) {
    return res.status(400).json({
      success: false,
      message: 'semester and departmentId must be valid numbers.',
    });
  }

  if (facultyId !== null && isNaN(facultyId)) {
    return res.status(400).json({
      success: false,
      message: 'facultyId must be a valid number.',
    });
  }

  if (semester < 1 || semester > 8) {
    return res.status(400).json({
      success: false,
      message: 'Semester must be between 1 and 8.',
    });
  }

  const existingSubject = await prisma.subject.findUnique({
    where: { code },
  });

  if (existingSubject) {
    return res.status(409).json({
      success: false,
      message: `Subject with code "${code}" already exists.`,
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

  if (facultyId !== null) {
    const faculty = await prisma.faculty.findUnique({
      where: { id: facultyId },
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found.',
      });
    }
  }

  const subject = await prisma.subject.create({
    data: {
      code,
      name,
      semester,
      departmentId,
      facultyId,
    },
    include: {
      department: {
        select: { id: true, name: true, code: true },
      },
      faculty: {
        select: { id: true, name: true, empId: true },
      },
    },
  });

  return res.status(201).json({
    success: true,
    message: 'Subject created successfully.',
    data: { subject },
  });
};

// ─────────────────────────────────────────────
// @route   GET /api/subjects
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const getAllSubjects = async (req, res) => {
  const {
    search,
    page = 1,
    limit = 10,
  } = req.query;

  const pageNum = Math.max(parseInt(page) || 1, 1);
  const limitNum = Math.max(parseInt(limit) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

  const where = {};

  if (search) {
    const term = search.trim();

    where.OR = [
      { code: { contains: term } },
      { name: { contains: term } },
    ];
  }

  const [total, subjects] = await Promise.all([
    prisma.subject.count({ where }),
    prisma.subject.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: { id: 'asc' },
      include: {
        department: {
          select: { id: true, name: true, code: true },
        },
        faculty: {
          select: { id: true, name: true, empId: true },
        },
      },
    }),
  ]);

  return res.status(200).json({
    success: true,
    data: {
      subjects,
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
// @route   GET /api/subjects/:id
// @access  ADMIN, FACULTY
// ─────────────────────────────────────────────
const getSubjectById = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid subject ID.',
    });
  }

  const subject = await prisma.subject.findUnique({
    where: { id },
    include: {
      department: {
        select: { id: true, name: true, code: true },
      },
      faculty: {
        select: { id: true, name: true, empId: true },
      },
    },
  });

  if (!subject) {
    return res.status(404).json({
      success: false,
      message: 'Subject not found.',
    });
  }

  return res.status(200).json({
    success: true,
    data: { subject },
  });
};

// ─────────────────────────────────────────────
// @route   PUT /api/subjects/:id
// @access  ADMIN only
// ─────────────────────────────────────────────
const updateSubject = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid subject ID.',
    });
  }

  const subject = await prisma.subject.findUnique({
    where: { id },
  });

  if (!subject) {
    return res.status(404).json({
      success: false,
      message: 'Subject not found.',
    });
  }

  const updateData = {};

  if (req.body.code !== undefined) {
    if (typeof req.body.code !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Code must be a string.',
      });
    }

    const code = req.body.code.trim().toUpperCase();

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Code cannot be empty.',
      });
    }

    const duplicate = await prisma.subject.findFirst({
      where: {
        code,
        NOT: { id },
      },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: `Subject with code "${code}" already exists.`,
      });
    }

    updateData.code = code;
  }

  if (req.body.name !== undefined) {
    if (typeof req.body.name !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Name must be a string.',
      });
    }

    const name = req.body.name.trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name cannot be empty.',
      });
    }

    updateData.name = name;
  }

  if (req.body.semester !== undefined) {
    const semester = parseInt(req.body.semester);

    if (isNaN(semester) || semester < 1 || semester > 8) {
      return res.status(400).json({
        success: false,
        message: 'Semester must be a number between 1 and 8.',
      });
    }

    updateData.semester = semester;
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

  if (req.body.facultyId !== undefined) {
    if (req.body.facultyId === null) {
      updateData.facultyId = null;
    } else {
      const facultyId = parseInt(req.body.facultyId);

      if (isNaN(facultyId)) {
        return res.status(400).json({
          success: false,
          message: 'facultyId must be a valid number.',
        });
      }

      const faculty = await prisma.faculty.findUnique({
        where: { id: facultyId },
      });

      if (!faculty) {
        return res.status(404).json({
          success: false,
          message: 'Faculty not found.',
        });
      }

      updateData.facultyId = facultyId;
    }
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      success: false,
      message:
        'Provide at least one field to update: code, name, semester, departmentId, or facultyId.',
    });
  }

  const updated = await prisma.subject.update({
    where: { id },
    data: updateData,
    include: {
      department: {
        select: { id: true, name: true, code: true },
      },
      faculty: {
        select: { id: true, name: true, empId: true },
      },
    },
  });

  return res.status(200).json({
    success: true,
    message: 'Subject updated successfully.',
    data: {
      subject: updated,
    },
  });
};

// ─────────────────────────────────────────────
// @route   DELETE /api/subjects/:id
// @access  ADMIN only
// ─────────────────────────────────────────────
const deleteSubject = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid subject ID.',
    });
  }

  const subject = await prisma.subject.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          attendances: true,
          marks: true,
        },
      },
    },
  });

  if (!subject) {
    return res.status(404).json({
      success: false,
      message: 'Subject not found.',
    });
  }

  const { attendances, marks } = subject._count;

  if (attendances > 0 || marks > 0) {
    const reasons = [];

    if (attendances > 0) {
      reasons.push(`${attendances} attendance record(s)`);
    }

    if (marks > 0) {
      reasons.push(`${marks} internal mark record(s)`);
    }

    return res.status(409).json({
      success: false,
      message: `Cannot delete subject. It has ${reasons.join(
        ' and '
      )} linked to it.`,
    });
  }

  await prisma.subject.delete({
    where: { id },
  });

  return res.status(200).json({
    success: true,
    message: `Subject "${subject.name}" deleted successfully.`,
  });
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};