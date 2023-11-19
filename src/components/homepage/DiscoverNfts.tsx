import { GetAllNfts } from "../../libs/nftsQueries";
import Button from "../Button";
import DiscoverItem from "../DiscoverItem";

export default function DiscoverNfts() {
  const { isPending: isAllNftsPending, data: nfts } = GetAllNfts();
  console.log(nfts?.pages[0]);
  return (
    <section className="m-auto xl:w-[1000px] md:w-[600px] w-[300px] mt-20">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="font-semibold text-2xl xl:text-3xl mb-2 ">
            Discover More Nfts
          </h3>
          <p className="xl:text-2xl w-full text-xl">
            Explore new trending NFTs
          </p>
        </div>
        <Button
          icon={"/images/eye.svg"}
          text={"See All"}
          size={
            "w-[220px] border border-purple-500 font-bold h-[50px] hidden md:flex"
          }
          to="/marketplace"
        />
      </div>
      {!isAllNftsPending ? (
        <div className="flex gap-4 mt-4">
          <DiscoverItem
            name={nfts?.pages[0].data?.allNfts[0].name}
            img={nfts?.pages[0].data?.allNfts[0].imgPath}
            userimg={nfts?.pages[0].data?.allNfts[0].creatorId.profileImgPath}
            username={nfts?.pages[0].data?.allNfts[0].creatorId.name}
            price={`${nfts?.pages[0].data?.allNfts[0].price.value} ${nfts?.pages[0].data?.allNfts[0].price.currency}`}
            bid={`${nfts?.pages[0].data?.allNfts[0].highestBid.value} ${nfts?.pages[0].data?.allNfts[0].highestBid.currency}`}
          />
          <span className="hidden md:block">
            {" "}
            <DiscoverItem
              name={nfts?.pages[0].data?.allNfts[1].name}
              img={nfts?.pages[0].data?.allNfts[1].imgPath}
              userimg={nfts?.pages[0].data?.allNfts[1].creatorId.profileImgPath}
              username={nfts?.pages[0].data?.allNfts[1].creatorId.name}
              price={`${nfts?.pages[0].data?.allNfts[1].price.value} ${nfts?.pages[0].data?.allNfts[1].price.currency}`}
              bid={`${nfts?.pages[0].data?.allNfts[1].highestBid.value} ${nfts?.pages[0].data?.allNfts[0].highestBid.currency}`}
            />
          </span>
          <span className="hidden xl:block">
            {" "}
            <DiscoverItem
              name={nfts?.pages[0].data?.allNfts[2].name}
              img={nfts?.pages[0].data?.allNfts[2].imgPath}
              userimg={nfts?.pages[0].data?.allNfts[2].creatorId.profileImgPath}
              username={nfts?.pages[0].data?.allNfts[2].creatorId.name}
              price={`${nfts?.pages[0].data?.allNfts[2].price.value} ${nfts?.pages[0].data?.allNfts[2].price.currency}`}
              bid={`${nfts?.pages[0].data?.allNfts[2].highestBid.value} ${nfts?.pages[0].data?.allNfts[0].highestBid.currency}`}
            />
          </span>
        </div>
      ) : (
        ""
      )}
      <Button
        icon={"/images/eye.svg"}
        text={"See All"}
        size={
          " border border-purple-500 font-bold h-[50px] flex md:hidden mt-4 w-full"
        }
        to="/marketplace"
      />
    </section>
  );
}
