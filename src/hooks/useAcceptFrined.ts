import UserService from "@/services/UserService";
import useSWRMutation from "swr/mutation";

export const useAcceptFrined = ({ userId }: any) => {
  const {data, isMutating} = useSWRMutation(["accept_friend"], (url, {arg}: {arg: any}) =>  UserService.acceptFriend(arg))

  return {
    acceptData: data,
    acceptMutating: isMutating,
  }
};
