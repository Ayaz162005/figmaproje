import { useState, useEffect } from "react";
import Personline from "../components/Personline";
import { GetAllCreators } from "../libs/creatorQueries";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";
export default function Rankings() {
  const [page, setPage] = useState(1);
  const [issmall, setIssmall] = useState(calculateIssmall());
  const [data, setData] = useSearchParams();

  const { data: check } = GetAllCreators();

  useEffect(() => {
    if (!data.get("when")) {
      setData({ when: "today" });
    }
  }, [data, setData]);

  const { isPending: isCreatorsPending, data: creators } = GetAllCreators(
    String(page)
  );
  console.log(creators);
  useEffect(() => {
    function handleResize() {
      setIssmall(calculateIssmall());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function calculateIssmall() {
    return window.innerWidth < 768 ? true : false;
  }
  return (
    <main className="text-white bg-gray-700">
      <section className="xl:w-[1000px] mx-auto w-[330px] py-10 xl:py-20 md:py-14 md:w-[600px] block ">
        <div>
          <h2 className="xl:text-5xl font-semibold mb-4 md:text-4xl text-2xl">
            Top Creators
          </h2>
          <p className="xl:text-xl text-md">
            Check out top ranking NFT artists on the NFT Marketplace.
          </p>
        </div>
      </section>

      <div className="flex gap-2 xl:w-[1000px] mx-auto w-[300px] md:w-[600px]">
        <div
          className={`xl:w-[1000px] mx-auto w-[300px] md:w-[600px] relative pb-8 flex items-center justify-center transition-all duration-300 flex-col 
     ${data.get("when") == "today" ? "after:w-full " : ""} cursor-pointer   
     after:block after:m-auto after:w-0 after:h-[2px] after:bg-blue-700 after:transition-all after:duration-300
     after:mt-8
     
     `}
          onClick={() => setData({ when: "today" })}
        >
          <p className="text-xl">{!issmall ? "Today" : "1d"}</p>
        </div>
        <div
          className={`xl:w-[1000px] mx-auto w-[300px] md:w-[600px] relative pb-8 flex items-center justify-center transition-all duration-300 flex-col 
           ${
             data.get("when") == "thisweek" ? "after:w-full " : ""
           } cursor-pointer   
           after:block after:m-auto after:w-0 after:h-[2px] after:bg-blue-700 after:transition-all after:duration-300
           after:mt-8
           
           `}
          onClick={() => setData({ when: "thisweek" })}
        >
          <p className="text-xl">{!issmall ? "This Week" : "7d"}</p>
        </div>
        <div
          className={`xl:w-[1000px] mx-auto w-[300px] md:w-[600px] relative pb-8 flex items-center justify-center transition-all duration-300 flex-col 
          ${
            data.get("when") == "thismonth" ? "after:w-full " : ""
          } cursor-pointer   
          after:block after:m-auto after:w-0 after:h-[2px] after:bg-blue-700 after:transition-all after:duration-300
          after:mt-8
          
          `}
          onClick={() => setData({ when: "thismonth" })}
        >
          <p className="text-xl">{!issmall ? "This Month" : "30d"}</p>
        </div>
        <div
          className={`xl:w-[1000px] mx-auto w-[300px] md:w-[600px] relative pb-8 flex items-center justify-center transition-all duration-300 flex-col 
          ${
            data.get("when") == "alltime" ? "after:w-full " : ""
          } cursor-pointer   
          after:block after:m-auto after:w-0 after:h-[2px] after:bg-blue-700 after:transition-all after:duration-300
          after:mt-8
          
          `}
          onClick={() => setData({ when: "alltime" })}
        >
          <p className="text-xl min-w-[80px] block">All Time</p>
        </div>
      </div>
      <section className="xl:w-[1000px] mx-auto w-[330px] py-5  md:w-[600px] block ">
        <div
          className="flex justify-between border rounded-3xl py-3 px-8 text-[#858584] border-[#858184]
        mb-8"
        >
          <p className="md:pr-6 pr-2">#</p>
          <p className="flex-1">Artist</p>
          <p className="xl:px-12 px-8 hidden md:block">Change</p>
          <p className="xl:px-12 px-8 hidden xl:block">NFTs Sold</p>
          <p className="xl:px-12 md:px-8 px-0">Volume</p>
        </div>

        <div>
          {creators?.data?.allCreators.map((i, index) => (
            <Personline
              number={(page - 1) * 10 + index + 1}
              img={i.profileImgPath}
              name={i.name}
              volume={`${i.totalSale.value} ${i.totalSale.currency}`}
              nft={i.nftSold}
              to={i._id}
            />
          ))}
          {/* <Personline /> */}
        </div>
        <div className="flex justify-between">
          <Button
            text={`prew ${page - 1}`}
            size={`${page === 1 ? "bg-gray-500" : "bg-purple-500"} px-6 py-1`}
            onClick={() =>
              setPage((e) => {
                return e - 1;
              })
            }
            disabled={page === 1}
          />

          <Button
            text={`next ${page + 1}`}
            size={`${
              check?.size < page * 10 ? "bg-gray-500" : "bg-purple-500"
            } px-6 py-1`}
            onClick={() =>
              setPage((e) => {
                return e + 1;
              })
            }
            disabled={check?.size <= page * 10}
          />
        </div>
      </section>
    </main>
  );
}
