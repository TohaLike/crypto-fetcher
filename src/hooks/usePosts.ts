import ImageService from "@/services/ImageService";
import useSWRInfinite from "swr/infinite";

export const usePosts = () => {
  const getKey = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && previousPageData.length === 0) return null;

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
    }
  );

  const ended = data && data[data.length - 1]?.length === 0;

  const mutatePosts = async () => {
    await mutate(ImageService.getPosts("/posts/home?page=1"), false);
  };

  return {
    dataPosts: data?.some((e: any) => e === "") ? [] : data,
    setSize,
    size,
    isLoading,
    isValidating,
    ended,
    mutatePosts,
    error,
  };
};
