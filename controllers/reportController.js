const Report = require("../models/reportModel");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");

// Generate a random 6-character alphanumeric reportID
const generateRandomID = () => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomID = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomID += charset.charAt(randomIndex);
  }
  return randomID;
};
const getReportsByNik = asyncHandler(async (req, res) => {
  try {
    const { nik } = req.params;
    const reports = await Report.find({ nik });
    if (!reports || reports.length === 0) {
      res.status(404);
      throw new Error(`No reports found for nik ${nik}`);
    }
    res.status(200).json(reports);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getAllReports = asyncHandler(async (req, res) => {
  try {
    const reports = await Report.find({});
    res.status(200).json(reports);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getMaps = asyncHandler(async (req, res) => {
  try {
    const reports = await Report.find({});
    const latLongArray = reports.map((report) => {
      return {
        latitude: report.latitude,
        longitude: report.longitude,
      };
    });

    res.status(200).json(latLongArray);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
const getReportById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
      res.status(404);
      throw new Error(`Cannot find any report with ID ${id}`);
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getReportByReportID = asyncHandler(async (req, res) => {
  try {
    const { reportID } = req.params;
    const report = await Report.findOne({ reportID });
    if (!report) {
      res.status(404);
      throw new Error(`No report found with reportID ${reportID}`);
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const addReport = asyncHandler(async (req, res) => {
  try {
    // Generate a random reportID
    const randomReportID = generateRandomID();

    // Set the timeStamp to the current time
    const reportData = {
      ...req.body,
      reportID: randomReportID,
      timeStamp: new Date(),
    };

    // Create the report in the database
    const report = await Report.create(reportData);
    res.status(200).json(report);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const editReport = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findByIdAndUpdate(id, req.body, { new: true });
    if (!report) {
      res.status(404);
      throw new Error(`Cannot find any report with ID ${id}`);
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteReport = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findByIdAndDelete(id);
    if (!report) {
      res.status(404);
      throw new Error(`Cannot find any report with ID ${id}`);
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const editReportByReportID = asyncHandler(async (req, res) => {
  try {
    const { reportID } = req.params;
    const reportData = req.body;
    const report = await Report.findOneAndUpdate({ reportID }, reportData, {
      new: true,
    });

    if (!report) {
      res.status(404);
      throw new Error(`Cannot find any report with reportID ${reportID}`);
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteReportByReportID = asyncHandler(async (req, res) => {
  try {
    const { reportID } = req.params;
    const report = await Report.findOneAndDelete({ reportID });

    if (!report) {
      res.status(404);
      throw new Error(`Cannot find any report with reportID ${reportID}`);
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateStatusByReportID = asyncHandler(async (req, res) => {
  try {
    const { reportID } = req.params;
    const { statusID } = req.body;

    const report = await Report.findOne({ reportID });

    if (!report) {
      res.status(404);
      throw new Error(`Cannot find any report with reportID ${reportID}`);
    }

    report.statusID = statusID; // Update the status field

    // You can also update other fields as needed
    // report.fieldName = req.body.fieldName;

    await report.save();

    res.status(200).json(report);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getAllReports,
  getReportById,
  addReport,
  editReportByReportID,
  deleteReportByReportID,
  getReportsByNik,
  getReportByReportID,
  updateStatusByReportID,
  getMaps,
};
