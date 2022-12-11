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
} = require("../controller/user-controller");

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/getId", findUserById);
router.post("/", addUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
