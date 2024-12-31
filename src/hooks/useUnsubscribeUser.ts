import UserService from "@/services/UserService";
import useSWRMutation from "swr/mutation";

export const useUnsubscribeUser = () => {
  const { data, trigger, isMutating } = useSWRMutation(
    ["unsubscribe_user"],
    (url, { arg }: { arg: any }) => UserService.UnsubscribeUser(arg)
  );

  return { triggerUnsub: trigger, mutatingUnsub: isMutating, dataUnsub: data };
};
