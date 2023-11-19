import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModal from "../modals/UserModal.js";

const createToken = (email) => {
  const token = jwt.sign({ email }, "JSONSECRET", {
    expiresIn: "90d", // Note: '90d' is a string representing 90 days
  });
  return token;
};

export const updateUser = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data) {
      throw new Error("No data provided");
    }

    if (data.username) {
      const { username, email } = data;

      // Create a new user using the UserModal
      const updateUser = await UserModal.findOneAndUpdate(
        {
          email,
        },
        {
          username,
        }
      );

      return res.status(200).json({
        message: "Change success",
        data: {
          user: updateUser,
        },
      });
    } else {
      const { password, newpassword, passwordconfirm, email } = data;

      if (password !== passwordconfirm) {
        throw new Error("Password  is not same");
      }
      const user = await UserModal.findOne({ email });
      if (!user) {
        throw new Error("This user don't exist");
      }
      console.log(password, user);
      const check = await bcrypt.compare(password, user.password);
      if (!check) {
        throw new Error("Password is wrong");
      }
      const newpas = await bcrypt.hash(newpassword, 12);

      // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 12);

      // const have = await UserModal.findOne({ email });

      // if (have) {
      //   throw new Error("This person already has an account");
      // }

      // Create a new user using the UserModal
      const updateUser = await UserModal.findOneAndUpdate(
        {
          email,
        },
        {
          password: newpas,
        }
      );

      const token = createToken(email);

      const expires = new Date();
      expires.setDate(expires.getDate() + 7);

      res.cookie("token", token, {
        path: "/",
        domain: "localhost:5173",
        expires,
        // sameSite: "None",
        httpOnly: false,
        // secure: true,
        // signed: true,
      });

      return res.status(200).json({
        message: "Change success",
        data: {
          user: updateUser,
        },
        token,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
