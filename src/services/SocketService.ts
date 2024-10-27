import axiosWithAuth from "@/http";
import { MessageResponse } from "@/models/message/MessageResponse";
import { RoomResponse } from "@/models/room/RoomResponse";

export default class SocketService {
  static async sendMessage(message: object) {
    try {
      const response = await axiosWithAuth.post<MessageResponse>("/message", message);
      return response.data;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  static async createRoom(data: object) {
    try {
      const response = await axiosWithAuth.post<RoomResponse>("/room", data);
      return response.data;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  static async getAllRooms() {
    try {
      const response = await axiosWithAuth.get<RoomResponse>("/rooms");
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}
