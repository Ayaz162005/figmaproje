import { Link, Outlet } from "react-router-dom";

export default function Mepage() {
  return (
    <main className="text-white bg-gray-700">
      <section className=" flex">
        <div className="bg-white w-[200px]  text-black space-y-2 py-8 sticky h-screen z-10 top-0">
          <Link
            to={"me"}
            className="w-full block border cursor-pointer py-2 text-center"
          >
            me
          </Link>
          <Link
            to={"createCreator"}
            className="w-full border block cursor-pointer py-2 text-center"
          >
            creator
          </Link>
          <Link
            to={"createNft"}
            className="w-full border cursor-pointer py-2 text-center block"
          >
            nfts
          </Link>
        </div>
        <div className="flex justify-center items-center flex-1">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
