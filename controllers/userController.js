import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password: ", hashedPassword);

  //Create a new user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      hashedPassword: hashedPassword,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }
  //Compare password
  console.log("password: ", password);
  console.log("user.password: ", user.password);
  const isMatch = await bcrypt.compare(password.trim(), user.password);
  console.log("isMatch: ", isMatch);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  //Generate token
  const accessToken = jwt.sign(
    {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  res.json({ accessToken });
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

export { registerUser, loginUser, currentUser };
