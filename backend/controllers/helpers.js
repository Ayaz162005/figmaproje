import jwt from "jsonwebtoken";
import UserModal from "../modals/UserModal.js";
import sendEmail from "../utils/sendEmail.js";
import CreatorModel from "../modals/CreateModal.js";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
const createToken = (email) => {
  const token = jwt.sign({ email }, "JSONSECRET", {
    expiresIn: "90d", // Note: '90d' is a string representing 90 days
  });
  return token;
};
export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const decoded = jwt.verify(token, "JSONSECRET");

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await UserModal.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isTokenExpired = Date.now() >= decoded.exp * 1000;
    if (isTokenExpired) {
      return res.status(401).json({ error: "Token has expired" });
    }

    res.locals.user = user;
    return res.status(200).json({
      message: "correct login",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      message: "success",
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const SendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    console.log(email);
    await sendEmail(email);

    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCreatorLike = async (req, res, next) => {
  try {
    const { who, whom } = req.body;

    const d = await CreatorModel.findOne({ userId: whom });
    if (!d) {
      throw new Error("You don't have creator");
    }

    const whoId = new mongoose.Types.ObjectId(who);
    if (whoId.equals(d._id)) {
      throw new Error("You cannot like your own creator profile");
    }

    const creator = await CreatorModel.findOne({ _id: who });
    if (!creator) {
      throw new Error("This creator does not exist");
    }

    let newIds;
    if (creator.followersIds.includes(d._id)) {
      newIds = creator.followersIds.filter((id) => !id.equals(d._id));
    } else {
      console.log("not same");
      newIds = [...creator.followersIds, d._id];
    }

    await CreatorModel.updateOne({ _id: who }, { followersIds: newIds });
    res
      .status(200)
      .json({ message: "Creator's followers updated successfully" });
  } catch (error) {
    // console.log(error.message, "erororo");
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export async function forgotPassword(req, res, next) {
  const user = await UserModal.findOne({ email: req.body.email });
  try {
    if (!user) {
      throw new Error("There is no user with this email");
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    // const resetURL = `${req.protocol}://${req.get(
    //   "host"
    // )}/v1/user/resetPassword/${resetToken}`;
    const resetURL = `http://localhost:3000/reset/${resetToken}`;
    await sendEmail(req.body.email, "reset", resetURL);
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (error) {
    if (user) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
    }

    console.log(error);
    res.status(500).json({
      message: "Have same problem send email again",
      error: error.message,
    });
  }
}

export async function resetPassword(req, res, next) {
  console.log("fdgdofidfo");
  console.log(req.params.token);
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    console.log(hashedToken);
    const user = await UserModal.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Token is invalid or has expired");
    }

    if (req.body.password != req.body.passwordConfirm) {
      throw new Error("Password are not same");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    user.password = hashedPassword;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = createToken(user.email);

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie("token", token, {
      path: "/",
      domain: "localhost:5173",
      expires,
      // sameSite: "None",
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",

      // signed: true,
    });
    return res.status(200).json({
      message: "success",
      data: {
        user: user,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "error",
      error: error.message,
    });
  }
}
