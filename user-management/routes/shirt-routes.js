const {
  getAllShirts,
  createShirt,
  getShirtById,
  addToWishlist,
  getShirtsByTeamName,
  removeFromWishlist,
} = require("../controller/shirt-controller");

const router = require("express").Router();

router.get("/", getAllShirts);
router.get("/:id", getShirtById);
router.get("/teamName/:teamName", getShirtsByTeamName);
router.post("/", createShirt);
router.post("/wishlist", addToWishlist);
router.post("/removeWishlist", removeFromWishlist);

module.exports = router;
