const prisma = require("../../config/prisma");
const NotFoundError = require("../../errors/NotFoundError");

const getStudentHallTicket = async (studentId) => {
  const allocation = await prisma.examSeatAllocation.findFirst({
    where: {
      studentId: Number(studentId),
    },
    include: {
      student: {
        include: {
          department: true,
        },
      },
      examHallAllocation: {
        include: {
          examHall: true,
          examSchedule: {
            include: {
              examType: true,
              subject: true,
              faculty: true,
            },
          },
        },
      },
    },
  });

  if (!allocation) {
    throw new NotFoundError(
      "Hall Ticket not found for this student."
    );
  }

  return {
    student: {
      id: allocation.student.id,
      name: allocation.student.name,
      regNumber: allocation.student.regNumber,
      semester: allocation.student.semester,
      department: allocation.student.department.name,
    },

    exam: {
      examType:
        allocation.examHallAllocation.examSchedule.examType.name,
      subject:
        allocation.examHallAllocation.examSchedule.subject.name,
      examDate:
        allocation.examHallAllocation.examSchedule.examDate,
      startTime:
        allocation.examHallAllocation.examSchedule.startTime,
      endTime:
        allocation.examHallAllocation.examSchedule.endTime,
      totalMarks:
        allocation.examHallAllocation.examSchedule.totalMarks,
    },

    hall: {
      hall:
        allocation.examHallAllocation.examHall.name,
      building:
        allocation.examHallAllocation.examHall.building,
      floor:
        allocation.examHallAllocation.examHall.floor,
    },

    seat: {
      seatNumber: allocation.seatNumber,
    },
  };
};

module.exports = {
  getStudentHallTicket,
};