const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    reportID: {
      type: String,
      maxlength: 50,
      required: [true, "Please enter a report ID"],
    },
    timeStamp: {
      type: Date,
      required: true,
    },
    latitude: {
      type: String,
      maxlength: 100,
      required: [true, "Please enter latitude"],
    },
    longitude: {
      type: String,
      maxlength: 100,
      required: [true, "Please enter longitude"],
    },
    statusID: {
      type: Number,
      required: [true, "Please enter a status ID"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    nik: {
      type: Number,
      required: [true, "Please enter a nik"],
    },
    connectionID: {
      type: String,
      required: [true, "Please enter a connection ID"],
    },
    categoryID: {
      type: Number,
      required: [true, "Please enter a category ID"],
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
