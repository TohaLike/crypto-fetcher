import SocketService from "@/services/SocketService";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

export const useRooms = () => {
  const { data, mutate: mutateRooms } = useSWR(
    ["rooms"],
    () => SocketService.getAllRooms(),
    {
      shouldRetryOnError: true,
      revalidateOnFocus: false,
    }
  );

  return {
    rooms: data,
    mutateRooms,
  };
};
