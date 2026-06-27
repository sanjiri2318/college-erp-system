const prisma = require("../config/prisma");

// CREATE TIMETABLE
const createTimetable = async (req, res) => {
  try {
    const {
      day,
      period,
      roomNumber,
      semester,
      departmentId,
      subjectId,
      facultyId,
    } = req.body;

    const timetable =
      await prisma.timetable.create({
        data: {
          day,
          period: Number(period),
          roomNumber,
          semester: Number(semester),
          departmentId: Number(
            departmentId
          ),
          subjectId: Number(subjectId),
          facultyId: Number(facultyId),
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
    const timetables =
      await prisma.timetable.findMany({
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

      const timetable =
        await prisma.timetable.update({
          where: {
            id: Number(id),
          },
          data: {
            ...req.body,
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