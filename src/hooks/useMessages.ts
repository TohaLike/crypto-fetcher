import SocketService from "@/services/SocketService";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

export const useMessages = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("res");

  const url = `/messages/user?res=${search}`

  const { data, mutate, isLoading } = useSWR([url], () => SocketService.getMessages(url), {
    shouldRetryOnError: true,
    // revalidateOnFocus: false,
    // revalidateOnMount: false,
    
  });

  console.log(search)

  return {
    messagesData: data,
    mutate,
    loading: isLoading
  };
};
