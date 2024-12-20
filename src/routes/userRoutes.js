import express from "express";
import { verifyToken } from "../middleware/authMiddlware.js";
import { authorizeRole } from "../middleware/roleMiddlware.js";
import {
  addAdmin,
  deleteAdmin,
  deleteUser,
  getAdmins,
  getUsers,
} from "../controllers/superAdminActions.js";
import {
  addRestuarent,
  deleteRestuarent,
  getRestuarants,
  getRestuarentById,
  updateRestuarent,
} from "../controllers/adminActions.js";
import {
  addFavorites,
  booking,
  deleteBooking,
  fetchBooking,
  fetchFavorites,
  updateBooking,
  updateProfile,
} from "../controllers/UserActions.js";

const route = express.Router();

//only super admin can access these route
route.post(
  "/add-new-admin",
  verifyToken,
  authorizeRole("super-admin"),
  addAdmin
);

route.get("/get-admins", verifyToken, authorizeRole("super-admin"), getAdmins);

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

route.get("/get-users", verifyToken, getUsers);

route.delete("/delete-user/:id", verifyToken, deleteUser);

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

//users can access these routes
route.post("/booking", verifyToken, booking);
route.get("/bookings", verifyToken, fetchBooking);
route.put("/booking/:id", verifyToken, updateBooking);
route.delete("/booking/:id", verifyToken, deleteBooking);

route.put("/profile", verifyToken, updateProfile);

route.post("/add-favorites", verifyToken, addFavorites);
route.get("/fetch-favorites", verifyToken, fetchFavorites);

export default route;
