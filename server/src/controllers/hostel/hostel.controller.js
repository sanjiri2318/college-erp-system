const hostelService = require("../../services/hostel/hostel.service");

const createHostel = async (req, res, next) => {
  try {
    const hostel = await hostelService.createHostel(req.body);

    return res.status(201).json({
      success: true,
      message: "Hostel created successfully.",
      data: hostel,
    });
  } catch (error) {
    next(error);
  }
};

const getAllHostels = async (req, res, next) => {
  try {
    const hostels = await hostelService.getAllHostels();

    return res.status(200).json({
      success: true,
      data: hostels,
    });
  } catch (error) {
    next(error);
  }
};

const getHostelById = async (req, res, next) => {
  try {
    const hostel = await hostelService.getHostelById(req.params.id);

    return res.status(200).json({
      success: true,
      data: hostel,
    });
  } catch (error) {
    next(error);
  }
};

const updateHostel = async (req, res, next) => {
  try {
    const hostel = await hostelService.updateHostel(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Hostel updated successfully.",
      data: hostel,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHostel = async (req, res, next) => {
  try {
    await hostelService.deleteHostel(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Hostel deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
  deleteHostel,
};