const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectID, ref: "Customer", required: true },
    cartItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectID, ref: 'Product', required: true },
            quantity: { type: Number, default: 1 },
            // price: { type: Number, requiredd: true }
        }
    ]
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
