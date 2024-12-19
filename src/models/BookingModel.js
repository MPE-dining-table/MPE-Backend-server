const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    firstName: String,
    lastName: String,
    email: String,
    cellphone: String,
  },
  restaurant: {
    restaurantName: String,
    price: Number,
  },
  bookingSlot: {
    dateIn: {
      type: Object,
      required: true,
    },
    timeIn: {
      type: Date,
      required: true,
    },
    pax: {
      type: String,
      required: true,
    },
    request: {
      type: String,
      default: "",
    },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
