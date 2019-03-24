const mongoose = require("mongoose");
const messageModel = mongoose.model("message");

// GET All Messages Request Handler
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

// POST Single Message Request Handler
const addNewMessage = (req, res) => {
  messageModel.create(req.body, (err, message) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(message);
    }
  });
};

// GET Single Message Request Handler
const showMessage = (req, res) => {
  messageModel.findById({ _id: req.params.messageid }, (err, msg) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).send(msg);
    }
  });
};

// PUT Edit
const updateMessage = (req, res) => {
  messageModel.findOneAndUpdate(
    { _id: req.params.messageid },
    req.body,
    (err, msg) => {
      if (err) return res.status(500).send(err);
      const response = {
        message: "Message updated",
        id: msg._id
      };
      return res.status(200).send(response);
    }
  );
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

const deleteAllMessages = (req, res) => {};

module.exports = {
  getAllMessagesOrderedByLastPosted,
  addNewMessage,
  showMessage,
  updateMessage,
  deleteMessage,
  deleteAllMessages
};
