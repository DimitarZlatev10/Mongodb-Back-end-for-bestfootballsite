const {
  getAllShirts,
  createShirt,
  getShirtById,
  addToWishlist,
  getShirtsByTeamName,
  removeFromWishlist,
  getMostWishlistedShirts,
  buyProduct,
} = require("../controller/shirt-controller");

const router = require("express").Router();

router.get("/all", getAllShirts);
router.get("/mostWishlisted", getMostWishlistedShirts);
router.get("/:id", getShirtById);
router.get("/teamName/:teamName", getShirtsByTeamName);
router.post("/", createShirt);
router.post("/wishlist", addToWishlist);
router.post("/removeWishlist", removeFromWishlist);
router.post("/buyProduct", buyProduct);

module.exports = router;
