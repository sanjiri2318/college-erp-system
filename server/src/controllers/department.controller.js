// Department controller
// Handles: createDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment

const prisma = require('../config/prisma');

// ─────────────────────────────────────────────
// @route   POST /api/departments
// @access  ADMIN only
// ─────────────────────────────────────────────
const createDepartment = async (req, res) => {
  let { name, code } = req.body;

  if (!name || !code) {
    return res.status(400).json({
      success: false,
      message: 'Name and code are required.',
    });
  }

  name = name.trim();
  code = code.trim().toUpperCase();

  if (!name || !code) {
    return res.status(400).json({
      success: false,
      message: 'Name and code cannot be empty.',
    });
  }

  const existing = await prisma.department.findUnique({
    where: { code },
  });

  if (existing) {
    return res.status(409).json({
      success: false,
      message: `Department with code "${code}" already exists.`,
    });
  }

  const department = await prisma.department.create({
    data: {
      name,
      code,
    },
  });

  return res.status(201).json({
    success: true,
    message: 'Department created successfully.',
    data: { department },
  });
};

// ─────────────────────────────────────────────
// @route   GET /api/departments
// @access  Any authenticated user
// ─────────────────────────────────────────────
const getAllDepartments = async (req, res) => {
  const departments = await prisma.department.findMany({
    orderBy: {
      id: 'asc',
    },
  });

  return res.status(200).json({
    success: true,
    data: { departments },
  });
};

// ─────────────────────────────────────────────
// @route   GET /api/departments/:id
// @access  Any authenticated user
// ─────────────────────────────────────────────
const getDepartmentById = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid department ID.',
    });
  }

  const department = await prisma.department.findUnique({
    where: { id },
  });

  if (!department) {
    return res.status(404).json({
      success: false,
      message: 'Department not found.',
    });
  }

  return res.status(200).json({
    success: true,
    data: { department },
  });
};

// ─────────────────────────────────────────────
// @route   PUT /api/departments/:id
// @access  ADMIN only
// ─────────────────────────────────────────────
const updateDepartment = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid department ID.',
    });
  }

  const department = await prisma.department.findUnique({
    where: { id },
  });

  if (!department) {
    return res.status(404).json({
      success: false,
      message: 'Department not found.',
    });
  }

  const updateData = {};

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

    const duplicate = await prisma.department.findFirst({
      where: {
        code,
        NOT: {
          id,
        },
      },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: `Department with code "${code}" already exists.`,
      });
    }

    updateData.code = code;
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Provide at least one field to update.',
    });
  }

  const updated = await prisma.department.update({
    where: { id },
    data: updateData,
  });

  return res.status(200).json({
    success: true,
    message: 'Department updated successfully.',
    data: {
      department: updated,
    },
  });
};

// ─────────────────────────────────────────────
// @route   DELETE /api/departments/:id
// @access  ADMIN only
// ─────────────────────────────────────────────
const deleteDepartment = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid department ID.',
    });
  }

  const department = await prisma.department.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          students: true,
          faculty: true,
          subjects: true,
        },
      },
    },
  });

  if (!department) {
    return res.status(404).json({
      success: false,
      message: 'Department not found.',
    });
  }

  const { students, faculty, subjects } = department._count;

  if (students > 0 || faculty > 0 || subjects > 0) {
    const reasons = [];

    if (students > 0) reasons.push(`${students} student(s)`);
    if (faculty > 0) reasons.push(`${faculty} faculty member(s)`);
    if (subjects > 0) reasons.push(`${subjects} subject(s)`);

    return res.status(409).json({
      success: false,
      message: `Cannot delete department. It has ${reasons.join(
        ', '
      )} linked to it.`,
    });
  }

  await prisma.department.delete({
    where: { id },
  });

  return res.status(200).json({
    success: true,
    message: 'Department deleted successfully.',
  });
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};