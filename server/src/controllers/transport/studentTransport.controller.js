const studentTransportService = require("../../services/transport/studentTransport.service");

const allocateStudentTransport = async (
  req,
  res,
  next
) => {
  try {
    const allocation =
      await studentTransportService.allocateStudentTransport(
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Student transport allocated successfully.",
      data: allocation,
    });
  } catch (error) {
    next(error);
  }
};

const getAllStudentTransport = async (
  req,
  res,
  next
) => {
  try {
    const allocations =
      await studentTransportService.getAllStudentTransport();

    return res.status(200).json({
      success: true,
      data: allocations,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentTransportById = async (
  req,
  res,
  next
) => {
  try {
    const allocation =
      await studentTransportService.getStudentTransportById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: allocation,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudentTransport = async (
  req,
  res,
  next
) => {
  try {
    await studentTransportService.deleteStudentTransport(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Transport allocation deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allocateStudentTransport,
  getAllStudentTransport,
  getStudentTransportById,
  deleteStudentTransport,
};