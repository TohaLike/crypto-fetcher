import { API_URL } from "@/http";
import AuthService from "@/services/AuthService";
import useSWRImmutable from "swr/immutable";

export const useAuthorized = () => {
  const { data, isLoading } = useSWRImmutable(
    [`${API_URL}/refresh`],
    () => AuthService.checkAuth(),
    {
      shouldRetryOnError: false,
    }
  );

  if (data) localStorage.setItem("token", data.accessToken);
  const isAuthorized: boolean = !!data?.user;
  
  return {
    userData: data?.user,
    isAuthorized,
    isLoading,
  };
};
