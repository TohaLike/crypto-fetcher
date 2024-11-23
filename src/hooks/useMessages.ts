import SocketService from "@/services/SocketService";
import useSWRInfinite from "swr/infinite";

export const useMessages = ({ search }: any) => {
  const getKey = (pageIndex: number, previousPageData: string) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/messages/user?res=${search}&page=${pageIndex}&limit=${35}`;
  };

  const { data, setSize, size, isValidating, isLoading } = useSWRInfinite(
    getKey,
    SocketService.getMessages,
    {
      shouldRetryOnError: true,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
    }
  );

  const ended = data && data[data.length - 1]?.length === 0;

  return {
    scrollData: data,
    setSize,
    size,
    ended,
    isLoading,
    isValidating,
  };
};
