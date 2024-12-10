import mongoose from "mongoose";

const retsuarentSchema = new mongoose.Schema(
  {
    restuarentName: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    cuisine: { type: String, required: true },
    about: { type: String, required: true },
    images: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Restuarent", retsuarentSchema);