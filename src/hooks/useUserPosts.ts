import ImageService from "@/services/ImageService";
import { useParams } from "next/navigation";
import useSWR from "swr";

export const useUserPosts = ({ userId }: any) => {
  const params = useParams()
  const url = `/profile/posts/${params.profile}`

  const { data, isLoading } = useSWR(["profile_posts"], () => ImageService.getUserPosts(url), {
    shouldRetryOnError: true,
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });

  return {
    postsData: data,
    isLoadingPosts: isLoading,
  };
};
