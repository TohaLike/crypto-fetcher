import UserService from "@/services/UserService";
import { useParams, useSearchParams } from "next/navigation";
import useSWRImmutable from "swr/immutable";

export const useProfile = ({ params }: any) => {
  const url = `/profile/${params}`;

  // console.log(url)

  const { data, isLoading, error } = useSWRImmutable([url], () => UserService.getProfile(url), {
    shouldRetryOnError: true,
  });

  return {
    profileData: data,
    profileLoading: isLoading,
  };
};
