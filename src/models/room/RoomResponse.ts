export interface RoomResponse {
  id: string;
  name: string;
  createdAt: string;
  ownerId: string;
  usersId: [{ _id: string; name: string; options: { _id: string; image: any } }];
  lastMessage: { _id: string; messageText: string; createdAt: string };
}
