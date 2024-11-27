import SocketService from "@/services/SocketService";
import useSWRInfinite from "swr/infinite";

export const useMessages = ({ search }: any) => {
  const getKey = (pageIndex: number, previousPageData: string) => {
    if (previousPageData && previousPageData.length === 0) return null;
    return `/messages/user?res=${search}&page=${pageIndex + 1}&limit=${40}`;
  };

  const { data, setSize, size, isValidating, isLoading, error } = useSWRInfinite(
    getKey,
    SocketService.getMessages,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      revalidateOnMount: true,
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
  };
};
