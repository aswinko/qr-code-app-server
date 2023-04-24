const express = require("express");
const router = express.Router();
const { addItemToCart, getCartItems } = require("../controller/cart");
const { requireLogin, userMiddleware } = require("../middleware/auth");

router.post("/customer/cart/add-to-cart", requireLogin, addItemToCart);

router.post("/customer/get-cart-items", requireLogin, getCartItems);

module.exports = router;
