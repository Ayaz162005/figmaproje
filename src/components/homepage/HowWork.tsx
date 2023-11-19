export default function HowWork() {
  return (
    <section className="m-auto xl:w-[1000px] md:w-[600px] w-[300px] mt-20">
      <div>
        <h3 className="font-semibold text-2xl xl:text-3xl mb-2">
          How It Works
        </h3>
        <p className="xl:text-2xl w-full text-xl">
          Find out how to get started
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 my-16 ">
        <div className="bg-stone-600 rounded-2xl text-center p-4 flex md:flex-col">
          <div className="mb-4 w-[700px] md:w-auto ">
            <img
              src="/images/work-1.svg"
              alt="work-1"
              className="mx-auto xl:w-96  "
            />
          </div>
          <div>
            <h2 className="xl:text-xl text-md mb-2 ">Setup Your wallet</h2>
            <p className="xl:text-md text-sm text-left md:text-center">
              Set up your wallet of choice. Connect it to the NFT market by
              clicking the wallet icon in the top right corner.
            </p>
          </div>
        </div>
        <div className="bg-stone-600 rounded-2xl text-center p-4 flex md:flex-col">
          <div className="mb-4 w-[700px] md:w-auto ">
            <img
              src="/images/work-2.svg"
              alt="work-1"
              className="mx-auto xl:w-full  "
            />
          </div>
          <div>
            <h2 className="xl:text-xl mb-2 text-md">Create Collection</h2>
            <p className="text-sm xl:text-md text-left md:text-center">
              Upload your work and setup your collection. Add a description,
              social links and floor priceeeeeeeeeeee.
            </p>
          </div>
        </div>

        <div className="bg-stone-600 rounded-2xl text-center p-4 flex md:flex-col">
          <div className="mb-4 w-[700px] md:w-auto">
            <img
              src="/images/work-3.svg"
              alt="dog-1"
              className="mx-auto xl:w-96"
            />
          </div>
          <div>
            <h2 className="xl:text-xl mb-2 text-md">Start Earning</h2>
            <p className="text-sm xl:text-md text-left md:text-center">
              Choose between auctions and fixed-price listings. Start earning by
              selling your NFTs or trading others.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
