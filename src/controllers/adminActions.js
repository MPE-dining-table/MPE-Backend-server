import mongoose from "mongoose";
import Restuarent from "../models/restaurentModel.js";

export const addRestuarent = async (req, res) => {
  try {
    const {
      restuarentName,
      address,
      cuisine,
      about,
      openingTime,
      closingTime,
    } = req.body;

    // Check if an image file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const adminId = req.user._id; 

    const newRes = new Restuarent({
      restuarentName,
      address,
      cuisine,
      about,
      images: req.file.path, 
      openingTime,
      closingTime,
      adminId, 
    });

    await newRes.save();
    res
      .status(201)
      .json({
        message: `New restaurant added successfully!`,
        restaurant: newRes,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `An error occurred while creating a new restaurant`,
    });
  }
};

export const getRestuarants = async (req, res) => {
  try {
    const restuarents = await Restuarent.find(); 

    res.status(200).json({ restuarents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};


export const deleteRestuarent = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid restuarent ID format" });
    }
    const deletedRestuarent = await Restuarent.findByIdAndDelete(req.params.id);
    if (!deletedRestuarent) {
      return res.status(404).json({ error: "Restuarent not found" });
    }
    res.status(200).json({ message: "Restuarent successfully deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateRestuarent = async (req, res) => {
  try {
    const updatedRestuarent = await Restuarent.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!updatedRestuarent) {
      return res.status(404).json({ error: "Restuarent not found" });
    }
    res.status(200).json(updatedRestuarent);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getRestuarentById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid Restuarent ID format" });
    }
    const restuarent = await Restuarent.findById(req.params.id);
    if (!restuarent) {
      return res.status(404).json({ error: "Restuarent not found" });
    }
    res.status(200).json(restuarent);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
