import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";
import {
  createCreator,
  getAllCreator,
  getCreatorWithUserid,
  getOneCreator,
} from "../actions/creators";

export function GetAllCreators(page = "") {
  console.log(page);
  return useQuery({
    queryKey: ["creators", page],
    queryFn: () => getAllCreator(page),
    placeholderData: keepPreviousData,
  });
}

export function GetOneCreators(id: string) {
  console.log("sdsd");
  return useQuery({
    queryKey: ["creator", id],
    queryFn: () => getOneCreator(id),
  });
}
export function GetOneCreatorWithUserId(userId: string) {
  return useQuery({
    queryKey: ["creatoruserid", userId],
    queryFn: () => getCreatorWithUserid(userId),
  });
}

export function CreateNewCreator() {
  return useMutation({
    mutationFn: createCreator,
  });
}
