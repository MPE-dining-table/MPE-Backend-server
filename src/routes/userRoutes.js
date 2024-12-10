import express from "express";
import { verifyToken } from "../middleware/authMiddlware.js";
import { authorizeRole } from "../middleware/roleMiddlware.js";
import { addAdmin, deleteAdmin } from "../controllers/superAdminActions.js";
import { addRestuarent } from "../controllers/adminActions.js";

const route = express.Router();

//only super admin can access these route
route.post(
  "/add-new-admin",
  verifyToken,
  authorizeRole("super-admin"),
  addAdmin
);

route.delete(
  "/remove-admin/:id",
  verifyToken,
  authorizeRole("super-admin"),
  deleteAdmin
);

//only admin can access these route
route.post("/add-restuarent", verifyToken, authorizeRole("admin"), addRestuarent);

//all can access these route
route.get("/user", verifyToken, (req, res) => {
  res.json({ message: "welcome user" });
});

export default route;
