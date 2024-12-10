import express from "express";
import { login, register, adminLogin } from "../controllers/authController.js";

const route = express.Router();

//user auth routes
route.post("/register", register);
route.post("/login", login);

//admin auth route
route.post("/admin-login", adminLogin);

export default route;
