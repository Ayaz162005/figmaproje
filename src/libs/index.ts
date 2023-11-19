import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkverify, updateLike } from "../actions";

export function CheckAuthhh() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: checkverify,
  });
}

export function UpdateLike() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data: { who: string; whom: string }) => updateLike(data),
    onSuccess: () => {
      client.invalidateQueries();
    },
  });
}
