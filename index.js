import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import dbConnect from "./src/config/dbConnect.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

dbConnect();

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:8081",
}));app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//auth routes
app.use("/api/auth", authRoutes);

//super admin and admin routes
app.use("/api/actions", userRoutes);


app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});

