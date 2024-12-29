import axiosWithAuth from "@/http";
import { MessageResponse } from "@/models/message/MessageResponse";
import { RoomResponse } from "@/models/room/RoomResponse";
import { RoomDataResponse } from "@/models/roomData/RoomDataResponse";

export default class SocketService {
  static async createRoom(data: object) {
    try {
      // console.log(data);
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

  static async getMessages(url: string) {
    try {
      const response = await axiosWithAuth.get<MessageResponse[]>(url);
      return response.data;
    } catch (e: any) {
      throw new Error(e.response?.data?.message);
    }
  }

  static async getRoom(url: string) {
    try {
      const response = await axiosWithAuth.get<RoomDataResponse>(url);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}
