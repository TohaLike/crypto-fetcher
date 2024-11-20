import UserService from "@/services/UserService";
import { useParams, useSearchParams } from "next/navigation";
import useSWRImmutable from "swr/immutable";

export const useProfile = ({ params }: any) => {
  const url = `/profile/${params}`;

  const { data, isLoading } = useSWRImmutable([url], () => UserService.getProfile(url), {
    shouldRetryOnError: true,
  });

  return {
    profileData: data,
    isLoading,
  };
};
