export interface RoomsResponse {
  lastMessage: { id: string; message: string; createdAt: string };
  roomId: string;
  companion: { id: string; name: string };
}
