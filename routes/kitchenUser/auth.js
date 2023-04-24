const { add, login } = require("../../controller/kitchenUser/auth");

const router = require("express").Router();





//register
router.post("/kitchen/add", add);
//login
router.post("/kitchen/login", login);


module.exports = router;
