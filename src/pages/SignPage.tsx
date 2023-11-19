import { useForm } from "react-hook-form";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { SignUp } from "../libs/authQueries";
import { Link, useNavigate } from "react-router-dom";

export default function SignPage() {
  const { register, formState, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  const navigate = useNavigate();
  const { isPending: signupPending, mutateAsync: signup } = SignUp();
  async function onSubmit(data) {
    try {
      const dat = await signup(data);
      console.log(dat);
      if (typeof dat == "string") {
        return toast.error(dat);
      }
      toast.success(`${dat.data.user.username} signup`);
      reset();
      navigate("/");
      setTimeout(() => location.reload(), 800);
    } catch (error) {
      toast.error(`Error ${error}`);
    }
  }
  const { errors } = formState;
  return (
    <main className="text-white bg-gray-700">
      <div className="flex xl:pt-10 gap-[60px] md:flex-row flex-col pb-8 md:pb-0">
        <img
          src="/images/signimage.png"
          alt="signimage"
          className="object-cover  xl:h-[691px] xl:w-full md:h-[615px] h-[260px] md:w-[247px] md:flex-1 "
        />

        <div className="md:w-1/2 my-auto w-[330px] mx-auto ">
          <div
            className="xl:w-[450px] mb-10 md:w-[350px]
          "
          >
            <h3 className="font-semibold text-4xl xl:text-5xl mb-2 ">
              Create Account
            </h3>
            <p className="xl:text-2xl w-full md:text-xl text-md">
              Welcome! enter your details and start creating, collecting and
              selling NFTs.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <label htmlFor="username" className="relative ">
              <input
                id="username"
                type="text"
                className="p-3 rounded-3xl outline-none text-black pl-14 w-[330px]"
                {...register("username", {
                  required: "Required",
                  minLength: {
                    value: 4,
                    message: "Length must be min 4 character",
                  },
                  maxLength: {
                    value: 14,
                    message: "Length must be max 14 character",
                  },
                })}
                placeholder="Username"
              />
              {errors.username && (
                <div
                  className="text-red-500 
                mb-2 h-[1px]"
                >
                  {errors.username.message}{" "}
                </div>
              )}
              <img
                src="/images/personint.svg"
                alt=""
                className={`relative top-[-33px] block bg-white -right-5   ${
                  errors.username ? "top-[-42px]" : ""
                }`}
              />
            </label>
            <label htmlFor="email" className="relative">
              <input
                id="email"
                type="email"
                className="p-3 rounded-3xl outline-none text-black pl-14 w-[330px]"
                {...register("email", {
                  required: "Required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "invalid email address",
                  },
                })}
                placeholder="Email Address"
              />
              {errors.email && (
                <div
                  className="text-red-500 
                mb-2 h-[1px]"
                >
                  {errors.email.message}{" "}
                </div>
              )}
              <img
                src="/images/messageboxint.svg"
                alt=""
                className={`relative top-[-33px] block bg-white -right-5   ${
                  errors.email ? "top-[-42px]" : ""
                }`}
              />
            </label>
            <label htmlFor="password" className="relative">
              <input
                id="password"
                type="password"
                className="p-3 rounded-3xl outline-none text-black pl-14 w-[330px]"
                {...register("password", {
                  required: "Required",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "invalid password must be digit and character ",
                  },
                })}
                placeholder="Password"
              />
              {errors.password && (
                <div
                  className="text-red-500 
                mb-2 h-[1px]"
                >
                  {errors.password.message}{" "}
                </div>
              )}
              <img
                src="/images/kilid.svg"
                alt=""
                className={`relative top-[-33px] block bg-white -right-5   ${
                  errors.password ? "top-[-42px]" : ""
                }`}
              />
            </label>
            <label htmlFor="passwordconfirm" className="relative">
              <input
                id="passwordconfirm"
                type="password"
                className="p-3 rounded-3xl outline-none text-black pl-14 w-[330px]"
                {...register("confirmpassword", {
                  required: "Required",
                  validate: (value) => {
                    return (
                      value === getValues("password") ||
                      "Confirm email and email is not same"
                    );
                  },
                })}
                placeholder="Confirm Password"
              />
              {errors.confirmpassword && (
                <div
                  className="text-red-500 
                mb-2 h-[1px]"
                >
                  {errors.confirmpassword.message}{" "}
                </div>
              )}
              <img
                src="/images/kilid.svg"
                alt=""
                className={`relative top-[-33px] block  bg-white -right-5   ${
                  errors.confirmpassword ? "top-[-42px]" : ""
                }`}
              />
            </label>
            <Button
              type="submit"
              text="Create account"
              size={`py-3 w-[330px] ${
                signupPending ? "bg-gray-600" : "bg-purple-500 "
              }`}
              disabled={signupPending}
            />
          </form>
          <Link
            to="/login"
            className=" bg-purple-500 py-3 rounded-2xl text-center w-[330px] block"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
