import Button from "../components/Button";
import BigMushroom from "../components/homepage/BigMushroom";
import BrowseCategories from "../components/homepage/BrowseCategories";
import DiscoverNfts from "../components/homepage/DiscoverNfts";

import HowWork from "../components/homepage/HowWork";
import Join from "../components/homepage/Join";
import TopCreators from "../components/homepage/TopCreators";
import TrendingCollection from "../components/homepage/TrendingCollection";

export default function Homepage() {
  return (
    <main className="text-white bg-gray-700">
      <section className="md:flex xl:w-[1000px] mx-auto py-10 xl:py-20 md:py-14 md:w-[600px] block ">
        <div className="xl:w-[1000px] md:w-[50%] flex-grow m-auto w-[300px]">
          <h1 className="xl:text-6xl font-bold mb-4 xl:leading-tight xl:w-[380px] md:text-[2rem] text-2xl">
            Discover Digital Art & Collect NFTs
          </h1>
          <p className="xl:text-xl xl:w-[400px] text-md w-[300px]">
            NFT marketplace UI created with Anima for Figma. Collect, buy and
            sell art from more than 20k NFT artists.
          </p>
          <div className="md:hidden block my-4">
            <img src="/images/heropic.gif" alt="heropicture" />
          </div>
          <Button
            icon={"/images/rocket.svg"}
            text="Get Started"
            size={"md:w-[220px] my-10 w-full bg-purple-500 py-4 "}
            to="/signup"
          />
          <div className="flex justify-between xl:w-[400px] xl:text-3xl text-md md:w-[250px] w-full">
            <div>
              <div className="font-bold">240k+</div>
              <div>Total Scale</div>
            </div>
            <div>
              <div className="font-bold">100k+</div>
              <div>Auctions</div>
            </div>
            <div>
              <div className="font-bold">240k+</div>
              <div>Artists</div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <img src="/images/heropic.gif" alt="heropicture" />
        </div>
      </section>
      <TrendingCollection />
      <TopCreators />
      <BrowseCategories />
      <DiscoverNfts />
      <BigMushroom />
      <HowWork />
      <Join />
    </main>
  );
}
