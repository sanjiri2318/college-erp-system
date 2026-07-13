const hostelAllocationService = require("../../services/hostel/hostelAllocation.service");

const allocateBed = async (req, res, next) => {
  try {
    const allocation =
      await hostelAllocationService.allocateBed(
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Bed allocated successfully.",
      data: allocation,
    });
  } catch (error) {
    next(error);
  }
};

const getAllAllocations = async (
  req,
  res,
  next
) => {
  try {
    const allocations =
      await hostelAllocationService.getAllAllocations();

    return res.status(200).json({
      success: true,
      data: allocations,
    });
  } catch (error) {
    next(error);
  }
};

const getAllocationById = async (
  req,
  res,
  next
) => {
  try {
    const allocation =
      await hostelAllocationService.getAllocationById(
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

const checkoutAllocation = async (
  req,
  res,
  next
) => {
  try {
    const allocation =
      await hostelAllocationService.checkoutAllocation(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: "Student checked out successfully.",
      data: allocation,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAllocation = async (
  req,
  res,
  next
) => {
  try {
    await hostelAllocationService.deleteAllocation(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Allocation deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allocateBed,
  getAllAllocations,
  getAllocationById,
  checkoutAllocation,
  deleteAllocation,
};