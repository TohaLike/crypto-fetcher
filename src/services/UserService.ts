import axiosWithAuth from "@/http";
import { IUser } from "@/models/IUser";
import { AxiosResponse } from "axios";

export default class UserService {
  static async getProfile(url: any) {
    try {
      const response = await axiosWithAuth.get<IUser>(url);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async getUsers() {
    return axiosWithAuth.get<IUser[]>("/users");
  }

  static async SubscribeUser(userId: any) {
    try {
      const response = await axiosWithAuth.post("/subscribe", userId);
      return response.data;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  static async UploadOptions(file: any) {
    try {
      const response = await axiosWithAuth.post("/upload_options", file, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }
}
