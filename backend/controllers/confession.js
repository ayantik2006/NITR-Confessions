const Account = require("../models/Account");
const Confession = require("../models/Confession");
const jwt = require("jsonwebtoken");

exports.createConfession = async (req, res) => {
  const user = jwt.verify(req.cookies.user, process.env.SECRET).user;
  const userData=await Account.findOne({username:user});
  const { category, content } = req.body;
  await Confession.create({
    category: category,
    content: content,
    creator: user,
    creatorGender:userData.gender,
    time: new Date().getTime() / 1000,
  });
  res.json({});
};

exports.getConfessions = async (req, res) => {
  const userData = await Confession.find({});
  const user = jwt.verify(req.cookies.user, process.env.SECRET).user;
  const accountInfo = await Account.findOne({ username: user });
  console.log(accountInfo);

  res.json({ confessions: userData, userData: accountInfo });
};

exports.updateReaction = async (req, res) => {
  const { reactionType, reactionCount, id, type } = req.body;
  const user = jwt.verify(req.cookies.user, process.env.SECRET).user;

  if (reactionType === "like") {
    await Confession.updateOne({ _id: id }, { likes: reactionCount });
    const userData = await Account.find({ username: user });
    if (type === "increase")
      await Account.updateOne(
        { username: user },
        { likes: [...userData[0].likes, id] }
      );
    else {
      await Account.updateOne(
        { username: user },
        { likes: userData[0].likes.slice(0, userData[0].likes.length - 1) }
      );
    }
  }

  if (reactionType === "lol") {
    await Confession.updateOne({ _id: id }, { lol: reactionCount });
    const userData = await Account.find({ username: user });
    if (type === "increase")
      await Account.updateOne(
        { username: user },
        { lol: [...userData[0].lol, id] }
      );
    else {
      await Account.updateOne(
        { username: user },
        { lol: userData[0].likes.slice(0, userData[0].lol.length - 1) }
      );
    }
  }

  if (reactionType === "cry") {
    await Confession.updateOne({ _id: id }, { cry: reactionCount });
    const userData = await Account.find({ username: user });
    if (type === "increase")
      await Account.updateOne(
        { username: user },
        { cry: [...userData[0].cry, id] }
      );
    else {
      await Account.updateOne(
        { username: user },
        { cry: userData[0].cry.slice(0, userData[0].cry.length - 1) }
      );
    }
  }

  if (reactionType === "angry") {
    await Confession.updateOne({ _id: id }, { angry: reactionCount });
    const userData = await Account.find({ username: user });
    if (type === "increase")
      await Account.updateOne(
        { username: user },
        { angry: [...userData[0].angry, id] }
      );
    else {
      await Account.updateOne(
        { username: user },
        { angry: userData[0].angry.slice(0, userData[0].angry.length - 1) }
      );
    }
  }

  if (reactionType === "wonder") {
    await Confession.updateOne({ _id: id }, { wonder: reactionCount });
    const userData = await Account.find({ username: user });
    if (type === "increase")
      await Account.updateOne(
        { username: user },
        { wonder: [...userData[0].wonder, id] }
      );
    else {
      await Account.updateOne(
        { username: user },
        { wonder: userData[0].wonder.slice(0, userData[0].wonder.length - 1) }
      );
    }
  }

  if (reactionType === "think") {
    await Confession.updateOne({ _id: id }, { think: reactionCount });
    const userData = await Account.find({ username: user });
    if (type === "increase")
      await Account.updateOne(
        { username: user },
        { think: [...userData[0].think, id] }
      );
    else {
      await Account.updateOne(
        { username: user },
        { think: userData[0].think.slice(0, userData[0].think.length - 1) }
      );
    }
  }
};
