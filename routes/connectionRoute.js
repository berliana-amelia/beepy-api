const express = require("express");
const router = express.Router();
const connectionController = require("../controllers/connectionController");

// Create a new connection
router.post("/", connectionController.createConnection);

// Get all connections
router.get("/", connectionController.getAllConnections);

// Get a connection by NIK
router.get("/:nik", connectionController.getConnectionByNik);

// Update a connection by NIK
router.put("/:nik", connectionController.updateConnectionByNik);

// Delete a connection by NIK
router.delete("/:nik", connectionController.deleteConnectionByNik);

module.exports = router;
