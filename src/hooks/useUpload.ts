import ImageService from "@/services/ImageService";
import useSWRMutation from "swr/mutation";

export const useUpload = () => {
  const { trigger, data, isMutating, error } = useSWRMutation(
    ["upload"],
    (url, { arg }: { arg: object }) => ImageService.uploadPost(arg)
  );

  // console.log(error)

  return { uploadTrigger: trigger, uploadData: data, uploadMutation: isMutating, error };
};
