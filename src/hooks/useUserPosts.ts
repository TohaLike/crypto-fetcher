import ImageService from "@/services/ImageService";
import useSWRImmutable from "swr/immutable";

export const useUserPosts = ({ userId }: any) => {
  const url = `/profile/posts/${userId}`

  const { data, isLoading } = useSWRImmutable([url], () => ImageService.getUserPosts(url), {
    shouldRetryOnError: true,
    revalidateOnMount: true,
  });

  return {
    postsData: data,
    isLoadingPosts: isLoading,
  };
};
