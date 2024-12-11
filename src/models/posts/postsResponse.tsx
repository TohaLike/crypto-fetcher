export interface PostResponse {
  owner: { _id: string; name: string };
  id: string;
  createdAt: string;
  images: any;
  text: string;
}
