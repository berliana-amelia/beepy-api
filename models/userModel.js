const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  nik: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nama: {
    type: String,
    required: true,
  },
  nomerTelpon: {
    type: String,
  },
  jenisKelamin: {
    type: String,
  },
  alamat: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
  },
  tanggalLahir: {
    type: String,
  },
  signUpDate: {
    type: String, // Store the date as a string
    default: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
