import express from "express";
import { verifyToken } from "../middleware/authMiddlware.js";
import { authorizeRole } from "../middleware/roleMiddlware.js";

const route = express.Router();

//only super admin can access these route
route.get(
  "/super-admin",
  verifyToken,
  authorizeRole("super-admin"),
  (req, res) => {
    res.json({ message: "welcome super admin" });
  }
);

//only admin can access these route
route.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "welcome admin" });
});

//all can access these route
route.get("/user", verifyToken, (req, res) => {
  res.json({ message: "welcome user" });
});

export default route;
