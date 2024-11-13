import { MessageResponse } from "../message/MessageResponse";
import { RoomResponse } from "../room/RoomResponse";

export interface MessagePageResponse {
  messages: MessageResponse[];
  roomData: RoomResponse;
}