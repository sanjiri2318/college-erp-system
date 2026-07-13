const libraryDashboardService = require("../../services/library/libraryDashboard.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");

const getLibraryDashboard = asyncHandler(async (req, res) => {
  const dashboard =
    await libraryDashboardService.getLibraryDashboard();

  return successResponse(
    res,
    dashboard,
    "Library dashboard fetched successfully."
  );
});

module.exports = {
  getLibraryDashboard,
};