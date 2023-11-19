import { Link } from "react-router-dom";

export default function Personline({
  number,
  img,
  volume,
  nft,
  name,
  to,
}: {
  number: number;
  img: string;
  volume: string;
  nft: string;
  name: string;
  to: string;
}) {
  const imgg = img.split("/");
  const len = imgg.length;

  return (
    <Link
      to={`/user/${to}`}
      className="flex justify-between bg-stone-600 rounded-3xl py-3 xl:px-8 px-4 items-center cursor-pointer mb-4"
    >
      <p className="xl:mr-6 md:mr-2 mr-0 xl:bg-gray-900 rounded-full md:bg-inherit flex items-center justify-center w-8 h-8">
        {number}
      </p>
      <div className="flex-1 flex md:gap-4  gap-2 items-center hover:scale-95 transition-all duration-300 ">
        <img
          src={`/backend/public/images/avatars/${imgg[len - 1]}`}
          alt=""
          className="xl:w-[60px] w-[30px] group"
        />
        <p className="xl:text-3xl font-semibold md:text-xl text-sm ">{name}</p>
      </div>
      <p className="xl:px-[55px] px-[32px] text-green-600 hidden md:block">
        +1.41%
      </p>
      <p className="xl:px-[55px] px-[33px] hidden xl:block">{nft}</p>
      <p className="xl:px-[55px] md:px-[39px] pr-4">{volume}</p>
    </Link>
  );
}
