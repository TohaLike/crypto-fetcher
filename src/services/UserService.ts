import axiosWithAuth from "@/http";
import { IUser } from "@/models/IUser";
import { Profile } from "@/models/Profile";

export default class UserService {
  static async getProfile(url: any) {
    try {
      const response = await axiosWithAuth.get<Profile>(url);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async getUsers() {
    return axiosWithAuth.get<Profile[]>("/users");
  }

  static async getFriends(url: string) {
    try {
      const response = await axiosWithAuth.get(url);

      return response.data;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  static async getSubscriptions(url: string) {
    try {
      const response = await axiosWithAuth.get(url);

      return response.data
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  static async UnsubscribeUser(userId: any) {
    try {
      const response = await axiosWithAuth.post("/unsubscribe_user", userId);

      return response.data
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  static async SubscribeUser(userId: any) {
    try {
      const response = await axiosWithAuth.post("/subscribe", userId);
      return response.data;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  static async SubscribeNews(userId: any) {
    try {
      const response = await axiosWithAuth.post("/subscribe/news", userId);
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
