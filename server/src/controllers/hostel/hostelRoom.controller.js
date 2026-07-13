const hostelRoomService = require("../../services/hostel/hostelRoom.service");

const createHostelRoom = async (req, res, next) => {
  try {
    const room = await hostelRoomService.createHostelRoom(req.body);

    return res.status(201).json({
      success: true,
      message: "Hostel room created successfully.",
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

const getAllHostelRooms = async (req, res, next) => {
  try {
    const rooms = await hostelRoomService.getAllHostelRooms();

    return res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
};

const getHostelRoomById = async (req, res, next) => {
  try {
    const room = await hostelRoomService.getHostelRoomById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

const updateHostelRoom = async (req, res, next) => {
  try {
    const room = await hostelRoomService.updateHostelRoom(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Hostel room updated successfully.",
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHostelRoom = async (req, res, next) => {
  try {
    await hostelRoomService.deleteHostelRoom(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Hostel room deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHostelRoom,
  getAllHostelRooms,
  getHostelRoomById,
  updateHostelRoom,
  deleteHostelRoom,
};