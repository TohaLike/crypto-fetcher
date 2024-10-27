import { API_URL } from "@/http";
import AuthService from "@/services/AuthService";
import useSWRImmutable from "swr/immutable";

export const useAuthorized = () => {
  const { data, isLoading } = useSWRImmutable(
    [`${API_URL}/refresh`],
    () => AuthService.checkAuth(),
    {
      shouldRetryOnError: false,
      onError: (error) => {
        if (error?.response?.status === 400) {
          AuthService.logout();
        }
      },
    }
  );

  const isAuthorized: boolean = !!data?.user;

  return {
    userData: data?.user,
    token: data?.accessToken,
    isAuthorized,
    isLoading,
  };
};
