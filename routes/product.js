const express = require("express");
const router = express.Router();
const multer = require("multer");
const {nanoid} = require('nanoid');
const { requireLogin, adminMiddleware } = require("../middleware/auth");
const { createProduct, getProductsBySlug } = require("../controller/product");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads/'))
    },
    filename: function (req, file, cb) {
      cb(null, nanoid() + '-' + file.originalname)
    }
  })
  const upload = multer({ storage: storage });

router.post("/product/create", requireLogin, adminMiddleware, upload.array('productPictures'), createProduct);

  router.get("/products/:slug", getProductsBySlug);

module.exports = router;
