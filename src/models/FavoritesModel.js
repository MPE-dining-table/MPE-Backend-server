import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      _id: { type: String, required: true },
      restaurantName: { type: String, required: true },
      image: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Favorite", favoriteSchema);
