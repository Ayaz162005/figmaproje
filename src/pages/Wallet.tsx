export default function SignPage() {
  return (
    <main className="text-white bg-gray-700">
      <div className="flex xl:pt-10 gap-[60px] md:flex-row flex-col pb-8 md:pb-0">
        <img
          src="/images/wallet.png"
          alt="signimage"
          className="object-cover  xl:h-[691px] xl:w-full md:h-[615px] h-[260px] md:w-[247px] md:flex-1 "
        />

        <div className="md:w-1/2 my-auto w-[330px] mx-auto ">
          <div
            className="xl:w-[450px] mb-10 md:w-[350px]
          "
          >
            <h3 className="font-semibold text-4xl xl:text-5xl mb-2 ">
              Create Wallet
            </h3>
            <p className="xl:text-2xl w-full md:text-xl text-md ">
              Choose a wallet you want to connect. There are several wallet
              providers.
            </p>
          </div>

          <div>
            <button className="flex gap-6 items-center text-2xl px-12  w-[330px] bg-stone-600 py-4 border-2 border-purple-600  rounded-3xl hover:scale-95 transition-all duration-300 mb-4">
              <img src="/images/metamask.svg" alt="" />
              Metamask
            </button>
            <button className="flex gap-6 items-center text-2xl px-12  w-[330px] bg-stone-600 py-4 border-2 border-purple-600  rounded-3xl hover:scale-95 transition-all duration-300 mb-4">
              <img src="/images/walletconnect.svg" alt="" />
              Wallet Connect
            </button>
            <button className="flex gap-6 items-center text-2xl px-12  w-[330px] bg-stone-600 py-4 border-2 border-purple-600  rounded-3xl hover:scale-95 transition-all duration-300">
              <img src="/images/coinbase.svg" alt="" />
              Coinbase
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
