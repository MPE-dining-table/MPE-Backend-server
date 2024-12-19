import BookingModel from "../models/BookingModel.js";

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
      return res.status(404).json({ message: "No bookings found for this user." });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const updateBooking =  async (req, res) => {
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

    res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const deleteBooking =  async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await BookingModel.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({ message: "Booking deleted successfully", booking: deletedBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}