import { Link } from "react-router-dom";
import Button from "../Button";

import { useState } from "react";
import toast from "react-hot-toast";
import { sendEmail } from "../../actions/sendEmail";
const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Footer() {
  const [val, setVal] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    if (regex.test(val)) {
      toast.success("You coin");
      await sendEmail(val);
      setVal("");
    } else {
      toast.error("Wrong email");
    }
  }
  return (
    <section className="bg-stone-600   p-10  text-white ">
      <div className="xl:flex xl:justify-between flex flex-col xl:flex-row m-auto xl:w-[1000px] md:w-[600px] w-[300px] ">
        <div>
          <Link to="/" className="flex gap-2 cursor-pointer">
            <img src="/images/navbarlogo.svg" alt="logo" />
            NFT Marketplace
          </Link>
          <div className="mt-6">
            NFT marketplace UI created with Anima for Figma.
          </div>
          <div className="mt-4">
            <p className="mb-2"> Join our community</p>
            <ul className="flex gap-4">
              <li className="cursor-pointer">
                <a href="https://discord.com/" target="_blank">
                  <img src="/images/discord.svg" alt="" />
                </a>
              </li>
              <li className="cursor-pointer">
                <a href="https://www.youtube.com/" target="_blank">
                  <img src="/images/youtube.svg" alt="" />
                </a>
              </li>
              <li className="cursor-pointer">
                <a href="https://twitter.com/" target="_blank">
                  <img src="/images/twitter.svg" alt="" />
                </a>
              </li>
              <li className="cursor-pointer">
                <a href="https://www.instagram.com/" target="_blank">
                  <img src="/images/instagram.svg" alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="text-2xl mb-2 mt-4 xl:mt-0">Explore</div>
          <div className="flex  flex-col gap-3">
            <Link to="marketplace" className="w-[30px]">
              Marketplace
            </Link>
            <Link to="rankings" className="w-[30px]">
              Rankings
            </Link>
            <Link to="connect" className="w-[120px]">
              Connect a wallet
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-2xl mb-3 mt-4 md:mt-4">Join Our Weekly Digest</h2>
          <p className="text-md mb-2">
            Get exclusive promotion & updates straight to your inbox.
          </p>
          <form onSubmit={handleSubmit}>
            <label className="relative">
              <input
                value={val}
                onChange={(e) => setVal(e.target.value)}
                type="email"
                className="xl:w-full 
md:w-[500px]    w-[250px]           
              rounded-3xl md:py-5
py-3 mb-2 md:mb-0                 px-3 text-black outline-none
              

              "
                placeholder="Enter your email here"
              />
              <Button
                size="bg-purple-500  my-4 md:my-0 md:absolute md:w-[200px]  md:h-[64px] h-[48px] right-0 top-[-21px] rounded-3xl block 
              w-[250px] "
                text="Subscribe"
              />
            </label>
          </form>
        </div>{" "}
      </div>{" "}
      <div className=" m-auto xl:w-[1000px] md:w-[600px] w-[300px]">
        <hr className="mt-8" />
        <p>Ⓒ NFT Market. Use this template freely.</p>
      </div>
    </section>
  );
}
