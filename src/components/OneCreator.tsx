import { Link } from "react-router-dom";

export default function OneCreator({
  image,
  name,
  p,
  num,
  to,
}: {
  image: string;
  name: string;
  p: string;
  num?: number;
  to: string;
}) {
  const imgg = image.split("/");
  const len = imgg.length;
  return (
    <Link
      to={`/user/${to}`}
      className="bg-slate-600 rounded-2xl relative xl:text-center py-4 hover:scale-95 transition-all duration-300 cursor-pointer flex xl:block gap-3"
    >
      <div className="xl:w-full w-[60px]  ml-4 xl:ml-0">
        <img
          src={`/backend/public/images/avatars/${imgg[len - 1]}`}
          alt=""
          className="m-auto"
        />
      </div>
      <div>
        <h2 className="text-xl">{name}</h2>
        <p>
          <span className="text-gray-500 mr-2">Total Sales:</span> {p}
        </p>
      </div>
      {num ? (
        <div className="absolute top-2 left-2 bg-slate-800 text-slate-400 rounded-full flex justify-center items-center w-[30px] h-[30px]">
          {num}
        </div>
      ) : (
        ""
      )}
    </Link>
  );
}
