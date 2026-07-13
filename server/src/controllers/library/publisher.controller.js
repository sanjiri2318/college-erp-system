const publisherService = require("../../services/library/publisher.service");

const createPublisher = async (req, res, next) => {
  try {
    const publisher = await publisherService.createPublisher(req.body);

    res.status(201).json({
      success: true,
      message: "Publisher created successfully.",
      data: publisher,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPublishers = async (req, res, next) => {
  try {
    const publishers = await publisherService.getAllPublishers(req.query);

    res.json({
      success: true,
      message: "Publishers fetched successfully.",
      data: publishers,
    });
  } catch (error) {
    next(error);
  }
};

const getPublisherById = async (req, res, next) => {
  try {
    const publisher = await publisherService.getPublisherById(req.params.id);

    res.json({
      success: true,
      message: "Publisher fetched successfully.",
      data: publisher,
    });
  } catch (error) {
    next(error);
  }
};

const updatePublisher = async (req, res, next) => {
  try {
    const publisher = await publisherService.updatePublisher(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Publisher updated successfully.",
      data: publisher,
    });
  } catch (error) {
    next(error);
  }
};

const deletePublisher = async (req, res, next) => {
  try {
    await publisherService.deletePublisher(req.params.id);

    res.json({
      success: true,
      message: "Publisher deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPublisher,
  getAllPublishers,
  getPublisherById,
  updatePublisher,
  deletePublisher,
};