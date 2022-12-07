const Shirt = require("../model/Shirt");

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

module.exports = {
  getAllShirts,
  getShirtById,
  createShirt,
};
