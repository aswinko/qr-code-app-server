const Order = require("../models/order.model");
const Cart = require("../models/cart");

exports.addOrder = async (req, res) => {
  try {
    Cart.deleteOne({ user: req.user._id }).then((result, error) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        req.body.user = req.user._id;
        // console.log(req.body.user);
        req.body.tableId = req.user.tableId;
        req.body.orderStatus = [
          {
            type: "ordered",
            date: new Date(),
            isCompleted: true,
          },
          {
            type: "preparing",
            date: new Date(),
            isCompleted: false,
          },
          {
            type: "delivered",
            date: new Date(),
            isCompleted: false,
          },
        ];
        const order = new Order(req.body);
        order.save().then((order, error) => {
          if (error) return res.status(400).json({ error });
          if (order) {
            res.status(201).json({ order });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

exports.getOrders = async (req, res) => {
  try {
    // console.log(req.user._id);
    await Order.find({ user: req.user._id })
      .select("_id paymentStatus paymentType orderStatus items")
      .populate("items.productId", "_id name productPictures")
      .then((orders, error) => {
        if (error) return res.status(500).json({ error });
        if (orders) {
          res.status(200).json({ orders });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
