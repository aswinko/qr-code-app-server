const express = require("express");
const router = express.Router();
const { addItemToCart, getCartItems, removeCartItems } = require("../controller/cart");
const { requireLogin } = require("../middleware/auth");

router.post("/customer/cart/add-to-cart", requireLogin, addItemToCart);

router.post("/customer/get-cart-items", requireLogin, getCartItems);

router.post(
  "/user/cart/removeItem",
  requireLogin,
  removeCartItems
);

module.exports = router;
