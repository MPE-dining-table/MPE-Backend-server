import BookingModel from "../models/BookingModel";

export default booking = async (req, res) => {
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
