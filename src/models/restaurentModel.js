import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    restuarentName: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    cuisine: { type: String, required: true },
    about: { type: String, required: true },
    images: { type: String, required: true }, 
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Restuarent", restaurantSchema);
