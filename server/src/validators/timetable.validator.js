const ValidationError = require("../errors/ValidationError");

const DAY_VALUES = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const isProvided = (value) =>
  value !== undefined && value !== null && value !== "";

const validateCreateTimetable = (req, res, next) => {
  const {
    day,
    period,
    semester,
    departmentId,
    subjectId,
    facultyId,
  } = req.body;

  if (
    !isProvided(day) ||
    !isProvided(period) ||
    !isProvided(semester) ||
    !isProvided(departmentId) ||
    !isProvided(subjectId) ||
    !isProvided(facultyId)
  ) {
    return next(
      new ValidationError(
        "day, period, semester, departmentId, subjectId and facultyId are required."
      )
    );
  }

  const normalizedDay = String(day).toUpperCase().trim();
  if (!DAY_VALUES.includes(normalizedDay)) {
    return next(
      new ValidationError(
        "Invalid day value."
      )
    );
  }

  next();
};

const validateUpdateTimetable = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(
      new ValidationError(
        "At least one field is required to update timetable."
      )
    );
  }

  if (isProvided(req.body.day)) {
    const normalizedDay = String(req.body.day)
      .toUpperCase()
      .trim();

    if (!DAY_VALUES.includes(normalizedDay)) {
      return next(
        new ValidationError(
          "Invalid day value."
        )
      );
    }
  }

  next();
};

module.exports = {
  validateCreateTimetable,
  validateUpdateTimetable,
};
