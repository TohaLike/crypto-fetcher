import UserService from "@/services/UserService";
import useSWRImmutable from "swr/immutable";

export const useUsers = () => {
  const { data, isLoading } = useSWRImmutable(["users"], () => UserService.fetchUsers(), {
    shouldRetryOnError: true,
  });


  return {}
};
