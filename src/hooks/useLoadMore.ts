import ImageService from "@/services/ImageService";
import useSWRMutation from "swr/mutation";

export const useLoadMore = () => {
  const { data, trigger } = useSWRMutation(["update_subscriptions"], (url, { arg }: { arg: object }) =>
    ImageService.loadMore(arg)
  );

  return {
    triggerLoad: trigger,
    loadMoreData: data,
  };
};
