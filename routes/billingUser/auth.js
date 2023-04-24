const { add, login } = require("../../controller/billingUser/auth");

const router = require("express").Router();





//register
router.post("/billing/add", add);
//login
router.post("/billing/login", login);


module.exports = router;
