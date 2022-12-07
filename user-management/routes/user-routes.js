const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  register,
  login,
  logout,
} = require("../controller/user-controller");

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
