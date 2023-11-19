export default function TrendingCollection() {
  return (
    <section className="m-auto xl:w-[1000px] md:w-[600px] w-[300px] mt-20">
      <div>
        <h3 className="font-semibold text-2xl xl:text-3xl mb-2">
          Trending Collection
        </h3>
        <p className="xl:text-2xl w-full text-xl">
          Checkout Our Weekly Uploaded Trending Collection.
        </p>
      </div>
      <div className="flex gap-6 my-16">
        <div>
          <div className="mb-4 hover:scale-95 transition-all duration-500 cursor-pointer">
            <img src="/images/dog-1.png" alt="dog-1" width="100%" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="hover:scale-95 transition-all duration-500 cursor-pointer">
              <img src="/images/dog-2.png" alt="dog-2" />
            </div>
            <div className="hover:scale-95 transition-all duration-500 cursor-pointer ">
              <img src="/images/dog-3.png" alt="dog-3" />
            </div>
            <div className="hover:scale-95 transition-all duration-500 cursor-pointer ">
              <button className="flex justify-center items-center bg-purple-500 w-full h-full rounded-xl text-xl font-bold">
                1025+
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xl mt-2 mb-2">Dsgn Animals</h3>
            <div className="flex items-center gap-4">
              <img
                src="/images/dog-4.png"
                alt=""
                width={"25px"}
                className="cursor-pointer"
              />
              <p>MrFox</p>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div>
            <div className="mb-4 hover:scale-95 transition-all duration-500 cursor-pointer">
              <img src="/images/mushroom-1.png" alt="dog-1" width="100%" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="hover:scale-95 transition-all duration-500 cursor-pointer">
                <img src="/images/mushroom-2.png" alt="dog-2" />
              </div>
              <div className="hover:scale-95 transition-all duration-500 cursor-pointer">
                <img src="/images/mushroom-3.png" alt="dog-3" />
              </div>
              <div className="hover:scale-95 transition-all duration-500 cursor-pointer">
                <button className="flex justify-center items-center bg-purple-500 w-full h-full rounded-xl text-xl font-bold">
                  1025+
                </button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xl mt-2 mb-2">Magic Mushrooms</h3>
            <div className="flex items-center gap-4">
              <img
                src="/images/mushroom-4.png"
                alt=""
                width={"25px"}
                className="cursor-pointer"
              />
              <p>Shroomie</p>
            </div>
          </div>
        </div>
        <div className="hidden xl:block">
          <div>
            <div className="mb-4 hover:scale-95 transition-all duration-500 cursor-pointer">
              <img src="/images/robot-1.png" alt="dog-1" width="100%" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="hover:scale-95 transition-all duration-500 cursor-pointer">
                <img src="/images/robot-2.png" alt="dog-2" />
              </div>
              <div className="hover:scale-95 transition-all duration-500 cursor-pointer">
                <img src="/images/robot-3.png" alt="dog-3" />
              </div>
              <div className="hover:scale-95 transition-all duration-500 cursor-pointer">
                <button className="flex justify-center items-center bg-purple-500 w-full h-full rounded-xl text-xl font-bold">
                  1025+
                </button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xl mt-2 mb-2">Disco Machines</h3>
            <div className="flex items-center gap-4">
              <img
                src="/images/robot-4.png"
                alt=""
                width={"25px"}
                className="cursor-pointer"
              />
              <p>BeKind2Robots</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
