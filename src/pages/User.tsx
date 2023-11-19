import Button from "../components/Button";
import { useState, useEffect } from "react";
import DiscoverItem from "../components/DiscoverItem";
import {
  GetOneCreatorWithUserId,
  GetOneCreators,
} from "../libs/creatorQueries";
import { useParams } from "react-router-dom";
import { GetAllNftsClassic } from "../libs/nftsQueries";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { UpdateLike } from "../libs";

export default function User() {
  const [numberOfElements, setNumberOfElements] = useState(
    calculateNumberOfElements()
  );

  const { id } = useParams();
  const { isPending: isCretorPending, data: creator } = GetOneCreators(id!);
  const { isPending: isAllNftsPending, data: nfts } = GetAllNftsClassic();
  const { mutateAsync: updatelike } = UpdateLike();
  function handleCopy() {
    navigator.clipboard.writeText(creator.data.creator.chainId);

    toast.success("Copy success");
  }
  useEffect(() => {
    function handleResize() {
      setNumberOfElements(calculateNumberOfElements());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function calculateNumberOfElements() {
    return window.innerWidth < 768 ? 3 : window.innerWidth < 1280 ? 6 : 9;
  }
  const who = localStorage.getItem("id")!;
  const { data: creatoruserid } = GetOneCreatorWithUserId(who);
  console.log(creatoruserid, "cr");
  async function handleFollow() {
    try {
      const res = await updatelike({ who: id as string, whom: who });
      if (typeof res == "string") {
        return toast.error(res);
      }
      toast.success("change");
      console.log(res);
    } catch (error) {
      toast.error("error");
    }
  }

  const imgg = creator?.data?.creator?.profileImgPath?.split("/");
  const len = imgg?.length;
  return (
    <>
      {!isCretorPending ? (
        <main className="text-white bg-gray-700">
          <section>
            <div className="w-full">
              <img
                src="/images/mainuserpic.png"
                alt=""
                className="w-full h-[300px] object-cover"
              />
            </div>
            <div className=" xl:w-[1050px] mx-auto w-[350px] md:w-[650px] relative">
              <div className="absolute -top-[70px] border-2 cursor-pointer border-black rounded-full hover:scale-90 transition-['scale'] duration-300  left-1/2   translate-x-[-50%] md:left-auto md:translate-x-0">
                <img
                  src={`/backend/public/images/avatars/${imgg[len - 1]}`}
                  alt=""
                  className="w-[130px] "
                />
              </div>
              <div className="pt-20">
                <div className="xl:flex xl:justify-between xl:items-center">
                  <h3 className="md:text-5xl text-3xl">
                    {creator.data.creator.name}
                  </h3>
                  <div className="flex mt-8 xl:mt-0 gap-6 flex-col md:flex-row">
                    <Button
                      icon="/images/copy.svg"
                      size="bg-purple-500 py-4 px-6"
                      text={creator.data.creator.chainId}
                      onClick={handleCopy}
                    />
                    {creatoruserid?.data?.creator?._id == id || (
                      <Button
                        icon="/images/plus.svg"
                        size={`border border-purple-500 py-4 px-6 ${
                          creator.data.creator.followersIds?.includes(
                            creatoruserid?.data?.creator?._id
                          )
                            ? "bg-red-800"
                            : ""
                        }`}
                        text="Follow"
                        onClick={handleFollow}
                      />
                    )}
                  </div>
                </div>
                <div className="flex mt-8 justify-between md:w-[400px] w-[300px]">
                  <div>
                    <div className="text-2xl font-bold">
                      {creator.data.creator.volume > 1000
                        ? `${Math.floor(creator.data.creator.volume / 1000)}k`
                        : `${creator.data.creator.volume}`}
                      +
                    </div>
                    <div>Volume</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {creator.data.creator.nftSold > 1000
                        ? `${Math.floor(creator.data.creator.nftSold / 1000)}k`
                        : `${creator.data.creator.nftSold}`}
                      +
                    </div>
                    <div>NFTs Sold</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {creator.data.creator.followers}+
                    </div>
                    <div>Followers</div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-zinc-500">Bio</p>
                  <p>{creator.data.creator.bio}</p>
                </div>
                <div className="mt-4">
                  <p>Links</p>
                  <div className="flex gap-2 mt-2">
                    <a href="https://www.animaapp.com/" target="_blank">
                      <img src="/images/world.svg" alt="" />
                    </a>
                    <a href="https://www.animaapp.com/" target="_blank">
                      <img src="/images/discord-2.svg" alt="" />
                    </a>
                    <a href="https://www.animaapp.com/" target="_blank">
                      <img src="/images/youtube-2.svg" alt="" />
                    </a>
                    <a href="https://www.animaapp.com/" target="_blank">
                      <img src="/images/twitter-2.svg" alt="" />
                    </a>
                    <a href="https://www.animaapp.com/" target="_blank">
                      <img src="/images/instagram-2.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-4 h-[1px] border-none bg-slate-400  w-[330px] m-auto md:w-full " />
            <div className="flex gap-2 xl:w-[1000px] mx-auto w-[300px] md:w-[600px]">
              <div className="xl:w-[1000px] mx-auto w-[300px] md:w-[600px] relative pb-8 flex items-center justify-center border-b-2">
                <p className="text-xl">Created</p>
                <span className="bg-slate-300 rounded-3xl py- px-2 ml-3 hidden md:block">
                  302
                </span>
              </div>
              <div className="xl:w-[1000px] mx-auto w-[300px] md:w-[600px] relative pb-8 flex items-center justify-center ">
                <p className="text-xl text-gray-400">Owned</p>
                <span className="bg-slate-600 rounded-3xl py- px-2 ml-3 hidden md:block">
                  67
                </span>
              </div>
              <div className="xl:w-[1000px] mx-auto w-[300px] md:w-[600px] relative pb-8 flex items-center justify-center ">
                <p className="text-xl text-gray-400">Collection</p>
                <span className="bg-slate-600  rounded-3xl py- px-2 ml-3 hidden md:block">
                  4
                </span>
              </div>
            </div>
          </section>
          <section className="bg-stone-600 border-b border-black ">
            <div className="md:flex xl:w-[1000px] mx-auto py-10 xl:py-20 md:py-14 md:w-[600px] w-[330px] block">
              {!isAllNftsPending ? (
                <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
                  {nfts?.data?.allNfts
                    .filter((ele) => ele?.creatorId?._id == id)
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
              ) : (
                <Loader />
              )}
            </div>
          </section>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
}
