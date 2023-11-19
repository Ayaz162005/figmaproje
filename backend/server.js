import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouters from "./routes/authRoutes.js"; // assuming .mjs extension for ES6 modules
import nftsRouters from "./routes/nftsRoutes.js"; // assuming .js extension for ES6 modules
import createRouters from "./routes/creatorRoutes.js"; // assuming .js extension for ES6 modules
import userRouters from "./routes/userRoutes.js";
import { SendEmail, updateCreatorLike } from "./controllers/helpers.js";
// assuming .mjs extension for ES6 modules

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("../public"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.post("/v1/sendemail", SendEmail);
app.use("/v1/updatelike", updateCreatorLike);
app.use("/v1/auth", authRouters);
app.use("/v1/nfts", nftsRouters);
app.use("/v1/user", userRouters);
app.use("/v1/creators", createRouters);
mongoose.connect(
  "mongodb+srv://ummanayaz07:Ayaz2005@cluster0.sytmxkw.mongodb.net/test"
);
app.listen(5000, () => {
  console.log("server start");
});
