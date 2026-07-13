const hostelBedService = require("../../services/hostel/hostelBed.service");

const createHostelBed = async (req, res, next) => {
  try {
    const bed = await hostelBedService.createHostelBed(req.body);

    return res.status(201).json({
      success: true,
      message: "Hostel bed created successfully.",
      data: bed,
    });
  } catch (error) {
    next(error);
  }
};

const getAllHostelBeds = async (req, res, next) => {
  try {
    const beds = await hostelBedService.getAllHostelBeds();

    return res.status(200).json({
      success: true,
      data: beds,
    });
  } catch (error) {
    next(error);
  }
};

const getHostelBedById = async (req, res, next) => {
  try {
    const bed = await hostelBedService.getHostelBedById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data: bed,
    });
  } catch (error) {
    next(error);
  }
};

const updateHostelBed = async (req, res, next) => {
  try {
    const bed = await hostelBedService.updateHostelBed(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Hostel bed updated successfully.",
      data: bed,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHostelBed = async (req, res, next) => {
  try {
    await hostelBedService.deleteHostelBed(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Hostel bed deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHostelBed,
  getAllHostelBeds,
  getHostelBedById,
  updateHostelBed,
  deleteHostelBed,
};
