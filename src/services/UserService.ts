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

  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return axiosWithAuth.get<IUser[]>("/users");
  }
}
