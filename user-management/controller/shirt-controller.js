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
  // const {teamName} = req.body
  const teamName = req.params.teamName;

  let shirts;
  try {
    shirts = await Shirt.find({ team: teamName });
  } catch (err) {
    return next(err);
  }
  if (!shirts) {
    return res
      .status(500)
      .json({ message: "Unable to find shirts with this team name" });
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

const createShirt = async (req, res, next) => {
  const { title, image, description, price, team } = req.body;
  if (
    (!title && title) ||
    (!image && image == "") ||
    (!description && description == "") ||
    (!price && price < 0) ||
    (!team && team == "")
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

// async function findShirtsByTeamName(teamName) {
//   return Shirt.find({ team: teamName }).lean();
// }

module.exports = {
  getAllShirts,
  getShirtById,
  createShirt,
  addToWishlist,
  removeFromWishlist,
  getShirtsByTeamName,
};
