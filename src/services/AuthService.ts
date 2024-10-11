import $api from "@/http";
import { AuthResponse } from "@/models/response/AuthResponse";
import { AxiosResponse } from "axios";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", {email, password})
  }

  static async registration(email: string, password: string, date: object): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", {email, password, date})
  }

  static async logout(): Promise<void> {
    return $api.post("/logout")
  }
}

