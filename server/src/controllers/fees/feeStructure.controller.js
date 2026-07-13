const feeStructureService = require("../../services/fees/feeStructure.service");

const createFeeStructure = async (req, res, next) => {
  try {
    const feeStructure =
      await feeStructureService.createFeeStructure(
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Fee structure created successfully.",
      data: feeStructure,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFeeStructures = async (
  req,
  res,
  next
) => {
  try {
    const feeStructures =
      await feeStructureService.getAllFeeStructures();

    return res.status(200).json({
      success: true,
      data: feeStructures,
    });
  } catch (error) {
    next(error);
  }
};

const getFeeStructureById = async (
  req,
  res,
  next
) => {
  try {
    const feeStructure =
      await feeStructureService.getFeeStructureById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: feeStructure,
    });
  } catch (error) {
    next(error);
  }
};

const updateFeeStructure = async (
  req,
  res,
  next
) => {
  try {
    const feeStructure =
      await feeStructureService.updateFeeStructure(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Fee structure updated successfully.",
      data: feeStructure,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFeeStructure = async (
  req,
  res,
  next
) => {
  try {
    await feeStructureService.deleteFeeStructure(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Fee structure deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFeeStructure,
  getAllFeeStructures,
  getFeeStructureById,
  updateFeeStructure,
  deleteFeeStructure,
};