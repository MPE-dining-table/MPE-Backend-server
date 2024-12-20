import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import secreteKey from "../config/jwtConfig.js";
import mongoose from "mongoose";
import UserModel from "../models/userModel.js";

export const addAdmin = async (req, res) => {
  try {
    const { adminName, email, restuarentName, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      adminName,
      restuarentName,
      email,
      password: hashedPassword,
      role: "admin",
    });

    //   console.log(newUser);

    await newAdmin.save();
    res.status(201).json({ message: `Admin registered` });
  } catch (error) {
    res.status(500).json({
      message: `An error occurred while creating a new Admin: ${error}`,
    });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid admin ID format" });
    }
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json({ message: "Admin successfully deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    const admins = await Admin.find({ role: "admin" }).skip(skip).limit(limit);

    const totalAdmins = await Admin.countDocuments({ role: "admin" });

    res.status(200).json({ admins, totalAdmins, page, limit });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch admins" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User successfully deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};