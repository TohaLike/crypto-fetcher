import axiosWithAuth from "@/http";
import { IUser } from "@/models/IUser";
import { AxiosResponse } from "axios";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return axiosWithAuth.get<IUser[]>("/users")
  }
}
