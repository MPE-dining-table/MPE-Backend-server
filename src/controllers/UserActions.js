import BookingModel from "../models/BookingModel.js";
import FavoritesModel from "../models/FavoritesModel.js";
import UserModel from "../models/userModel.js";

export const booking = async (req, res) => {
  try {
    const bookingData = req.body;

    const newBooking = new BookingModel(bookingData);
    await newBooking.save();

    res.status(201).json({ message: "Booking saved successfully", newBooking });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ message: "Error saving booking", error });
  }
};

export const fetchBooking = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const bookings = await BookingModel.find({ "user.email": userEmail });
    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await BookingModel.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({
      message: "Booking deleted successfully",
      booking: deletedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { firstName, lastName, email, cellphone } = req.body;

  try {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.cellphone = cellphone || user.cellphone;

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        cellphone: updatedUser.cellphone,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const addFavorites = async (req, res) => {
  try {
    const {
      _id,
      about,
      address,
      closingTime,
      email,
      image,
      openingTime,
      price,
      restaurantName,
      telephone,
    } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!_id || !restaurantName || !address) {
      return res
        .status(400)
        .json({ message: "Restaurant ID, name, and address are required." });
    }

    const favorite = new FavoritesModel({
      user: req.user.id, 
      restaurant: {
        _id,
        about,
        address,
        closingTime,
        email,
        image,
        openingTime,
        price,
        restaurantName,
        telephone,
      },
    });

    const savedFavorite = await favorite.save();

    return res.status(201).json({
      message: "Restaurant added to favorites",
      favorite: savedFavorite,
    });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchFavorites = async (req, res) => {
  try {
    const favorites = await FavoritesModel.find({ user: req.user.id });
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch favorites." });
  }
};
