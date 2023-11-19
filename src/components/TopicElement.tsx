import { Link } from "react-router-dom";

export default function TopicElement({
  image,
  logo,
  text,
}: {
  image: string;
  logo: string;
  text: string;
}) {
  return (
    <Link
      to={"/marketplace"}
      className="rounded-2xl overflow-hidden cursor-pointer hover:scale-95 transition-all duration-300"
    >
      <div className="relative">
        <div
          className={`flex items-center justify-center xl:h-56 h-36 bg-[url('${logo}')]

          blur-sm 
      `}
        ></div>
        <img
          src={`${logo}`}
          alt="art"
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] hover:scale-95 transition-all duration-300"
        />
      </div>
      <div className="bg-stone-700 py-4 px-2">{text}</div>
    </Link>
  );
}
