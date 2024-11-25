import SocketService from "@/services/SocketService";
import { useSearchParams } from "next/navigation";
import useSWRImmutable from "swr/immutable";

export const useRoom = () => {

  const searchParams = useSearchParams();
  const search = searchParams.get("res");

  const url = `/room/user?res=${search}`;

  const { data, isLoading } = useSWRImmutable([url], () => SocketService.getRoom(url));

  console.log(data, "!")


  return { dataRoom: data, loadRoom: isLoading };
};
