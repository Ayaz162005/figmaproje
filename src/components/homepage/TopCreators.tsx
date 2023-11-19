import { GetAllCreators } from "../../libs/creatorQueries";
import Button from "../Button";
import OneCreator from "../OneCreator";
import { useState, useEffect } from "react";

export default function TopCreators() {
  const { isPending: isGetAllCreators, data: creators } = GetAllCreators();
  console.log(creators);
  const [numberOfElements, setNumberOfElements] = useState(
    calculateNumberOfElements()
  );

  useEffect(() => {
    function handleResize() {
      setNumberOfElements(calculateNumberOfElements());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  function calculateNumberOfElements() {
    return window.innerWidth < 768 ? 5 : window.innerWidth < 1280 ? 6 : 12;
  }

  return (
    <section className="m-auto xl:w-[1000px] md:w-[600px] w-[300px] mt-20">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="font-semibold text-2xl xl:text-3xl mb-2 ">
            Top Creators
          </h3>
          <p className="xl:text-2xl w-full text-xl">
            Checkout Top Rated Creators on the NFT Marketplace
          </p>
        </div>
        <Button
          icon={"/images/rocket.svg"}
          text={"View Rankings"}
          size={
            "w-[220px] border border-purple-500 font-bold h-[50px] hidden md:flex"
          }
          to="/rankings"
        />
      </div>

      <div className="grid xl:grid-cols-4 gap-4 mt-8 md:grid-cols-2 grid-cols-1">
        {creators?.data?.allCreators
          .sort((a, b) => {
            return b.totalSale.value - a.totalSale.value;
          })
          .slice(0, numberOfElements)
          .map((i, index) => {
            return (
              <OneCreator
                key={index}
                image={i.profileImgPath}
                name={i.name}
                p={`${i.totalSale.value} ${i.totalSale.currency}`}
                num={index + 1}
                to={i._id}
              />
            );
          })}
      </div>

      <Button
        icon={"/images/rocket.svg"}
        text={"View Rankings"}
        size={
          " border border-purple-500 font-bold h-[50px] flex md:hidden mt-4 w-full"
        }
        to="/rankings"
      />
    </section>
  );
}
