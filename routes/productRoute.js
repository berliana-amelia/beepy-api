const express = require("express");
const Product = require("../models/productModels");
const router = express.Router();
const {
  getAllProduct,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getAllProduct);

router.get("/:id", getProductById);

router.post("/", addProduct);

router.put("/:id", editProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
