import SocketService from "@/services/SocketService";
import useSWRMutation from "swr/mutation";

export const useRoom = () => {
  const { trigger: roomTrigger } = useSWRMutation(["room"], (url, { arg }: { arg: object }) => {
    console.log(arg);
    SocketService.createRoom(arg);
  });

  return {
    roomTrigger,
  };
};
