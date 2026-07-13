// Express application setup
// Registers middleware, routes, Swagger docs, and global error handler

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');

const app = express();

// ── Global Middleware ──────────────────────────────────────────────────────

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health Check ───────────────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running.',
  });
});

// ── Swagger Documentation ─────────────────────────────────────────────────

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// ── Routes ────────────────────────────────────────────────────────────────

const authRoutes = require('./src/routes/auth.routes');
const departmentRoutes = require('./src/routes/department.routes');
const studentRoutes = require('./src/routes/student.routes');
const facultyRoutes = require('./src/routes/faculty.routes');
const subjectRoutes = require('./src/routes/subject.routes');
const attendanceRoutes = require('./src/routes/attendance.routes');
const internalMarkRoutes = require('./src/routes/internalMark.routes');
const dashboardRoutes = require('./src/routes/dashboard.routes');
const timetableRoutes = require('./src/routes/timetable.routes');
const hostelRoutes = require("./src/routes/hostel/hostel.routes");
const hostelBlockRoutes = require("./src/routes/hostel/hostelBlock.routes");
const hostelRoomRoutes = require("./src/routes/hostel/hostelRoom.routes");
const hostelAllocationRoutes = require("./src/routes/hostel/hostelAllocation.routes");
const hostelBedRoutes = require("./src/routes/hostel/hostelBed.routes");
const feeCategoryRoutes = require("./src/routes/fees/feeCategory.routes");
const feeStructureRoutes = require("./src/routes/fees/feeStructure.routes");
const studentFeeRoutes = require("./src/routes/fees/studentFee.routes");
const feePaymentRoutes = require("./src/routes/fees/feePayment.routes");
const transportRouteRoutes = require("./src/routes/transport/transportRoute.routes");
const transportStopRoutes = require("./src/routes/transport/transportStop.routes");
const transportBusRoutes = require("./src/routes/transport/transportBus.routes");
const studentTransportRoutes = require("./src/routes/transport/studentTransport.routes");
const bookCategoryRoutes = require("./src/routes/library/bookCategory.routes");
const authorRoutes = require("./src/routes/library/author.routes");
const publisherRoutes = require("./src/routes/library/publisher.routes");
const bookRoutes = require("./src/routes/library/book.routes");
const bookCopyRoutes = require("./src/routes/library/bookCopy.routes");
const bookIssueRoutes = require("./src/routes/library/bookIssue.routes");
const libraryDashboardRoutes = require("./src/routes/library/libraryDashboard.routes");
const examTypeRoutes = require("./src/routes/exam/examType.routes");
const examScheduleRoutes = require("./src/routes/exam/examSchedule.routes");
const examHallRoutes = require("./src/routes/exam/examHall.routes");
const examHallAllocationRoutes = require("./src/routes/exam/examHallAllocation.routes");
const examSeatAllocationRoutes = require("./src/routes/exam/examSeatAllocation.routes");
const hallTicketRoutes = require("./src/routes/exam/hallTicket.routes");
const markEntryRoutes = require("./src/routes/exam/markEntry.routes");

app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/internal-marks', internalMarkRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/timetable', timetableRoutes);
app.use("/api/hostels", hostelRoutes);
app.use("/api/hostel-blocks", hostelBlockRoutes);
app.use("/api/hostel-rooms", hostelRoomRoutes);
app.use("/api/hostel-allocations", hostelAllocationRoutes);
app.use("/api/hostel-beds", hostelBedRoutes);
app.use("/api/fee-categories", feeCategoryRoutes);
app.use("/api/fee-structures", feeStructureRoutes);
app.use("/api/student-fees", studentFeeRoutes);
app.use("/api/fee-payments", feePaymentRoutes);
app.use("/api/transport-routes", transportRouteRoutes);
app.use("/api/transport-stops", transportStopRoutes);
app.use("/api/transport-buses", transportBusRoutes);
app.use("/api/student-transport", studentTransportRoutes);
app.use("/api/book-categories", bookCategoryRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/publishers", publisherRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/book-copies", bookCopyRoutes);
app.use("/api/book-issues", bookIssueRoutes);
app.use("/api/library-dashboard", libraryDashboardRoutes);
app.use("/api/exam-types", examTypeRoutes);
app.use("/api/exam-schedules", examScheduleRoutes);
app.use("/api/exam-halls", examHallRoutes);
app.use("/api/exam-hall-allocations", examHallAllocationRoutes);
app.use("/api/exam-seat-allocations", examSeatAllocationRoutes);
app.use("/api/hall-tickets", hallTicketRoutes);
app.use("/api/mark-entries", markEntryRoutes);

// ── 404 Handler ───────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// ── Global Error Handler ──────────────────────────────────────────────────

const { errorResponse } = require("./src/utils/apiResponse");

app.use((err, req, res, next) => {
  console.error("[ERROR]", err);

  if (err.isOperational) {
    return errorResponse(
      res,
      err.message,
      err.statusCode
    );
  }

  return errorResponse(
    res,
    process.env.NODE_ENV === "development"
      ? err.message
      : "Internal Server Error",
    500
  );
});


module.exports = app;