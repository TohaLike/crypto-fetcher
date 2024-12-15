import ImageService from "@/services/ImageService";
import useSWRInfinite from "swr/infinite";

export const usePosts = () => {
  const getKey = (pageIndex: number, previousPageData: string) => {
    if (previousPageData && !previousPageData.length) return null;

    return `/posts/home?page=${pageIndex + 1 || ""}`;
  };

  const { data, isValidating, setSize, size, isLoading, mutate } = useSWRInfinite(
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

  return {
    dataPosts: data?.some((e: any) => e === "") ? [] : data,
    setSize,
    size,
    isLoading,
    isValidating,
    ended,
    mutate,
  };
};
