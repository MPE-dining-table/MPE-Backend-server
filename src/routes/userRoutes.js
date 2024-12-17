import express from "express";
import { verifyToken } from "../middleware/authMiddlware.js";
import { authorizeRole } from "../middleware/roleMiddlware.js";
import { addAdmin, deleteAdmin, getAdmins } from "../controllers/superAdminActions.js";
import {
  addRestuarent,
  deleteRestuarent,
  getRestuarants,
  getRestuarentById,
  updateRestuarent,
} from "../controllers/adminActions.js";

const route = express.Router();

//only super admin can access these route
route.post(
  "/add-new-admin",
  verifyToken,
  authorizeRole("super-admin"),
  addAdmin
);

route.get(
  "/get-admins",
  verifyToken,
  authorizeRole("super-admin"),
  getAdmins
);

route.delete(
  "/remove-admin/:id",
  verifyToken,
  authorizeRole("super-admin"),
  deleteAdmin
);

route.delete(
  "/delete-restuarent/:id",
  verifyToken,
  authorizeRole("super-admin"),
  deleteRestuarent
);

//only admin can access these route
route.post(
  "/add-restuarent",
  verifyToken,
  authorizeRole("admin"),
  addRestuarent
);

route.put(
  "/update-restuarent/:id",
  verifyToken,
  authorizeRole("admin"),
  updateRestuarent
);

//all can access these route
route.get("/fetch-restuarents", getRestuarants);
route.get("/fetch-restuarent/:id", getRestuarentById);

export default route;
