const { requireLogin } = require("../middleware/auth")
const { getOrders, addOrder } = require("../controller/order");
const router = require("express").Router();

router.post("/add-orders", requireLogin, addOrder);
router.get("/get-orders", requireLogin, getOrders);

module.exports = router;