import SocketService from "@/services/SocketService";
import useSWRMutation from "swr/mutation";

export const useRoom = () => {
  const { trigger: roomTrigger, isMutating, } = useSWRMutation(
    ["room"],
    (url, { arg }: { arg: object }) => SocketService.createRoom(arg)
  );

  return {
    roomTrigger,
    isMutating,
  };
};
