const express = require("express");

const router = express.Router();

const publisherController = require("../../controllers/library/publisher.controller");
const validate = require("../../middlewares/validate");

const {
  createPublisherSchema,
  updatePublisherSchema,
} = require("../../validators/publisher.validator");

router.post(
  "/",
  validate(createPublisherSchema),
  publisherController.createPublisher
);

router.get("/", publisherController.getAllPublishers);

router.get("/:id", publisherController.getPublisherById);

router.put(
  "/:id",
  validate(updatePublisherSchema),
  publisherController.updatePublisher
);

router.delete("/:id", publisherController.deletePublisher);

module.exports = router;