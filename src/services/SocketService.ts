import axiosWithAuth from "@/http";
import { MessageResponse } from "@/models/message/MessageResponse";
import { MessagePageResponse } from "@/models/messagePage/messagePageResponse";
import { RoomResponse } from "@/models/room/RoomResponse";

export default class SocketService {
  static async createRoom(data: object) {
    try {
      console.log(data)
      const response = await axiosWithAuth.post<RoomResponse>("/room", data);
      return response.data;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  static async getAllRooms() {
    try {
      const response = await axiosWithAuth.get<RoomResponse[]>("/rooms");
      return response.data;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  static async getMessages(url: any) {
    try {
      const response = await axiosWithAuth.get<MessagePageResponse>(url);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}
