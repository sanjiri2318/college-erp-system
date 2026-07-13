const feePaymentService = require("../../services/fees/feePayment.service");

const createFeePayment = async (req, res, next) => {
  try {
    const payment =
      await feePaymentService.createFeePayment(
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Fee payment recorded successfully.",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPayments = async (req, res, next) => {
  try {
    const payments =
      await feePaymentService.getAllPayments();

    return res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

const getPaymentById = async (req, res, next) => {
  try {
    const payment =
      await feePaymentService.getPaymentById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

const deletePayment = async (req, res, next) => {
  try {
    const result =
      await feePaymentService.deletePayment(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFeePayment,
  getAllPayments,
  getPaymentById,
  deletePayment,
};