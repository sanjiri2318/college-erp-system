const prisma = require("../config/prisma");

const DAY_VALUES = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const parsePositiveInt = (value) => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

const normalizeRoomNumber = (roomNumber) => {
  if (roomNumber === undefined || roomNumber === null) {
    return null;
  }

  const normalized = String(roomNumber).trim();
  return normalized ? normalized : null;
};

const validateRequiredFields = (payload) => {
  const missing = [];

  if (!payload.day) missing.push("day");
  if (payload.period === undefined || payload.period === null || payload.period === "") {
    missing.push("period");
  }
  if (payload.semester === undefined || payload.semester === null || payload.semester === "") {
    missing.push("semester");
  }
  if (payload.departmentId === undefined || payload.departmentId === null || payload.departmentId === "") {
    missing.push("departmentId");
  }
  if (payload.subjectId === undefined || payload.subjectId === null || payload.subjectId === "") {
    missing.push("subjectId");
  }
  if (payload.facultyId === undefined || payload.facultyId === null || payload.facultyId === "") {
    missing.push("facultyId");
  }

  return missing;
};

const validateAndBuildTimetableData = async (payload, excludeId = null) => {
  const day = String(payload.day || "").toUpperCase().trim();
  const period = parsePositiveInt(payload.period);
  const semester = parsePositiveInt(payload.semester);
  const departmentId = parsePositiveInt(payload.departmentId);
  const subjectId = parsePositiveInt(payload.subjectId);
  const facultyId = parsePositiveInt(payload.facultyId);
  const roomNumber = normalizeRoomNumber(payload.roomNumber);

  if (!DAY_VALUES.includes(day)) {
    return { status: 400, message: "Invalid day value." };
  }

  if (!period) {
    return { status: 400, message: "period must be a positive integer." };
  }

  if (!semester || semester < 1 || semester > 8) {
    return { status: 400, message: "semester must be an integer between 1 and 8." };
  }

  if (!departmentId) {
    return { status: 400, message: "departmentId must be a positive integer." };
  }

  if (!subjectId) {
    return { status: 400, message: "subjectId must be a positive integer." };
  }

  if (!facultyId) {
    return { status: 400, message: "facultyId must be a positive integer." };
  }

  const [department, subject, faculty] = await Promise.all([
    prisma.department.findUnique({ where: { id: departmentId } }),
    prisma.subject.findUnique({ where: { id: subjectId } }),
    prisma.faculty.findUnique({ where: { id: facultyId } }),
  ]);

  if (!department) {
    return { status: 404, message: "Department not found." };
  }

  if (!subject) {
    return { status: 404, message: "Subject not found." };
  }

  if (!faculty) {
    return { status: 404, message: "Faculty not found." };
  }

  if (subject.departmentId !== departmentId) {
    return {
      status: 400,
      message: "Selected subject does not belong to the selected department.",
    };
  }

  if (subject.semester !== semester) {
    return {
      status: 400,
      message: "Selected subject does not belong to the selected semester.",
    };
  }

  if (faculty.departmentId !== departmentId) {
    return {
      status: 400,
      message: "Selected faculty does not belong to the selected department.",
    };
  }

  const notClause = excludeId ? { NOT: { id: Number(excludeId) } } : {};

  const [duplicateSlot, facultyConflict, roomConflict, subjectDuplicate] = await Promise.all([
    prisma.timetable.findFirst({
      where: {
        ...notClause,
        day,
        period,
        departmentId,
        semester,
      },
    }),

    prisma.timetable.findFirst({
      where: {
        ...notClause,
        day,
        period,
        facultyId,
      },
    }),

    roomNumber
      ? prisma.timetable.findFirst({
          where: {
            ...notClause,
            day,
            period,
            roomNumber,
          },
        })
      : Promise.resolve(null),

    prisma.timetable.findFirst({
      where: {
        ...notClause,
        day,
        period,
        subjectId,
        departmentId,
        semester,
      },
    }),
  ]);

  if (duplicateSlot) {
    return {
      status: 409,
      message: "Duplicate timetable entry for this department, semester, day and period.",
    };
  }

  if (facultyConflict) {
    return {
      status: 409,
      message: "Faculty has a timetable conflict for the selected day and period.",
    };
  }

  if (roomConflict) {
    return {
      status: 409,
      message: "Classroom is already occupied for the selected day and period.",
    };
  }

  if (subjectDuplicate) {
    return {
      status: 409,
      message: "Subject is already scheduled for the selected day and period.",
    };
  }

  return {
    data: {
      day,
      period,
      roomNumber,
      semester,
      departmentId,
      subjectId,
      facultyId,
    },
  };
};

