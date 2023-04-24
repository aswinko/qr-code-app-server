const router = require("express").Router();
const { add, login, customerLogin } = require("../controller/auth");
// const Table = require("../models/table.model");


//register
router.post("/add", add);
// router.post("/login", login);

router.post("/login", customerLogin);

module.exports = router;
