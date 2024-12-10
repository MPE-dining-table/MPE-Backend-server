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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//auth routes
app.use("/api/auth", authRoutes);

//super admin routes
app.use("/api/super-admin", userRoutes);

app.listen(PORT, () =>
  console.log(`server listening on http://localhost:${PORT}`)
);
