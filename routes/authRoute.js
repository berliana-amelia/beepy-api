const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUserByNIK,
  getUserByNIK,
  getAllUsers,
  deleteUserByNIK,
} = require("../controllers/userController");
const { route } = require("./reportRoute");

// Register a new user
router.post("/register", registerUser);

router.get("/", getAllUsers);

// Log in a user
router.post("/login", loginUser);

// Update user by NIK
router.put("/update/:nik", updateUserByNIK);

// Get user by NIK
router.get("/get/:nik", getUserByNIK);

router.delete("/delete/:nik", deleteUserByNIK); 

module.exports = router;
