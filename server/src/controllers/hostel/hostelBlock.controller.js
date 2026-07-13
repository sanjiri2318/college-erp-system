const hostelBlockService = require("../../services/hostel/hostelBlock.service");

const createHostelBlock = async (req, res, next) => {
  try {
    const block = await hostelBlockService.createHostelBlock(req.body);

    return res.status(201).json({
      success: true,
      message: "Hostel block created successfully.",
      data: block,
    });
  } catch (error) {
    next(error);
  }
};

const getAllHostelBlocks = async (req, res, next) => {
  try {
    const blocks = await hostelBlockService.getAllHostelBlocks();

    return res.status(200).json({
      success: true,
      data: blocks,
    });
  } catch (error) {
    next(error);
  }
};

const getHostelBlockById = async (req, res, next) => {
  try {
    const block = await hostelBlockService.getHostelBlockById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data: block,
    });
  } catch (error) {
    next(error);
  }
};

const updateHostelBlock = async (req, res, next) => {
  try {
    const block = await hostelBlockService.updateHostelBlock(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Hostel block updated successfully.",
      data: block,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHostelBlock = async (req, res, next) => {
  try {
    await hostelBlockService.deleteHostelBlock(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Hostel block deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHostelBlock,
  getAllHostelBlocks,
  getHostelBlockById,
  updateHostelBlock,
  deleteHostelBlock,
};