const express = require("express");
const router = express.Router();
const {
	getProducts,
	getProductsById,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/productController.js");

const isAuth = require("../middlewares/isAuth");

router.route("/").get(getProducts).post(isAuth, createProduct);
router
	.route("/:id")
	.get(getProductsById)
	.put(isAuth, updateProduct)
	.delete(isAuth, deleteProduct);

module.exports = router;
