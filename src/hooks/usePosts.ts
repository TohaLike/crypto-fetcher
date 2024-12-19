import ImageService from "@/services/ImageService";
import useSWRInfinite from "swr/infinite";
import { useLoadMore } from "./useLoadMore";
import { useInfiniteScroll } from "./useInfiniteScroll";

export const usePosts = () => {
  const { loadMoreData, triggerLoad } = useLoadMore();

  const getKey = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;

    return `/posts/home?page=${pageIndex + 1 || ""}`;
  };

  const { data, isValidating, setSize, size, isLoading, mutate, error } = useSWRInfinite(
    getKey,
    ImageService.getPosts,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      revalidateOnMount: true,
      onSuccess: (data: any) => {
        triggerLoad(data.flat()[0].createdAt);
      },
    }
  );

  const ended = data && data[data.length - 1]?.length === 0;

  const mutatePosts = async () => {
    await mutate(ImageService.getPosts("/posts/home?page=1"), false);
  };

  const { intersectionRef } = useInfiniteScroll({ isValidating, setSize, size, ended });

  return {
    dataPosts: data?.some((e: any) => e === "") ? [] : data,
    isLoading,
    mutatePosts,
    error,
    loadMoreData,
    intersectionRef,
  };
};
