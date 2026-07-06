const prisma = require("../config/prisma");

/* ============================================================
   GET STUDENTS FOR MARKS
   GET /api/faculty/marks/students/:subjectId
============================================================ */

const getStudentsForMarks = async (req, res) => {
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
      message: "Failed to fetch students.",
    });
  }
};

/* ============================================================
   SAVE INTERNAL MARKS
   POST /api/faculty/marks
============================================================ */

const saveInternalMarks = async (req, res) => {
  try {
    const {
      subjectId,
      internalNumber,
      marks,
    } = req.body;

    if (
      !subjectId ||
      !internalNumber ||
      !marks
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
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

    for (const studentId in marks) {
      await prisma.internalMark.upsert({
        where: {
          studentId_subjectId_internalNumber:
            {
              studentId:
                Number(studentId),
              subjectId:
                Number(subjectId),
              internalNumber:
                Number(internalNumber),
            },
        },

        update: {
          marksObtained:
            Number(marks[studentId]),
        },

        create: {
          studentId:
            Number(studentId),
          subjectId:
            Number(subjectId),
          internalNumber:
            Number(internalNumber),
          marksObtained:
            Number(marks[studentId]),
        },
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Internal marks saved successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to save internal marks.",
    });
  }
};
/* ============================================================
   GET INTERNAL MARKS
   GET /api/faculty/marks/:subjectId/:internalNumber
============================================================ */

const getInternalMarks = async (req, res) => {
  try {
    const { subjectId, internalNumber } = req.params;

    const marks = await prisma.internalMark.findMany({
      where: {
        subjectId: Number(subjectId),
        internalNumber: Number(internalNumber),
      },
      include: {
        student: {
          select: {
            id: true,
            regNumber: true,
            name: true,
          },
        },
      },
      orderBy: {
        student: {
          regNumber: "asc",
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: marks,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch internal marks.",
    });
  }
};

/* ============================================================
   UPDATE INTERNAL MARK
   PUT /api/faculty/marks/:id
============================================================ */

const updateInternalMark = async (req, res) => {
  try {
    const { id } = req.params;
    const { marksObtained } = req.body;

    const mark =
      await prisma.internalMark.findUnique({
        where: {
          id: Number(id),
        },
      });

    if (!mark) {
      return res.status(404).json({
        success: false,
        message: "Mark record not found.",
      });
    }

    const updated =
      await prisma.internalMark.update({
        where: {
          id: Number(id),
        },
        data: {
          marksObtained:
            Number(marksObtained),
        },
      });

    return res.status(200).json({
      success: true,
      message:
        "Internal mark updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to update internal mark.",
    });
  }
};

/* ============================================================
   DELETE INTERNAL MARK
   DELETE /api/faculty/marks/:id
============================================================ */

const deleteInternalMark = async (req, res) => {
  try {
    const { id } = req.params;

    const mark =
      await prisma.internalMark.findUnique({
        where: {
          id: Number(id),
        },
      });

    if (!mark) {
      return res.status(404).json({
        success: false,
        message: "Mark record not found.",
      });
    }

    await prisma.internalMark.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Internal mark deleted successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete internal mark.",
    });
  }
};

/* ============================================================
   EXPORTS
============================================================ */

module.exports = {
  getStudentsForMarks,
  saveInternalMarks,
  getInternalMarks,
  updateInternalMark,
  deleteInternalMark,
};