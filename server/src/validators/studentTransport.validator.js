const validateAllocateStudentTransport = (
  req,
  res,
  next
) => {
  const {
    studentId,
    busId,
    stopId,
  } = req.body;

  if (
    !studentId ||
    !busId ||
    !stopId
  ) {
    return res.status(400).json({
      success: false,
      message: "Student, bus and stop are required.",
    });
  }

  next();
};

module.exports = {
  validateAllocateStudentTransport,
};
