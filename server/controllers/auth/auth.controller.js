//register
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        succes: false,
        message: "Email already used, please try another email",
      });
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({ succes: false, message: "User doesn't exist" });
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        succes: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      succes: true,
      message: "Logged in succesfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      succes: false,
      message: "Some error occured",
    });
  }
};

//logout

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      succes: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      succes: false,
      message: "Unauthorised user!",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    succes: true,
    message: "Logged out successfully",
  });
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };