import AuthService from "@/services/AuthService";
import useSWRMutation from "swr/mutation";

export const useLogout = () => {
  const { trigger } = useSWRMutation(["logout"], (url, { arg }: { arg?: object }) =>
    AuthService.logout()
  );

  return { logoutTrigger: trigger };
};
