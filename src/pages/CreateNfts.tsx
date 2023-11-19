import { useForm } from "react-hook-form";
import Button from "../components/Button";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { CreateNewNft, GetAllNftsClassic } from "../libs/nftsQueries";
import DiscoverItem from "../components/DiscoverItem";
import { useAuth } from "../context/AuthProvider";

import { GetOneCreatorWithUserId } from "../libs/creatorQueries";

export default function CreateNfts() {
  const { mutateAsync: create, isPending } = CreateNewNft();
  const { user } = useAuth();

  const { data: creator } = GetOneCreatorWithUserId(user?._id);
  console.log(creator);
  const { data: nfts, isPending: isNFTSPending } = GetAllNftsClassic();
  const navigate = useNavigate();
  const { register, formState, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      name: "",

      price: "",
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
      form.append("name", data.name);
      form.append("price", data.price);
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
        <div className=" my-auto mx-auto ">
          <div
            className="
        "
          >
            <h3 className="font-semibold text-4xl xl:text-5xl mb-2 ">
              Create Nft
            </h3>
            <p className="xl:text-2xl w-full md:text-xl text-md">
              Welcome! enter your details and create your nft
            </p>
          </div>

          <form className="mb-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              id="name"
              type="text"
              className="p-3 rounded-3xl outline-none text-black pl-4 w-[330px] "
              {...register("name", {
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
              placeholder="Name"
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
              {...register("price", {
                required: "Required",
              })}
              placeholder="price"
            />
            <Button
              text="Create"
              size="bg-purple-500 py-4 w-[330px] mt-2 m-auto"
            />
          </form>
        </div>
      </div>
      <div className="space-y-4">
        {nfts?.data?.allNfts
          .filter((ele) => ele?.creatorId?._id == creator?.data.creator._id)
          .map((item, i) => {
            console.log(item.price.value);
            return (
              <DiscoverItem
                key={i}
                name={item.name}
                price={`${item.price?.value} ${item.price?.currency}`}
                bid={`${item.highestBid?.value} ${item.highestBid?.currency}`}
                userimg={`/${item.creatorId.profileImgPath}`}
                username={item.creatorId.name}
                img={`/${item.imgPath}`}
              />
            );
          })}
      </div>
    </main>
  );
}
