import AuthService from "@/services/AuthService";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

export const useRegistration = () => {
  const { trigger: registrationTrigger, isMutating: loading } = useSWRMutation(["registration"], (url, { arg }: { arg: object }) => AuthService.registration(arg), {
    onSuccess: () => {
      mutate(() => true);
    },
  });
  return {
    registrationTrigger,
    loading,
  };
};
