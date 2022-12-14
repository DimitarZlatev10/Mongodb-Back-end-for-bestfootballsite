const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  register,
  login,
  logout,
  findUserById,
  getUserWishlist,
  getUserInfoByEmail,
  addCardInfo,
  addAmount,
} = require("../controller/user-controller");

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/getId", findUserById);
router.post("/userInfo", getUserInfoByEmail);
router.post("/", addUser);
router.post("/userWishlist", getUserWishlist);
router.post("/addCard", addCardInfo);
router.post("/addAmount", addAmount);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
