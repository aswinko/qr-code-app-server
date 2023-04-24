const express = require("express");
const { requireLogin, adminMiddleware } = require("../../middleware/auth");
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controller/admin/order.admin");

const router = express.Router();

router.post(`/order/update`, requireLogin, adminMiddleware, updateOrder);
router.post(
  `/order/getCustomerOrders`,
  requireLogin,
  adminMiddleware,
  getCustomerOrders
);

module.exports = router;