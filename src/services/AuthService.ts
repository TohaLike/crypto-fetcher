import axiosWithAuth, { API_URL } from "@/http";
import { AuthResponse } from "@/models/response/AuthResponse";
import { AxiosResponse } from "axios";

export default class AuthService {
  static async login(data: object): Promise<AxiosResponse<AuthResponse>> {
    return axiosWithAuth.post<AuthResponse>("/login", data);
  }

  static async registration(data: object): Promise<AxiosResponse<AuthResponse>> {
    const response = await axiosWithAuth.post<AuthResponse>("/registration", data);
    localStorage.setItem("token", response.data.accessToken);
    return response;
  }

  static async logout(): Promise<void> {
    return axiosWithAuth.post("/logout");
  }

  static async checkAuth() {
    try {
      const response = await axiosWithAuth.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      return response.data;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }
}
