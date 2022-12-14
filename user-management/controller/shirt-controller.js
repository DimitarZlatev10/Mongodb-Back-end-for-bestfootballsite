const Shirt = require("../model/Shirt");
const User = require("../model/User");

const getAllShirts = async (req, res, next) => {
  let shirts;
  try {
    shirts = await Shirt.find();
  } catch (err) {
    return next(err);
  }
  if (!shirts) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res.status(200).json(shirts);
};

const getShirtsByTeamName = async (req, res, next) => {
  const teamName = req.params.teamName;

  let shirts;
  try {
    shirts = await Shirt.find({ team: teamName });
  } catch (err) {
    return next(err);
  }
  if (shirts.length == 0) {
    return;
    // return res
    //   .status(500)
    //   .json({ message: "Unable to find shirts with this team name" });
  }

  return res.status(200).json(shirts);
};

const getShirtById = async (req, res, next) => {
  const id = req.params.id;
  let shirt;
  try {
    shirt = await Shirt.findById(id);
  } catch (err) {
    return next(err);
  }
  if (!shirt) {
    return res.status(500).json({ message: "Unable to find shirt" });
  }
  return res.status(200).json(shirt);
};

const getMostWishlistedShirts = async (req, res, next) => {
  let shirts = await Shirt.find();

  let mostWishlisted = shirts.filter((shirt) => shirt.wishlist.length > 0);

  let sortedWishlist = mostWishlisted.sort((p1, p2) =>
    p1.wishlist.length < p2.wishlist.length
      ? 1
      : p1.wishlist.length > p2.wishlist.length
      ? -1
      : 0
  );

  let topTenWishlisted = sortedWishlist.slice(0, 10);

  return res.status(200).json(topTenWishlisted);
};

const createShirt = async (req, res, next) => {
  const { title, image, description, price, team, inStock } = req.body;
  if (
    (!title && title == "") ||
    (!image && image == "") ||
    (!description && description == "") ||
    (!price && price < 0) ||
    (!team && team == "") ||
    !inStock ||
    inStock.length < 0
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let shirt;

  try {
    shirt = new Shirt({
      title,
      image,
      description,
      price,
      team,
      inStock,
    });

    shirt = await shirt.save();
  } catch (err) {
    return next(err);
  }
  if (!shirt) {
    return res.status(500).json({ message: "Unable to create shirt" });
  }

  return res.status(201).json(shirt);
};

const addToWishlist = async (req, res, next) => {
  const { shirtId, userId } = req.body;
  const shirt = await Shirt.findById(shirtId);
  const user = await User.findById(userId);

  if (shirt.wishlist.includes(userId)) {
    return res
      .status(500)
      .json({ message: "You have already added this item to your wishlist" });
  }

  if (user.wishlist.includes(shirtId)) {
    return res
      .status(500)
      .json({ message: "This item is already in your wishlist" });
  }

  shirt.wishlist.push(userId);
  await shirt.save();

  user.wishlist.push(shirtId);
  await user.save();

  return res.status(200).json({ message: "Item is added to your wishlist" });
};

const removeFromWishlist = async (req, res, next) => {
  const { shirtId, userId } = req.body;
  const shirt = await Shirt.findById(shirtId);
  const user = await User.findById(userId);

  if (!shirt.wishlist.includes(userId)) {
    return res
      .status(500)
      .json({ message: "You haven't added this item to your wishlist" });
  }

  if (!user.wishlist.includes(shirtId)) {
    return res
      .status(500)
      .json({ message: "This item is not in your wishlist" });
  }

  const userIndex = shirt.wishlist.indexOf(userId);
  const shirtIndex = user.wishlist.indexOf(shirtId);

  shirt.wishlist.splice(userIndex, 1);
  user.wishlist.splice(shirtIndex, 1);

  await shirt.save();
  await user.save();

  return res
    .status(200)
    .json({ message: "Item successfully removed from wishlist" });
};

const buyProduct = async (req, res, next) => {
  const { userId, shirtId, quantity } = req.body;

  const user = await User.findById(userId);
  const shirt = await Shirt.findById(shirtId);

  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }

  if (!shirt) {
    return res.status(500).json({ message: "Product not found" });
  }

  const message = `Successfully purchased ${quantity} ${shirt.title} for $${
    shirt.price * quantity
  }`;

  shirt.inStock -= quantity;
  user.balance -= shirt.price * quantity;
  user.transactions.push(message);

  await shirt.save();
  await user.save();

  return res.status(200).json({ message: message });
};

module.exports = {
  getAllShirts,
  getShirtById,
  createShirt,
  addToWishlist,
  removeFromWishlist,
  getShirtsByTeamName,
  getMostWishlistedShirts,
  buyProduct,
};
