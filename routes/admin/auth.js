const { add, login, logout } = require("../../controller/admin/auth");
const { requireLogin } = require("../../middleware/auth");
const router = require("express").Router();





//register
router.post("/admin/add", add);
//login
router.post("/admin/login", login);
//logout
router.post("/admin/logout", requireLogin, logout);


module.exports = router;
