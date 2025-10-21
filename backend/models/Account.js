const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String, default: "" },
  password: { type: String, default: "" },
  likes: { type: Array, default: [] },
  comments: { type: Array, default: [] },
  lol: { type: Array, default: [] },
  cry: { type: Array, default: [] },
  angry: { type: Array, default: [] },
  wonder: { type: Array, default: [] },
  think: { type: Array, default: [] },
});

module.exports = new mongoose.model("Account", schema);
