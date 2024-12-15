import UserService from "@/services/UserService";
import useSWRMutation from "swr/mutation";

export const useSubscribe = () => {
  const { trigger, data, isMutating } = useSWRMutation(
    ["subscribe"],
    (url, { arg }: { arg: object }) => UserService.SubscribeUser(arg)
  );

  return { triggerSubscribe: trigger, subscribeData: data, mutatingSubscribe: isMutating };
};
