//register
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      succes: true,
      message: "Registration successfull",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      succes: false,
      message: "Some error occured",
    });
  }
};

//login

const login = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      succes: false,
      message: "Some error occured",
    });
  }
};

//logout

module.exports = { registerUser };
