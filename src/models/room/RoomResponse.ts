export interface RoomResponse {
  _id: string;
  name: string;
  createdAt: string;
  ownerId: any;
  usersId: [{ _id: string; name: string }];
  lastMessage: { _id: string; messageText: string; createdAt: string };
}
