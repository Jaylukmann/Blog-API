import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (name, email, password) => {
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new userModel({
    name,
    email,
    password: hashedPassword
  });

  await user.save();

  return user;
};

export const loginUser = async (email, password) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 400;
    throw error;
  }

  const token = generateToken({
    id: user._id,
    email: user.email
  });

  const resUser = {
    id: user._id,
    name: user.name,
    email: user.email
  };

  return {
    user: resUser,
    token
  };
};