const mongoose = require("mongoose");
const messageModel = mongoose.model("message");
// const server = require("../../bin/www");
// const http = require("http");
// var io = require("socket.io")(server);

// io.on("connection", function(socket) {
//   console.log("socketing!!\n");
// });

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
      console.log("sending message");
      io.emit("message", req.body);
      res.status(201).json(message);
    }
  });
};

// GET Single Message Request Handler
const showMessage = (req, res) => {
  messageModel.findById({ _id: req.params.messageid }, (err, msg) => {
    // If not authorized send 403 response
    if (req.params.name !== msg.name) {
      res.status(403).json(err);
    } else if (err) {
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
      // If not authorized send 403 response
      if (req.params.name !== msg.name) {
        res.status(403).json(err);
      } else if (err) return res.status(500).send(err);
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
    // If not authorized send 403 response
    if (req.params.name !== msg.name && req.params.name !== "Admin") {
      res.status(403).json(err);
    }
    return res.status(200).send(msg);
  });
};

const deleteAllMessages = (req, res) => {
  messageModel.deleteMany({}, err => {
    // If not authorized send 403 response
    if (req.body.name !== "Admin") {
      res.status(403).json(err);
    }
    const response = {
      message: "All messages deleted"
    };
    return res.status(200).send(response);
  });
};

module.exports = {
  getAllMessagesOrderedByLastPosted,
  addNewMessage,
  showMessage,
  updateMessage,
  deleteMessage,
  deleteAllMessages
};
