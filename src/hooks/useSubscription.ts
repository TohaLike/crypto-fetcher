import UserService from "@/services/UserService";
import { useParams } from "next/navigation";
import useSWRImmutable from "swr/immutable";

export const useSubscription = () => {
  const params = useParams();

  const url = `/subscriptions/${params.profile}`;

  const {data, isLoading} = useSWRImmutable([url], () => UserService.getSubscriptions(url), {
    shouldRetryOnError: true,
    revalidateOnMount: true
  });

  return {
    subscribtionsData: data,
    subscribtionsLoading: isLoading
  }
};
