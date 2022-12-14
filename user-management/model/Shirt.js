const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const shirtSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  inStock: {
    type: Number,
    required: true,
  },
  wishlist: [
    {
      type: ObjectId,
      ref: "User",
      default: [],
    },
  ],
});

const Shirt = model("Shirt", shirtSchema);

module.exports = Shirt;
