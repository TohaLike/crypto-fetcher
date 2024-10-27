import SocketService from "@/services/SocketService";
import useSWRImmutable from "swr/immutable";

export const useRooms = () => {
  const { data, mutate: mutateRooms } = useSWRImmutable(
    ["rooms"],
    () => SocketService.getAllRooms(),
    {
      shouldRetryOnError: true,
    }
  );

  return {
    rooms: data,
    mutateRooms,
  };
};
