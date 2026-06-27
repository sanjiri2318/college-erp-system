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

app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/internal-marks', internalMarkRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/timetable', timetableRoutes);

// ── 404 Handler ───────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// ── Global Error Handler ──────────────────────────────────────────────────

app.use((err, req, res, next) => {
  console.error('[ERROR]', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
    }),
  });
});

module.exports = app;