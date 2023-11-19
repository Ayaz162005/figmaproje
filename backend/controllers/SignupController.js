import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModal from "../modals/UserModal.js";

const createToken = (email) => {
  const token = jwt.sign({ email }, "JSONSECRET", {
    expiresIn: "90d", // Note: '90d' is a string representing 90 days
  });
  return token;
};

export const signUp = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data) {
      throw new Error("No data provided");
    }

    const { username, email, password, confirmpassword } = data;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const have = await UserModal.findOne({ email });

    if (have) {
      throw new Error("This person already has an account");
    }

    // Create a new user using the UserModal
    const newUser = await UserModal.create({
      username: username,
      email,
      password: hashedPassword,
      passwordConfirm: confirmpassword,
    });

    const token = createToken(email);

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
      message: "Signup successful",
      data: {
        user: newUser,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
