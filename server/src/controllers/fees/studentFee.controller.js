const studentFeeService = require("../../services/fees/studentFee.service");

const createStudentFee = async (req, res, next) => {
  try {
    const studentFee =
      await studentFeeService.createStudentFee(
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Student fee assigned successfully.",
      data: studentFee,
    });
  } catch (error) {
    next(error);
  }
};

const getAllStudentFees = async (
  req,
  res,
  next
) => {
  try {
    const studentFees =
      await studentFeeService.getAllStudentFees();

    return res.status(200).json({
      success: true,
      data: studentFees,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentFeeById = async (
  req,
  res,
  next
) => {
  try {
    const studentFee =
      await studentFeeService.getStudentFeeById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: studentFee,
    });
  } catch (error) {
    next(error);
  }
};

const updateStudentFee = async (
  req,
  res,
  next
) => {
  try {
    const studentFee =
      await studentFeeService.updateStudentFee(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Student fee updated successfully.",
      data: studentFee,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudentFee = async (
  req,
  res,
  next
) => {
  try {
    await studentFeeService.deleteStudentFee(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Student fee deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudentFee,
  getAllStudentFees,
  getStudentFeeById,
  updateStudentFee,
  deleteStudentFee,
};