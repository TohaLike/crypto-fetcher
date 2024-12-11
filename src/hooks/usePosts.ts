import PostsService from "@/services/ImageService";
import useSWRInfinite from "swr/infinite";

export const usePosts = () => {
  const getKey = (pageIndex: number, previousPageData: string) => {
    if (previousPageData && previousPageData.length === 0) return null;

    return `/posts/home?page=${pageIndex + 1}`;
  };

  const { data, isValidating, setSize, size, isLoading } = useSWRInfinite(
    getKey,
    PostsService.getPosts,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      revalidateOnMount: true,
    }
  );

  const ended = data && data[data.length - 1]?.length === 0;

  return { dataPosts: data, setSize, size, isLoading, isValidating, ended };
};
