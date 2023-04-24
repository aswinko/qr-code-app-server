const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Customer",
      required: true,
    },
    tableId: {
      type: mongoose.Schema.Types.Number,
      ref: "Customer",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectID,
          ref: "Product",
          required: true,
        },
        payablePrice: { type: Number, required: true },
        purchasedQty: { type: Number, required: true },
        // price: { type: Number, requiredd: true }
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refund"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["pay at counter", "upi", "card"],
      required: true,
    },
    orderStatus: [
      {
        type: {
          type: String,
          enum: ["ordered", "preparing", "cancelled", "delivered"],
          default: "ordered",
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
