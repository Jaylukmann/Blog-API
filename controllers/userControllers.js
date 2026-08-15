const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const jwt = require("jsonwebtoken");

//user registration controller
const registerUser = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = new userModel({ 
        name, 
        email,
        password: hashedPassword });

    await user.save();

    return res.status(200).json({
      message: "User registered successfully",
      user: user
    });
  } catch (error) {
    next(error);
  }
};

//user login controller
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ 
        id: user._id,
        email: user.email 
    }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const resUser = {
        id: user._id,
        name: user.name,
        email: user.email
    };
    return res.status(200).json({
      message: "User logged in successfully",
      user: resUser,
      token
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };