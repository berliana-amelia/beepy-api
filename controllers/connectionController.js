const asyncHandler = require("express-async-handler");
const Connection = require("../models/connectionModel");

// Create a new connection
const createConnection = asyncHandler(async (req, res) => {
  const { connectionID, nik, deviceID } = req.body;

  const connection = new Connection({
    connectionID,
    nik,
    deviceID,
  });

  await connection.save();
  res.status(201).json({ message: "Connection created successfully" });
});

// Get all connections
const getAllConnections = asyncHandler(async (req, res) => {
  const connections = await Connection.find({});
  res.status(200).json(connections);
});

// Update a connection by NIK
const updateConnectionByNik = asyncHandler(async (req, res) => {
  const nik = req.params.nik; // Extract NIK from the request parameters
  const updateData = req.body;

  const connection = await Connection.findOneAndUpdate({ nik }, updateData, {
    new: true,
  });

  if (!connection) {
    return res.status(404).json({ error: "Connection not found" });
  }

  res.status(200).json({ message: "Connection updated successfully" });
});

// Delete a connection by NIK
const deleteConnectionByNik = asyncHandler(async (req, res) => {
  const nik = req.params.nik; // Extract NIK from the request parameters

  const connection = await Connection.findOneAndRemove({ nik });

  if (!connection) {
    return res.status(404).json({ error: "Connection not found" });
  }

  res.status(200).json({ message: "Connection deleted successfully" });
});

// Get a connection by NIK
const getConnectionByNik = asyncHandler(async (req, res) => {
  const nik = req.params.nik; // Extract NIK from the request parameters

  const connection = await Connection.findOne({ nik });

  if (!connection) {
    return res.status(404).json({ error: "Connection not found" });
  }

  res.status(200).json(connection);
});

module.exports = {
  createConnection,
  getAllConnections,
  updateConnectionByNik,
  deleteConnectionByNik,
  getConnectionByNik,
};
