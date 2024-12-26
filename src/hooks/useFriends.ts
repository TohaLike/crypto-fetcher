import UserService from "@/services/UserService";
import useSWRImmutable from "swr/immutable";

export const useFriends = ({ userId }: any) => {
  const url = `/friends/${userId}`;

  const { data, isLoading } = useSWRImmutable([url], () => UserService.getFriends(url), {
    shouldRetryOnError: true,
  });

  return {
    dataFriends: data,
    loadingDataFriends: isLoading,
  };
};
