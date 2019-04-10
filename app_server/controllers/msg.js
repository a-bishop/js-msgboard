"use strict";
const React = require("react");
const ReactDOMServer = require("react-dom/server");
require("es6-promise").polyfill();
require("isomorphic-fetch");

const MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/msgsdb";

require("@babel/register")({
  presets: ["@babel/preset-react"]
});

// Transpile and add the React Components
// const Header = React.createFactory(require("../components/Header.jsx"));
const Footer = React.createFactory(require("../components/Footer.jsx"));
const MsgBoard = React.createFactory(require("../components/MsgBoard.jsx"));

function handleHTTPErrors(response) {
  if (!response.ok) throw Error(response.status + ": " + response.statusText);
  return response;
}

// index handler
const renderIndex = (req, res, msgs) => {
  res.render("index", {
    title: "Cats. Discuss...",
    // header: ReactDOMServer.renderToString(Header()),
    footer: ReactDOMServer.renderToString(Footer()),
    msgBoard: ReactDOMServer.renderToString(MsgBoard({ messages: msgs })),
    props: "<script>let messages=" + JSON.stringify(msgs) + "</script>"
  });
};

const getMessages = (req, res) => {
  fetch(`${process.env.API_URL}/msgs`)
    .then(response => handleHTTPErrors(response))
    .then(result => result.json())
    .then(result => {
      if (!(result instanceof Array)) {
        console.error("API lookup error");
        result = [];
      } else {
        renderIndex(req, res, result);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = {
  getMessages
};
