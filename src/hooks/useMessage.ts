import SocketService from "@/services/SocketService";
import { socket } from "@/socket/socket";
import useSWRMutation from "swr/mutation";

export const useMessage = () => {
  const { trigger: messageTrigger, isMutating: loading } = useSWRMutation(
    ["message"],
    (url, { arg }: { arg: object }) => {
      SocketService.sendMessage(arg);
      socket.emit("send__message", arg);
    }
  );

  return {
    messageTrigger,
    loading,
  };
};
