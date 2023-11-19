import { useState, useEffect } from "react";
import DiscoverItem from "../components/DiscoverItem";
import { GetAllNfts } from "../libs/nftsQueries";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import { Fragment } from "react";
export default function Marketplace() {
  const [data, setData] = useSearchParams();
  const {
    isPending: getAllnftsPending,
    data: nfts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = GetAllNfts();

  const [numberOfElements, setNumberOfElements] = useState(
    calculateNumberOfElements()
  );
  const [da, setDa] = useState([]);
  useEffect(() => {
    if (data.get("name")) {
      setDa(
        nfts?.pages
          .flatMap((page) => page.data.allNfts)
          .filter((ele) => ele.name.includes(data.get("name"))) || []
      );
    } else {
      setDa(nfts?.pages.flatMap((page) => page.data.allNfts) || []);
    }
  }, [nfts, data]);
  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams(data);
    params.set("name", name);

    setData(params.toString());
    setName("");
  }
  const [name, setName] = useState("");
  useEffect(() => {
    function handleResize() {
      setNumberOfElements(calculateNumberOfElements());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (!data.get("type")) {
      const params = new URLSearchParams(data);
      params.set("type", "nfts");

      setData(params.toString());
    }
  }, [data, setData]);
  function calculateNumberOfElements() {
    return window.innerWidth < 768 ? 5 : window.innerWidth < 1280 ? 8 : 22;
  }
  return (
    <main className="text-white bg-gray-700">
      <section className="xl:w-[1000px] mx-auto w-[330px] py-10 xl:py-20 md:py-14 md:w-[600px] block ">
        <div>
          <h2 className="xl:text-5xl font-semibold mb-4 md:text-4xl text-2xl">
            Browse Marketplace
          </h2>
          <p className="xl:text-xl text-md">
            Browse through more than 50k NFTs on the NFT Marketplace.
          </p>
          <form onSubmit={handleSubmit}>
            <label className="relative ">
              <input
                type="text"
                placeholder="Search your favourite NFTs"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-4 rounded-3xl w-full bg-inherit outline-none
              border px-4 border-stone-600 text-[#858584] placeholder:text-[#858584] pr-20 mt-4"
              />
              <img
                src="/images/search.svg"
                alt=""
                className="absolute right-0 -top-4 block  py-4 px-8 rounded-3xl"
              />
            </label>
          </form>
        </div>
      </section>
      <hr className="my-4 h-[1px] border-none bg-slate-400 w-[330px] m-auto md:w-full" />
      <div className="flex gap-2 xl:w-[1000px] mx-auto w-[300px] md:w-[600px]">
        <div
          className={`xl:w-[1000px] mx-auto w-[300px] md:w-[600px] relative pb-8 flex items-center justify-center transition-all duration-300 flex-col 
          
     ${data.get("type") == "nfts" ? "after:w-full " : ""} cursor-pointer   
     after:block after:m-auto after:w-0 after:h-[2px] after:bg-blue-700 after:transition-all after:duration-300
     after:mt-8 
     
     `}
          onClick={() => setData({ type: "nfts" })}
        >
          <div className="flex items-center">
            <p className="text-xl">Nfts</p>
            <span
              className={`${
                data.get("type") == "nfts"
                  ? "bg-slate-200 text-black"
                  : "bg-slate-600"
              } rounded-3xl py- px-2 ml-3 hidden md:block `}
            >
              {da.length}
            </span>
          </div>
        </div>
        <div
          className={`xl:w-[1000px] mx-auto w-[300px] md:w-[600px] relative pb-8 flex items-center justify-center transition-all duration-300 flex-col 
     ${
       data.get("type") == "collection" ? "after:w-full " : ""
     } cursor-pointer   
     after:block after:m-auto after:w-0 after:h-[2px] after:bg-blue-700 after:transition-all after:duration-300
     after:mt-8
     
     `}
          onClick={() => setData({ type: "collection" })}
        >
          <div className="flex items-center">
            <p className="text-xl">Collection</p>
            <span
              className={`${
                data.get("type") == "collection"
                  ? "bg-slate-200 text-black"
                  : "bg-slate-600"
              } rounded-3xl py- px-2 ml-3 hidden md:block `}
            >
              67
            </span>
          </div>
        </div>
      </div>
      <section className="bg-stone-600 border-b border-black">
        <div className="xl:w-[1000px] mx-auto py-10 xl:py-20 md:py-14 md:w-[600px] w-[330px] block ">
          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
            {/* {nfts?.pages.map((group, i) => {
              return (
                <Fragment key={i}>
                  {group?.data?.allNfts?.map((i, index) => {
                    return (
                      <DiscoverItem
                        key={index}
                        name={i.name}
                        img={i.imgPath}
                        price={`${i.price?.value} ${i.price?.currency}`}
                        userimg={i.creatorId?.profileImgPath}
                        username={i.creatorId?.name}
                        bid={`${i.highestBid?.value} ${i.highestBid?.currency}`}
                      />
                    );
                  })}
                </Fragment>
              );
            })} */}
            {da?.map((i, index) => {
              return (
                <DiscoverItem
                  key={index}
                  name={i.name}
                  img={i.imgPath}
                  price={`${i.price?.value} ${i.price?.currency}`}
                  userimg={i.creatorId?.profileImgPath}
                  username={i.creatorId?.name}
                  bid={`${i.highestBid?.value} ${i.highestBid?.currency}`}
                />
              );
            })}
          </div>
          {!data.get("name") ? (
            <Button
              text={`${isFetchingNextPage ? "Fetching..." : "More"}`}
              size={`${
                hasNextPage ? "bg-purple-500" : "bg-gray-500"
              } w-[330px] mx-auto py-3 px-2 mt-4`}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage}
            />
          ) : (
            ""
          )}
        </div>
      </section>
    </main>
  );
}
