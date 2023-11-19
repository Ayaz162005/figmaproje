import { useForm } from "react-hook-form";
import Button from "../components/Button";

import { Link, useNavigate } from "react-router-dom";
import {
  CreateNewCreator,
  GetOneCreatorWithUserId,
} from "../libs/creatorQueries";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import OneCreator from "../components/OneCreator";

export default function CreateCreator() {
  const { user } = useAuth();
  const { mutateAsync: create, isPending } = CreateNewCreator();

  const { data: creator } = GetOneCreatorWithUserId(user?._id);
  console.log(creator);
  const navigate = useNavigate();
  const { register, formState, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      username: "",
      bio: "",
      file: File,
    },
  });
  const { errors } = formState;

  async function onSubmit(data) {
    try {
      const form = new FormData();
      const id = String(localStorage.getItem("id"));
      if (!id) {
        throw new Error("You must be logged in");
      }
      form.append("username", data.username);
      form.append("bio", data.bio);
      form.append("userId", id);
      form.append("photo", data.file[0]);

      const res = await create(form);
      // Handle the response if needed
      if (typeof res == "string") {
        return toast.error(res);
      }
      toast.success("success");
      reset();
      navigate("/");
    } catch (error) {
      // Handle the error here
      toast.error("Error");
      console.error("Error occurred:", error.message);
      // You can add further actions like showing an error message to the user
      // or performing a fallback action
    }
  }

  return (
    <main className="text-white bg-gray-700">
      <div className="flex   md:flex-row flex-col pb-8 md:pb-0 text-center">
        {!creator ? (
          <div className=" my-auto mx-auto ">
            <div
              className="
        "
            >
              <h3 className="font-semibold text-4xl xl:text-5xl mb-2 ">
                Create Creator
              </h3>
              <p className="xl:text-2xl w-full md:text-xl text-md">
                Welcome! enter your details and create your creator
              </p>
            </div>

            <form className="mb-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
              <input
                id="username"
                type="text"
                className="p-3 rounded-3xl outline-none text-black pl-4 w-[330px] "
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
              <input
                type="file"
                accept="images/*"
                className="block w-[330px] mx-auto mt-4 "
                {...register("file", {
                  required: "Required",
                })}
              />
              <input
                id="bio"
                type="text"
                className="p-3 rounded-3xl outline-none mt-4 text-black pl-4 w-[330px] "
                {...register("bio", {
                  required: "Required",
                })}
                placeholder="bio"
              />
              <Button
                text="Create"
                size="bg-purple-500 py-4 w-[330px] mt-2 m-auto"
              />
            </form>
          </div>
        ) : (
          <div>
            <OneCreator
              image={creator.data.creator.profileImgPath}
              name={creator.data.creator.name}
              p={`${creator.data.creator.totalSale.value} ${creator.data.creator.totalSale.currency}`}
              to={creator.data.creator._id}
            />
          </div>
        )}
      </div>
    </main>
  );
}
