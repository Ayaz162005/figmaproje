import { useState } from "react";
import Button from "../Button";
import toast from "react-hot-toast";
import { sendEmail } from "../../actions/sendEmail";

const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Join() {
  const [email, setEmail] = useState("");
  async function handleClick(e) {
    e.preventDefault();
    if (regex.test(email)) {
      toast.success("valid email");
      await sendEmail(email);
      setEmail("");
    } else {
      toast.error("invalid email");
    }

    console.log("dfdfdf");
  }
  return (
    <section className="m-auto xl:w-[1000px] md:w-[600px] w-[300px] mt-20 pb-8">
      <div className="md:bg-stone-600 xl:py-26 md:py-8 py-0 flex flex-col md:flex-row items-center md:px-8 px-0 gap-8 rounded-3xl">
        <div
          className="xl:w-1/2 w-full bg-cover h-[300px] overflow-hidden rounded-3xl"
          style={{ backgroundImage: 'url("/images/join.png")' }}
        ></div>
        <div className="xl:w-1/2 w-full ">
          <h2 className="font-bold xl:text-5xl text-3xl mb-4">
            Join Our Weekly Digest
          </h2>
          <p className="xl:text-3xl xl:mb-14 mb-2 text-md">
            Get exclusive promotions & updates straight to your inbox.
          </p>
          <form action="" onSubmit={handleClick}>
            <label className="relative">
              <input
                type="email"
                className="w-full rounded-3xl xl:py-5
                py-2 px-3 text-black outline-none
              focus:ring-1 focus:ring-offset-2
              focus:ring-black-500

              "
                placeholder="Enter your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                size="bg-purple-500  my-4 xl:my-0 xl:absolute xl:w-[200px] w-full xl:h-[64px] h-[42px] xl:right-0 xl:top-[-21px] rounded-3xl"
                text="Subscribe"
                icon="/images/messagebox.svg"
              />
            </label>
          </form>
        </div>
      </div>
    </section>
  );
}
