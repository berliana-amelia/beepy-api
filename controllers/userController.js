const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Connection = require("../models/connectionModel"); // Import the connection model

// Function to generate a random connectionID
// Register a new user
const generateRandomID = () => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomID = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomID += charset.charAt(randomIndex);
  }
  return randomID;
};

// Register a new user
async function registerUser(req, res) {
  const {
    nik,
    email,
    nama,
    nomerTelpon,
    jenisKelamin,
    alamat,
    password,
    userType,
    tanggalLahir,
  } = req.body;

  // Validate nik length
  if (nik.length !== 16) {
    return res
      .status(400)
      .json({ error: "NIK must be 16 characters in length" });
  }

  // Hash the password before saving it
  //   const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create a connection with a custom-generated connectionID and a default deviceID
    const connectionID = generateRandomID(); // Generate a random connectionID
    const connection = new Connection({ nik, connectionID }); // Assign the nik and custom-generated connectionID
    await connection.save(); // Save the connection

    // Create the user with the generated connectionID
    const user = new User({
      nik,
      email,
      nama,
      nomerTelpon,
      jenisKelamin,
      alamat,
      password,
      userType,
      tanggalLahir,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Registration failed, NIK already registered" });
  }
}

// Log in a user
// Log in a user
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // If the password matches, send the user data in the response
      res.status(200).json({
        message: "Login successful",
        user: {
          nik: user.nik,
          email: user.email,
          nama: user.nama,
          nomerTelpon: user.nomerTelpon,
          jenisKelamin: user.jenisKelamin,
          alamat: user.alamat,
          userType: user.userType,
          tanggalLahir: user.tanggalLahir,
        },
      });
    } else {
      res.status(401).json({ error: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}

// Update user information by NIK
async function updateUserByNIK(req, res) {
  const nik = req.params.nik; // Extract NIK from the request parameters
  const updatedUser = req.body;

  try {
    const user = await User.findOne({ nik });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user properties as needed
    user.nama = updatedUser.nama || user.nama;
    user.nomerTelpon = updatedUser.nomerTelpon || user.nomerTelpon;
    user.jenisKelamin = updatedUser.jenisKelamin || user.jenisKelamin;
    user.alamat = updatedUser.alamat || user.alamat;
    user.tanggalLahir = updatedUser.tanggalLahir || user.tanggalLahir;

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
}

// Get user by NIK
async function getUserByNIK(req, res) {
  const nik = req.params.nik; // Extract NIK from the request parameters

  try {
    const user = await User.findOne({ nik });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Get user by NIK failed" });
  }
}
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

async function deleteUserByNIK(req, res) {
  const nik = req.params.nik; // Extract NIK from the request parameters

  try {
    // Find the user by NIK
    const user = await User.findOne({ nik });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user with the specified NIK
    await User.deleteOne({ nik });

    // Also, find and delete the associated connection with the same NIK
    await Connection.deleteOne({ nik });

    res.status(200).json({
      message: "User and associated connection deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Delete user and connection by NIK failed" });
  }
}

// Export the delete function along with other functions
module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  updateUserByNIK,
  getUserByNIK,
  deleteUserByNIK, // Add the delete function
};
