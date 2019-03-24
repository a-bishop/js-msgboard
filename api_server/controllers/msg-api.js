const mongoose = require("mongoose");
const messageModel = mongoose.model("message");

// GET Request Handler
const getAllMessagesOrderedByLastPosted = (req, res) => {
  messageModel
    .find()
    .sort({ _id: -1 })
    .exec((err, messages) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(messages);
      }
    });
};

// POST Request Handler
const addNewMessage = (req, res) => {
  messageModel.create(req.body, (err, message) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(message);
    }
  });
};

// DELETE Request Handler
const deleteMessage = (req, res) => {
  messageModel.findOneAndDelete(req.body, (err, msg) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Message deleted",
      id: msg._id
    };
    return res.status(200).send(response);
  });
};

module.exports = {
  getAllMessagesOrderedByLastPosted,
  addNewMessage,
  deleteMessage
};
