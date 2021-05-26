const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  role: {
      type: String
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true
  },
});

module.exports = User = mongoose.model("user", UserSchema);