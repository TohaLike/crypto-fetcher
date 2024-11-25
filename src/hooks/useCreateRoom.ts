import SocketService from "@/services/SocketService";
import useSWRMutation from "swr/mutation";

export const useCreateRoom = () => {
  const { trigger: roomTrigger, isMutating, data} = useSWRMutation(
    ["room"],
    (url, { arg }: { arg: object }) => SocketService.createRoom(arg)
  );

  return {
    roomTrigger,
    data,
    isMutating,
  };
};
