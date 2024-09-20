const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userCheck = await User.findOne({ username });
    if (userCheck) {
      console.log("in user check")
      return res.json({ msg: "User already exist", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      console.log("in email check")
      return res.json({ msg: "Email already exist", status: false });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPass,
    });
    delete user.password;
    return res.json({ user, status: true });
  } catch (e) {
    console.log(e);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "User not found", status: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ msg: "Password is incorrect", status: false });
    }
    delete user.password;
    return res.json({ user, status: true });
  } catch (e) {
    console.log(e);
  }
}

module.exports.allUsers = async (req, res) => {
  try {
    const users = await User.find({_id: {$ne: req.params.id } }).select([
      "email", "username", "_id", "avatarImage" 
    ])
    return res.json(users);
  } catch (error) {
    
  }
}