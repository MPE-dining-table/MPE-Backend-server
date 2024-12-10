import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import secreteKey from "../config/jwtConfig.js";
import mongoose from "mongoose";

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
      return res.status(400).json({ error: "Invalid recipe ID format" });
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
