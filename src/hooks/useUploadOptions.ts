import UserService from "@/services/UserService";
import useSWRMutation from "swr/mutation";

export const useUploadOptions = () => {
  const { trigger, data, isMutating, } = useSWRMutation(
    ["upload_options"],
    (url, { arg }: { arg: object }) => UserService.UploadOptions(arg)
  );

  return {
    triggerUploadOptions: trigger,
    mutatingOptions: isMutating,
    dataOptions: data,
  };
};
