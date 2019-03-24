const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20
  },
  msg: String,
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("message", messageSchema);
