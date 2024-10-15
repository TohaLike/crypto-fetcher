// import $a from "@/http";
import axiosWithAuth from "@/http";
import { AuthResponse } from "@/models/response/AuthResponse";
import { AxiosResponse } from "axios";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return axiosWithAuth.post<AuthResponse>("/login", {email, password})
  }

  static async registration(email: string, password: string, day: string, month:string, year:string): Promise<AxiosResponse<AuthResponse>> {
    return axiosWithAuth.post<AuthResponse>("/registration", {email, password, day, month, year})
  }

  static async logout(): Promise<void> {
    return axiosWithAuth.post("/logout")
  }
}

