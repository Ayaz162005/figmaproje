import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";
import { UpdateUser } from "../libs/authQueries";
import toast from "react-hot-toast";

export default function Me() {
  const { user } = useAuth();
  console.log(user?.username);
  const { mutateAsync: update, isPending: isUpdatePending } = UpdateUser();
  const { register, formState, handleSubmit, getValues, reset, setValue } =
    useForm({
      defaultValues: {
        username: user?.username,
      },
    });
  const {
    register: register2,
    formState: formState2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    getValues: getValues2,
  } = useForm({
    defaultValues: {
      password: "",
      confirmpassword: "",
      newpassword: "",
    },
  });
  useEffect(() => {
    setValue("username", user?.username);
  }, [user?.username]);

  const { errors } = formState;
  const { errors: errors2 } = formState2;
  async function onSubmit2(data) {
    try {
      console.log(data);
      const dat = {
        email: user!.email,
        password: data.password,
        passwordconfirm: data.confirmpassword,
        newpassword: data.newpassword,
      };
      const res = await update(dat);
      console.log(res, "res");
      if (typeof res == "string") {
        return toast.error(res);
      }
      toast.success("update");
      reset();
      setTimeout(() => {
        location.reload();
      }, 800);
    } catch (error) {
      console.log(error);
    }
  }
  async function onSubmit(data) {
    try {
      const dat = {
        email: user!.email,
        username: data.username,
      };
      const res = await update(dat);
      toast.success("update");
      reset();
      setTimeout(() => {
        location.reload();
      }, 800);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="px-8">
      <h2>Change Username</h2>
      <form id="form-1" onSubmit={handleSubmit(onSubmit)} className="mb-4">
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
        <Button text="Change" size="bg-purple-500 w-full py-3" type="submit" />
      </form>

      <form
        id="form-2"
        className="mt-20 mb-8"
        onSubmit={handleSubmit2(onSubmit2)}
      >
        <div>
          <h2>Change password</h2>
          <label htmlFor="password" className="relative">
            <input
              id="password"
              type="password"
              className="p-3 rounded-3xl outline-none text-black pl-14 w-[330px]"
              {...register2("password", {
                required: "Required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "invalid password must be digit and character ",
                },
              })}
              placeholder="Password"
            />
            {errors2.password && (
              <div
                className="text-red-500 
                mb-2 h-[1px]"
              >
                {errors2.password.message}{" "}
              </div>
            )}
            <img
              src="/images/kilid.svg"
              alt=""
              className={`relative top-[-33px] block bg-white -right-5   ${
                errors2.password ? "top-[-42px]" : ""
              }`}
            />
          </label>
          <label htmlFor="passwordconfirm" className="relative">
            <input
              id="passwordconfirm"
              type="password"
              className="p-3 rounded-3xl outline-none text-black pl-14 w-[330px]"
              {...register2("confirmpassword", {
                required: "Required",
                validate: (value) => {
                  return (
                    value === getValues2("password") ||
                    "Confirm email and email is not same"
                  );
                },
              })}
              placeholder="Confirm Password"
            />
            {errors2.confirmpassword && (
              <div
                className="text-red-500 
                mb-2 h-[1px]"
              >
                {errors2.confirmpassword.message}{" "}
              </div>
            )}
            <img
              src="/images/kilid.svg"
              alt=""
              className={`relative top-[-33px] block  bg-white -right-5   ${
                errors2.confirmpassword ? "top-[-42px]" : ""
              }`}
            />
          </label>
          <label htmlFor="password" className="relative">
            <input
              id="newpassword"
              type="password"
              className="p-3 rounded-3xl outline-none text-black pl-14 w-[330px]"
              {...register2("newpassword", {
                required: "Required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "invalid password must be digit and character ",
                },
              })}
              placeholder="Newpassword"
            />
            {errors2.newpassword && (
              <div
                className="text-red-500 
                mb-2 h-[1px]"
              >
                {errors2.newpassword.message}{" "}
              </div>
            )}
            <img
              src="/images/kilid.svg"
              alt=""
              className={`relative top-[-33px] block bg-white -right-5   ${
                errors2.newpassword ? "top-[-42px]" : ""
              }`}
            />
          </label>
          <Button text="Change" size="bg-purple-500 w-full py-3" />
        </div>
      </form>
    </div>
  );
}
