const mongoose = require("mongoose");

// Function to generate a random contactID
function generateRandomContactID() {
  const length = 6; // You can adjust the length as needed
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

const contactSchema = mongoose.Schema({
  contactID: {
    type: String,
    default: generateRandomContactID,
    unique: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    maxlength: 13,
  },
  nik: {
    type: Number,
    required: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
