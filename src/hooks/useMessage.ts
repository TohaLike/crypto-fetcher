import MessageService from "@/services/MessageService";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

export const useMessage = () => {
  const { trigger: messageTrigger, isMutating: loading } = useSWRMutation(
    ["message"],
    (url, { arg }: { arg: object }) => MessageService.sendMessage(arg),
    {
      onSuccess: () => {
        mutate(() => true);
      },
    }
  );
  return {
    messageTrigger,
    loading,
  };
}