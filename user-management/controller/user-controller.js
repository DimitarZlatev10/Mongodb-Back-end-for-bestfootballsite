const User = require("../model/User");
const { hash, compare } = require("bcrypt");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return next(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res.status(200).json(users);
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to find user" });
  }
  return res.status(200).json(user);
};

const addUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    (!username && username.trim() == "") ||
    (!email && email.trim() == "") ||
    (!password && password.length < 6)
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let user;

  try {
    user = new User({
      username,
      email,
      password,
    });

    user = await user.save();
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to save user" });
  }

  return res.status(201).json({ user });
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { username, email, password } = req.body;
  if (
    (!username && username.trim() == "") ||
    (!email && email.trim() == "") ||
    (!password && password.length < 6)
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let user;
  try {
    user = await User.findByIdAndUpdate(id, { username, email, password });
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to save user" });
  }
  return res.status(200).json({ message: "Successfully updated" });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to delete user" });
  }
  return res.status(200).json({ message: "Successfully deleted user" });
};

const register = async (req, res, next) => {
  const { username, email, password, repass } = req.body;
  if (
    (!username && username.trim() == "") ||
    (!email && email.trim() == "") ||
    (!password && password.length < 6) ||
    repass != password
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let user;

  const hashedPassword = await hash(password, 10);

  try {
    user = await new User({
      username,
      email,
      hashedPassword,
    });
    await user.save();
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to save user" });
  }
  return res.status(200).json(user);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(500).json({ message: "Invalid email" });
  }

  const hasMatch = await compare(password, user.hashedPassword);

  if (!hasMatch) {
    return res.status(500).json({ message: "Invalid password" });
  }

  return res.status(200).json(user);
};

const logout = async (req, res, next) => {
  return res.status(200).json({ message: "Successfully logged out!" });
};

async function getUserByEmail(email) {
  const user = await User.findOne({
    email: new RegExp(`^${email}$`, "i"),
  });

  return user;
}
module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  register,
  login,
  logout,
};
