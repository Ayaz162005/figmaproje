import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
const validatePassword = function (v) {
  return bcrypt.compare(v, this.password);
};

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [4, "Username length must be at least 4 characters"],
    maxLength: [15, "Username length can be at most 15 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password length must be at least 8 characters"],
    validate: {
      validator: (v) => {
        return /^.{8,}$/.test(v);
      },
      message: "Password must contain at least one letter",
    },
  },
  passwordConfirm: {
    type: String,
    required: true,
    select: false,
    validate: [
      { validator: validatePassword, message: "Passwords don't match" },
    ],
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
});

UserSchema.pre("save", function (next) {
  this.passwordConfirm = undefined;
  next();
});
UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
