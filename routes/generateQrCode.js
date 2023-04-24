const express = require("express");
const { generateQrCode, getQrCodeById, getAllQrCode } = require("../controller/generateQrCode");
const router = express.Router();


router.post("/generate-qrcode", generateQrCode);
// router.get("/qrcode/:id", getQrCodeById);
router.get("/get-all-qrcode", getAllQrCode);

module.exports = router;
