import ImageService from "@/services/ImageService";
import useSWRMutation from "swr/mutation";

export const useUpload = () => {
  const { trigger, data, isMutating } = useSWRMutation(
    ["upload"],
    (url, { arg }: { arg: object }) => ImageService.uploadImage(arg)
  );

  return { uploadTrigger: trigger, uploadData: data, uploadMutation: isMutating };
};
