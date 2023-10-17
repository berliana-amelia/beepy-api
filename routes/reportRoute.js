const express = require("express");
const Report = require("../models/reportModel");
const router = express.Router();
const {
  getMaps,
  getAllReports,
  getReportById,
  addReport,
  getReportsByNik,
  getReportByReportID,
  editReportByReportID,
  deleteReportByReportID,
  updateStatusByReportID, // Assuming you've added the function for retrieving reports by nik
} = require("../controllers/reportController");

router.get("/", getAllReports);

router.get("/maps", getMaps);

router.get("/:id", getReportById);

router.post("/", addReport);

router.put("/:reportID", editReportByReportID);

router.delete("/:reportID", deleteReportByReportID);

// Add a route for retrieving reports by nik
router.get("/nik/:nik", getReportsByNik);

router.get("/id/:reportID", getReportByReportID);

router.put("/updateStatus/:reportID", updateStatusByReportID);
module.exports = router;
