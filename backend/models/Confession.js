const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  creator: { type: String, default: "" },
  category: { type: String, default: "" },
  content: { type: String, default: "" },
  likes: { type: Number, default: 0 },
  comments: { type: Array, default: [] },
  lol: { type: Number, default: 0 },
  cry: { type: Number, default: 0 },
  angry: { type: Number, default: 0 },
  wonder: { type: Number, default: 0 },
  think: { type: Number, default: 0 },
  time: { type: Number, default: 0 },
});

module.exports = new mongoose.model("Confession", schema);
