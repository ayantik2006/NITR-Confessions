const jwt = require("jsonwebtoken");
const Account = require("../models/Account");

exports.getUser = async (req, res) => {
  try {
    const user = jwt.verify(req.cookies.user, process.env.SECRET);
    return res.json({});
  } catch (err) {
    return res.json({ msg: "logged out" });
  }
};

exports.signup = async (req, res) => {
  const { username, password, gender } = req.body;
  const userData = await Account.find({ username: username });
  if (userData.length !== 0) return res.json({ msg: "failure" });
  await Account.create({
    username: username,
    password: password,
    gender: gender,
  });

  res.json({});
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const userData = await Account.find({ username: username });
  console.log(req.body);
  try {
    if (
      userData[0].username === username &&
      userData[0].password === password
    ) {
      const token = jwt.sign({ user: username }, process.env.SECRET);
      res.cookie("user", token, {
        httpOnly: true,
        secure:
          process.env.FRONTEND_URL === "http://localhost:5173" ? false : true,
        sameSite: process.env.FRONTEND_URL === "http://localhost:5173"?"strict":"none",
      });
      return res.json({ msg: "success" });
    }
  } catch (err) {
    return res.json({ msg: "failure" });
  }

  return res.json({ msg: "failure" });
};

exports.findUsername = async (req, res) => {
  const username = req.body.username;
  const userData = await Account.find({ username: username });
  if (userData.length === 0) return res.json({ msg: "not exists" });
  else return res.json({ msg: "exists" });
};
