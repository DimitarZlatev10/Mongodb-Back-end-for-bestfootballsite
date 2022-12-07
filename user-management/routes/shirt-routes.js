const {
  getAllShirts,
  createShirt,
  getShirtById,
} = require("../controller/shirt-controller");

const router = require("express").Router();

router.get("/", getAllShirts);
router.get("/:id", getShirtById);
router.post("/", createShirt);

module.exports = router;
