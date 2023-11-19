import express from "express";
import {
  checkAuth,
  forgotPassword,
  getMe,
  resetPassword,
} from "../controllers/helpers.js";
import { signUp } from "../controllers/SignupController.js";
import { login } from "../controllers/LoginController.js";

const routes = express.Router();

routes.route("/check").get(checkAuth);
routes.route("/login").post(login);
// routes.route("/forgotpasswrod").post(forgotPassword);

routes.route("/signup").post(signUp);
routes.route("/me").post(getMe);

export default routes;
