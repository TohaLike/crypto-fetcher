import ImageService from "@/services/ImageService";
import useSWRImmutable from "swr/immutable";

export const useLoadMore = () => {
  const { data, isValidating, isLoading } = useSWRImmutable(
    ["loadmore"],
    () => ImageService.loadMore(),
    {
      // refreshInterval: 1000,
    }
  );

  return {
    loadMoreData: data
  }
};
