import Button from "../Button";

export default function BigMushroom() {
  return (
    <div
      className="mt-4 bg-cover bg-no-repeat w-full xl:h-[600px] h-[500px] md:h-[400px] relative"
      style={{ backgroundImage: 'url("/images/mushroom.png")' }}
    >
      {/* Your content goes here */}
      {/* <div className="bg-gradient-to-b from-transparent via-transparent to-purple-600 h-[1200px] absolute w-full bottom-0"></div> */}
      <div className="flex justify-between gap-8 items-end pb-10 h-full md:flex xl:w-[1000px] mx-auto py-10 xl:py-20 md:py-14 md:w-[600px]  w-[330px]  ">
        <div className="flex flex-col">
          <div className="flex gap-4 p-2 items-center  rounded-3xl w-40 bg-zinc-800 ">
            <img
              src="/images/miniperson.png"
              alt=""
              className="w-8 hover:scale-95 transition-all duration-300 cursor-pointer"
            />
            <p>Shroomie</p>
          </div>
          <h2 className="xl:text-4xl my-6 text-3xl w-[200px] md:w-full">
            Magic Mashrooms
          </h2>

          <div className="bg-[#3b3b3b80] px-8 py-6 rounded-2xl block md:hidden mb-4 md:mb-0">
            <h3>Auction ends in:</h3>
            <div
              className="flex justify-between text-4xl
          gap-4 px-2"
            >
              <div>23</div>
              <div>:</div>
              <div>48</div>
              <div>:</div>
              <div>35</div>
            </div>
            <div className="flex justify-between pl-2 mt-2">
              <div>Hours</div>
              <div>Minutes</div>
              <div>Seconds</div>
            </div>
          </div>
          <Button
            size="bg-white rounded-3xl py-4 px-12 text-black w-[190px]"
            text="See NFT "
            icon="/images/eye2.svg"
          />
        </div>

        <div className="bg-[#3b3b3b80] px-8 py-6 rounded-2xl hidden md:block">
          <h3>Auction ends in:</h3>
          <div
            className="flex justify-between text-4xl
          gap-4 px-2"
          >
            <div>23</div>
            <div>:</div>
            <div>48</div>
            <div>:</div>
            <div>35</div>
          </div>
          <div className="flex justify-between pl-2 mt-2">
            <div>Hours</div>
            <div>Minutes</div>
            <div>Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
}
