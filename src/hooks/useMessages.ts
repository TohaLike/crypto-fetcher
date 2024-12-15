import SocketService from "@/services/SocketService";
import { useSearchParams } from "next/navigation";
import useSWRInfinite from "swr/infinite";

export const useMessages = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("res");

  const getKey = (pageIndex: number, previousPageData: string) => {
    if (previousPageData && previousPageData.length === 0) return null;

    return `/messages/user?res=${search}&page=${pageIndex + 1 || ""}`;
  };

  const { data, setSize, size, isValidating, isLoading, error } = useSWRInfinite(
    getKey,
    SocketService.getMessages,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      revalidateOnMount: true,
      // revalidateOnReconnect: true,
    }
  );

  const ended = data && data[data.length - 1]?.length === 0;

  return {
    scrollData: data?.some((e: any) => e === "") ? [] : data,
    setSize,
    size,
    ended,
    isLoading,
    isValidating,
    error
  };
};
