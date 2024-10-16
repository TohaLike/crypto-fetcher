import { API_URL } from "@/http";
import AuthService from "@/services/AuthService";
import useSWRImmutable from "swr/immutable";

export const useAuth = () => {
  const { data: checkAuth, isLoading } = useSWRImmutable([`${API_URL}/refresh`], () => AuthService.checkAuth(), {
    shouldRetryOnError: false,
  });

  return {
    checkAuth,
  };
};
