import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    toast.success("Logout");
    localStorage.clear();
    navigate("/");
    setTimeout(() => location.reload(), 800);
  }
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div className="flex justify-between px-6 py-4 text-white bg-black items-center text-[18px]">
      <Link to="/" className="flex gap-2 cursor-pointer">
        <img src="/images/navbarlogo.svg" alt="logo" />
        NFT Marketplace
      </Link>
      <div className="xl:hidden" onClick={() => setOpen(true)}>
        <img src="/images/navbarres.svg" alt="sd" className="cursor-pointer" />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="sidebar"
            ref={ref}
            className="fixed h-[100vh] top-0 w-52 bg-stone-800 right-0 z-50  flex flex-col items-center py-8 space-y-8"
            initial={{ right: -250 }}
            animate={{ right: 0 }}
            exit={{ right: -250 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => {
              if (!open) {
                // Remove the motion.div from the DOM after exit animation
                ref.current?.remove();
              }
            }}
          >
            <button
              className="absolute top-4 right-8 text-red-600 text-xl"
              onClick={() => setOpen(false)}
            >
              X
            </button>
            <Link to={"/marketplace"} className="hover:scale-90 transition-all">
              Marketplace
            </Link>
            <Link to={"/rankings"} className="hover:scale-90 transition-all">
              Rankings
            </Link>
            <Link to={"/wallet"} className="hover:scale-90 transition-all">
              Connect a wallet
            </Link>
            {!isAuthenticated ? (
              <Link
                to={"/signUp"}
                className="bg-purple-500  rounded-2xl px-8 py-4 hover:scale-90 transition-all flex gap-2"
              >
                <img src="/images/logouser.svg" alt="" />
                Sign Up
              </Link>
            ) : (
              <>
                <button
                  className="bg-purple-500  rounded-2xl px-8 py-4 hover:scale-90 transition-all flex gap-2 items-center"
                  onClick={handleLogout}
                >
                  <img src="/images/logout.svg" alt="" width={"18px"} />
                  Logout
                </button>
                <Link
                  to={"/mepage"}
                  className="bg-teal-600 rounded-3xl px-12 py-3"
                >
                  {user?.username}
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="xl:flex gap-12 items-center hidden ">
        <Link to={"/marketplace"} className="hover:scale-90 transition-all">
          Marketplace
        </Link>
        <Link to={"/rankings"} className="hover:scale-90 transition-all">
          Rankings
        </Link>
        <Link to={"/wallet"} className="hover:scale-90 transition-all">
          Connect a wallet
        </Link>
        {!isAuthenticated ? (
          <Link
            to={"/signUp"}
            className="bg-purple-500  rounded-2xl px-8 py-4 hover:scale-90 transition-all flex gap-2"
          >
            <img src="/images/logouser.svg" alt="" />
            Sign Up
          </Link>
        ) : (
          <>
            <button
              className="bg-purple-500  rounded-2xl px-8 py-4 hover:scale-90 transition-all flex gap-2 items-center"
              onClick={handleLogout}
            >
              <img src="/images/logout.svg" alt="" width={"18px"} />
              Logout
            </button>
            <Link to={"/mepage"} className="bg-teal-600 rounded-3xl px-12 py-3">
              {user?.username}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
