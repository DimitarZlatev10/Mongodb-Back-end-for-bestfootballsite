const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const NUMBER_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return NUMBER_REGEX.test(value);
      },
      message: "Phone number must be valid (ex. 000-000-0000)",
    },
    unique: true,
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
