const User = require("../model/User");
const { hash, compare } = require("bcrypt");
const Shirt = require("../model/Shirt");

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

const getUserWishlist = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(500).json({ message: "This user doesn't exist" });
  }

  if (user.wishlist.length == 0) {
    return res.status(200).json(user.wishlist);
    // return res.status(200).json({ message: "User wishlist is empty" });
  }

  const wishlist = [];
  for (const id of user.wishlist) {
    const item = await Shirt.findById(id);
    if (!item || item.length == 0) {
      return res.status(500).json({ message: "Shirt not found" });
    }

    wishlist.push(item);
  }

  // const wishlist = user.wishlist.forEach(async id=> await Shirt.findById(id))

  return res.status(200).json(wishlist);
};

const findUserById = async (req, res, next) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(500).json({ message: "User not found!" });
  }

  res.status(200).json(user._id);
};

const getUserInfoByEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(500).json({ message: "User not found!" });
  }

  res.status(200).json(user);
};

const register = async (req, res, next) => {
  const { username, email, phoneNumber, password, repass } = req.body;
  if (
    (!username && username.trim() == "") ||
    (!email && email.trim() == "") ||
    (!password && password.length < 6) ||
    repass != password ||
    !phoneNumber
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let user;

  const hashedPassword = await hash(password, 10);

  try {
    user = await new User({
      username,
      email,
      phoneNumber,
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
    return res.status(500).json({ message: "Wrong email or password" });
  }

  const hasMatch = await compare(password, user.hashedPassword);

  if (!hasMatch) {
    return res.status(500).json({ message: "Wrong email or password" });
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
  getUserInfoByEmail,
  getUserWishlist,
  findUserById,
  register,
  login,
  logout,
};
