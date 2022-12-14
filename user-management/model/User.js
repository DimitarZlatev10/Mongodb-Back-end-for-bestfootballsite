const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  wishlist: {
    type: [ObjectId],
    ref: "Shirt",
    default: [],
  },
  transactions: {
    type: [String],
    ref: "Shirt",
    default: [],
  },
  creditCardInfo: {
    type: Array,
    default: [],
  },
});

userSchema.index(
  { email: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;
