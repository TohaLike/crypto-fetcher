import UserService from "@/services/UserService";
import { useParams, useSearchParams } from "next/navigation";
import useSWRImmutable from "swr/immutable";

export const useProfile = () => {
  const params = useParams()
  const url = `/profile/${params?.profile}`;

  const {data, isLoading} = useSWRImmutable([url], () => UserService.getProfile(url), {
    shouldRetryOnError: true,
  });


  return {
    profileData: data,
    isLoading
  }
};
