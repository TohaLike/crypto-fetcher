import axiosWithAuth from "@/http";
import { MessageResponse } from "@/models/response/MessageResponse";

export default class MessageService {
  static async sendMessage(message: object) {
    try {
      console.log(message);
      const response = await axiosWithAuth.post<MessageResponse>("/message", message);
      return response.data;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }
}