// CREATE TIMETABLE
const createTimetable = async (req, res) => {
  try {
    const missing = validateRequiredFields(req.body);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(", ")}.`,
      });
    }

    const validation = await validateAndBuildTimetableData(req.body);

    if (validation.message) {
      return res.status(validation.status).json({
        success: false,
        message: validation.message,
      });
    }

    const timetable =
      await prisma.timetable.create({
        data: validation.data,
        include: {
          department: true,
          subject: true,
          faculty: true,
        },
      });

    res.status(201).json({
      success: true,
      data: timetable,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message:
        "Failed to create timetable",
    });
  }
};

// GET ALL TIMETABLES
const getTimetables = async (
  req,
  res
) => {
  try {
    const {
      departmentId,
      semester,
      facultyId,
      subjectId,
      search,
    } = req.query;

    const where = {};

    if (departmentId) {
      where.departmentId = Number(departmentId);
    }

    if (semester) {
      where.semester = Number(semester);
    }

    if (facultyId) {
      where.facultyId = Number(facultyId);
    }

    if (subjectId) {
      where.subjectId = Number(subjectId);
    }

    if (search && search.trim()) {
      const term = search.trim();

      where.OR = [
        {
          roomNumber: {
            contains: term,
          },
        },
        {
          day: {
            equals: term.toUpperCase(),
          },
        },
        {
          subject: {
            OR: [
              {
                name: {
                  contains: term,
                },
              },
              {
                code: {
                  contains: term,
                },
              },
            ],
          },
        },
        {
          faculty: {
            name: {
              contains: term,
            },
          },
        },
        {
          department: {
            OR: [
              {
                name: {
                  contains: term,
                },
              },
              {
                code: {
                  contains: term,
                },
              },
            ],
          },
        },
      ];
    }

    const timetables =
      await prisma.timetable.findMany({
        where,
        include: {
          department: true,
          subject: true,
          faculty: true,
        },
        orderBy: [
          {
            day: "asc",
          },
          {
            period: "asc",
          },
        ],
      });

    res.json({
      success: true,
      data: timetables,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch timetables",
    });
  }
};

// GET STUDENT TIMETABLE
const getStudentTimetable =
  async (req, res) => {
    try {
      const student =
        await prisma.student.findUnique(
          {
            where: {
              userId: req.user.id,
            },
          }
        );

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student profile not found.",
        });
      }

      const timetable =
        await prisma.timetable.findMany(
          {
            where: {
              departmentId:
                student.departmentId,
              semester:
                student.semester,
            },
            include: {
              department: true,
              subject: true,
              faculty: true,
            },
            orderBy: [
              {
                day: "asc",
              },
              {
                period: "asc",
              },
            ],
          }
        );

      res.json({
        success: true,
        data: timetable,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch timetable",
      });
    }
  };

// GET FACULTY TIMETABLE
const getFacultyTimetable =
  async (req, res) => {
    try {
      const faculty =
        await prisma.faculty.findUnique(
          {
            where: {
              userId: req.user.id,
            },
          }
        );

      if (!faculty) {
        return res.status(404).json({
          success: false,
          message: "Faculty profile not found.",
        });
      }

      const timetable =
        await prisma.timetable.findMany(
          {
            where: {
              facultyId:
                faculty.id,
            },
            include: {
              subject: true,
              department: true,
            },
            orderBy: [
              {
                day: "asc",
              },
              {
                period: "asc",
              },
            ],
          }
        );

      res.json({
        success: true,
        data: timetable,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch timetable",
      });
    }
  };

// UPDATE
const updateTimetable =
  async (req, res) => {
    try {
      const { id } = req.params;

      const existing =
        await prisma.timetable.findUnique({
          where: {
            id: Number(id),
          },
        });

      if (!existing) {
        return res.status(404).json({
          success: false,
          message: "Timetable entry not found.",
        });
      }

      const mergedPayload = {
        day:
          req.body.day ?? existing.day,
        period:
          req.body.period ?? existing.period,
        semester:
          req.body.semester ?? existing.semester,
        departmentId:
          req.body.departmentId ??
          existing.departmentId,
        subjectId:
          req.body.subjectId ??
          existing.subjectId,
        facultyId:
          req.body.facultyId ??
          existing.facultyId,
        roomNumber:
          req.body.roomNumber !==
          undefined
            ? req.body.roomNumber
            : existing.roomNumber,
      };

      const validation =
        await validateAndBuildTimetableData(
          mergedPayload,
          id
        );

      if (validation.message) {
        return res.status(
          validation.status
        ).json({
          success: false,
          message:
            validation.message,
        });
      }

      const timetable =
        await prisma.timetable.update({
          where: {
            id: Number(id),
          },
          data: validation.data,
          include: {
            department: true,
            subject: true,
            faculty: true,
          },
        });

      res.json({
        success: true,
        data: timetable,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
        message:
          "Failed to update timetable",
      });
    }
  };

// DELETE
const deleteTimetable =
  async (req, res) => {
    try {
      const { id } = req.params;

      const existing =
        await prisma.timetable.findUnique({
          where: {
            id: Number(id),
          },
        });

      if (!existing) {
        return res.status(404).json({
          success: false,
          message: "Timetable entry not found.",
        });
      }

      await prisma.timetable.delete({
        where: {
          id: Number(id),
        },
      });

      res.json({
        success: true,
        message:
          "Timetable deleted successfully",
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
        message:
          "Failed to delete timetable",
      });
    }
  };

module.exports = {
  createTimetable,
  getTimetables,
  getStudentTimetable,
  getFacultyTimetable,
  updateTimetable,
  deleteTimetable,
};