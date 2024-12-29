import UserService from "@/services/UserService";
import useSWRImmutable from "swr/immutable";

export const useProfile = ({ params }: any) => {
  const url = `/profile/${params}`;

  const { data, isLoading, error, mutate } = useSWRImmutable([url], () => UserService.getProfile(url), {
    shouldRetryOnError: true,
    revalidateOnMount: true,
  });

  return {
    profileData: data,
    profileLoading: isLoading,
    mutateProfile: mutate,
  };
};
