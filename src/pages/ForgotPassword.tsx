import { useForm } from "react-hook-form";
import Button from "../components/Button";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { ForgotPassword } from "../libs/authQueries";

export default function ForgotPasswordPage() {
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();
  const { mutateAsync: forgotpassword } = ForgotPassword();
  async function onSubmit(data) {
    try {
      const dat = await forgotpassword(data);

      if (typeof dat == "string") {
        return toast.error(dat);
      }
      toast.success(`email send correctly`);
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
              Forgot Password
            </h3>
            <p className="xl:text-2xl w-full md:text-xl text-md">Add email</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
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

            <Button
              type="submit"
              text="Send"
              size={`py-3 w-[330px] bg-purple-500 `}
            />
          </form>
        </div>
      </div>
    </main>
  );
}
