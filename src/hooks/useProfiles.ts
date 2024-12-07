import UserService from "@/services/UserService";
import useSWRImmutable from "swr/immutable";

export const useProfiles = () => {
  const { data, isLoading, error } = useSWRImmutable(["users"], () => UserService.getUsers(), {
    revalidateOnReconnect: true,
  });

  return { usersData: data?.data, loadingUsers: isLoading };
};