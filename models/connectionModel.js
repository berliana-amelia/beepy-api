const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  connectionID: {
    type: String, // Change the type to String to accommodate custom-generated IDs
    required: [true, "Please enter a connection ID"],
  },
  nik: {
    type: Number,
    required: [true, "Please enter a nik"],
  },
  deviceID: {
    type: Number,
    default: 0,
    required: [true, "Please enter a device ID"],
  },
});

const Connection = mongoose.model("Connection", connectionSchema);

module.exports = Connection;
