const { getAllShirts, createShirt } = require("../controller/shirt-controller");

const router = require("express").Router();

router.get("/", getAllShirts);
router.post("/", createShirt);

module.exports = router;
