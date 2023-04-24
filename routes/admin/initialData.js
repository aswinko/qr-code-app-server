const { initialData } = require("../../controller/admin/initialData");
const router = require("express").Router();





//
router.post("/initial-data", initialData);


module.exports = router;
