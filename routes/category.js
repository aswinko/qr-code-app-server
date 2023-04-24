const express = require("express");
const router = express.Router();
const { addCategory, getCategories } = require("../controller/category");
const { requireLogin, adminMiddleware } = require("../middleware/auth");

router.post("/category/addcategory", requireLogin, adminMiddleware, addCategory);

router.get("/category/getcategory", getCategories);

module.exports = router;
