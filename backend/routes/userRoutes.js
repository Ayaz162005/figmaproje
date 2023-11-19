import express from "express";
import { updateUser } from "../controllers/UserControllers.js";
import { forgotPassword, resetPassword } from "../controllers/helpers.js";

const routes = express.Router();

routes.route("/update").post(updateUser);
routes.route("/forgotpassword").post(forgotPassword);
routes.post("/resetPassword/:token", resetPassword);
export default routes;
