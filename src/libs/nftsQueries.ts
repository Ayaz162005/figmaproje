import { useMutation, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { createNft, getAllNfts, getAllNftsClassic } from "../actions/nfts";

export function GetAllNfts() {
  return useInfiniteQuery({
    queryKey: ["allnfts"],
    queryFn: getAllNfts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.size > pages.length * 10) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
}
export function GetAllNftsClassic() {
  return useQuery({
    queryKey: ["allnftsClassic"],
    queryFn: getAllNftsClassic,
  });
}

export function CreateNewNft() {
  return useMutation({
    mutationFn: createNft,
  });
}
