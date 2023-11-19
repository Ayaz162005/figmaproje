import { useMutation } from "@tanstack/react-query";
import {
  forgotpassword,
  login,
  resetpassword,
  signup,
  updateUser,
} from "../actions/user";

export function SignUp() {
  return useMutation({
    mutationFn: signup,
  });
}

export function Login() {
  return useMutation({
    mutationFn: login,
  });
}
export function ResetPassword() {
  return useMutation({
    mutationFn: resetpassword,
  });
}
export function ForgotPassword() {
  return useMutation({
    mutationFn: forgotpassword,
  });
}

export function UpdateUser() {
  return useMutation({
    mutationFn: updateUser,
  });
}
