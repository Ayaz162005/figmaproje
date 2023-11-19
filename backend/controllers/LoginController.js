import bcrypt from "bcrypt";
import UserModal from "../modals/UserModal.js";
import jwt from "jsonwebtoken";

const createToken = (email) => {
  const token = jwt.sign({ email }, "JSONSECRET", {
    expiresIn: "90d", // Note: '90d' is a string representing 90 days
  });
  return token;
};

export const login = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data) {
      throw new Error("No data provided");
    }

    const { email, password } = data;

    const user = await UserModal.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Password is incorrect");
    }

    const token = createToken(email);

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie("token", token, {
      path: "/",
      domain: "localhost:5173",
      expires,
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    return res.status(200).json({
      message: "Login successful",
      data: {
        user,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
