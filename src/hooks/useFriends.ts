import UserService from "@/services/UserService";
import useSWRImmutable from "swr/immutable";

export const useFollowing = ({ userId }: any) => {
  const url = `/following/${userId}`;

  const { data, isLoading } = useSWRImmutable([url], () => UserService.getFriends(url), {
    shouldRetryOnError: true,
    revalidateOnMount: true,
  });

  return {
    dataFriends: data,
    loadingDataFriends: isLoading,
  };
};
