const feeCategoryService = require("../../services/fees/feeCategory.service");

const createFeeCategory = async (req, res, next) => {
  try {
    const category = await feeCategoryService.createFeeCategory(req.body);

    return res.status(201).json({
      success: true,
      message: "Fee category created successfully.",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFeeCategories = async (req, res, next) => {
  try {
    const categories = await feeCategoryService.getAllFeeCategories();

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const getFeeCategoryById = async (req, res, next) => {
  try {
    const category = await feeCategoryService.getFeeCategoryById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateFeeCategory = async (req, res, next) => {
  try {
    const category = await feeCategoryService.updateFeeCategory(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Fee category updated successfully.",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFeeCategory = async (req, res, next) => {
  try {
    await feeCategoryService.deleteFeeCategory(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Fee category deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFeeCategory,
  getAllFeeCategories,
  getFeeCategoryById,
  updateFeeCategory,
  deleteFeeCategory,
};