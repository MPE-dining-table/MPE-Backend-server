import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import secreteKey from "../config/jwtConfig.js";
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, cellphone, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      cellphone,
      password: hashedPassword,
      role,
    });

    console.log(newUser);

    await newUser.save();
    res.status(201).json({ message: `User registered with username ${email}` });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while creating a new user: ${error}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // console.log("JWT_SECRET:", process.env.JWT_SECRET);
    // console.log("randomd key: ", secreteKey);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with email ${email} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid user credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, secreteKey, {
      expiresIn: "2h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while trying to log in: ${error}`,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: `Admin with email ${email} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, secreteKey, {
      expiresIn: "2h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while trying to log in: ${error}`,
    });
  }
};
