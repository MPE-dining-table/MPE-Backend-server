import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    adminName: { type: String, required: true },
    restuarentName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["super-admin", "admin", "user"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema);
