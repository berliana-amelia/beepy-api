const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get contacts by nik
const getContactsByNik = asyncHandler(async (req, res) => {
  const { nik } = req.params;
  const contacts = await Contact.find({ nik });
  res.status(200).json(contacts);
});

// Get contact by contactID
const getContactByContactID = asyncHandler(async (req, res) => {
  const { contactID } = req.params;
  const contact = await Contact.findOne({ contactID });
  if (!contact) {
    res.status(404).json({ message: "Contact not found" });
  } else {
    res.status(200).json(contact);
  }
});

// Edit contact by id
const editContactByContactID = asyncHandler(async (req, res) => {
  const { contactID } = req.params;
  const updatedContactData = req.body;

  const contact = await Contact.findOne({ contactID });
  if (!contact) {
    res.status(404).json({ message: "Contact not found" });
  } else {
    // Update the contact with the provided data
    const updatedContact = await Contact.findOneAndUpdate(
      { contactID },
      updatedContactData,
      {
        new: true, // Return the updated contact
      }
    );

    res.status(200).json(updatedContact);
  }
});

const deleteContactByContactID = asyncHandler(async (req, res) => {
  const { contactID } = req.params;

  // Find the contact by contactID
  const contact = await Contact.findOne({ contactID });
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  // Delete the contact
  await contact.deleteOne(); // Use .deleteOne() to delete the document

  res.status(200).json({ message: "Contact deleted successfully" });
});

const addContact = asyncHandler(async (req, res) => {
  const { contactName, contactNumber, nik } = req.body;

  // Create a new contact using the provided data
  const newContact = new Contact({
    contactName,
    contactNumber,
    nik,
  });

  // Save the new contact to the database
  await newContact.save();

  res.status(201).json(newContact);
});
module.exports = {
  getContactsByNik,
  getContactByContactID,
  editContactByContactID,
  deleteContactByContactID,
  addContact,
};
