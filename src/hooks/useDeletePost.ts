import ImageService from "@/services/ImageService";
import useSWRMutation from "swr/mutation";
import { object } from "zod";

export const useDeletePost = () => {
  const { trigger, data, isMutating } = useSWRMutation(
    ["delete_post"],
    (url, { arg }: { arg: object }) => ImageService.deletePost(arg)
  );

  return {
    triggerDeletePost: trigger,
    deleteDataPost: data,
    mutatingDelete: isMutating
  };
};
