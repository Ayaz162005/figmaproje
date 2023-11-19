import { useForm } from "react-hook-form";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { Login, ResetPassword } from "../libs/authQueries";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ResetPage() {
  const { register, formState, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });
  const { mutateAsync: resetpassword } = ResetPassword();
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const dat = { data, id };
      const res = await resetpassword(dat);
      console.log(res);

      if (typeof res == "string") {
        return toast.error(res);
      }
      toast.success("resetpassword");
      reset();
    } catch (error) {
      console.log(error);
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
              Reset password
            </h3>
            <p className="xl:text-2xl w-full md:text-xl text-md">
              Welcome! enter your details and reset password
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
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
                {...register("passwordConfirm", {
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
              {errors.passwordConfirm && (
                <div
                  className="text-red-500 
                mb-2 h-[1px]"
                >
                  {errors.passwordConfirm.message}{" "}
                </div>
              )}
              <img
                src="/images/kilid.svg"
                alt=""
                className={`relative top-[-33px] block  bg-white -right-5   ${
                  errors.passwordConfirm ? "top-[-42px]" : ""
                }`}
              />
            </label>
            <Button
              type="submit"
              text="Reset"
              size={`py-3 w-[330px]   bg-purple-500 
              `}
            />
          </form>
        </div>
      </div>
    </main>
  );
}
