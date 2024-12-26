import UserService from "@/services/UserService";
import useSWRMutation from "swr/mutation";

export const useSubscribeNews = () => {
  const { data, trigger, isMutating } = useSWRMutation(
    ["subscribe_news"],
    (url, { arg }: { arg: any }) => UserService.SubscribeNews(arg)
  );

  return {
    triggerNews: trigger,
    dataNews: data,
    mutatingNews: isMutating,
  };
};
