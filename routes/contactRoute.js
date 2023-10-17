const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.get("/nik/:nik", contactController.getContactsByNik);
router.get("/contactID/:contactID", contactController.getContactByContactID);
router.put("/:contactID", contactController.editContactByContactID);
router.delete("/:contactID", contactController.deleteContactByContactID); // Add the delete route
router.post("/", contactController.addContact); // Add the create route
module.exports = router;
