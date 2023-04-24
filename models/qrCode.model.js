const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const qrCodeSchema = new Schema(
  {
    data: { type: String, required: true },
    image: { type: Buffer, required: true },
    tableId: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const QRCode = mongoose.model('QRCode', qrCodeSchema);
module.exports = QRCode;