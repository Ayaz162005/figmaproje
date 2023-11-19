export default function DiscoverItem({
  name,
  img,
  userimg,
  username,
  price,
  bid,
}: {
  name: string;
  img: string;
  userimg: string;
  username: string;
  price: string;
  bid: string;
}) {
  const imgg = img.split("/");
  const len = imgg.length;
  const imgg2 = userimg.split("/");
  const len2 = imgg.length;

  return (
    <div className="hover:scale-95 transition-all duration-300 cursor-pointer rounded-3xl overflow-hidden">
      <div className=" h-[280px]  ">
        <img
          src={`/backend/public/images/nfts/${imgg[len - 1]}`}
          alt=""
          className="h-full w-full overflow-hidden"
          // width={"400px"}
          // height={"100px"}
        />
      </div>
      <div className="bg-stone-700 py-4 px-6 rounded-b-3xl">
        <h2 className="xl:text-2xl md:text-[22px] font-semibold">{name}</h2>
        <div className="flex gap-2 items-center my-2 ">
          <img
            src={`/backend/public/images/avatars/${imgg2[len2 - 1]}`}
            alt="moondancerphoto"
            width={"25px"}
          />
          <p>{username}</p>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-stone-400">price</p>
            <p>{price}</p>
          </div>
          <div>
            <p className="text-stone-400">Highest Bid</p>
            <p>{bid}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
