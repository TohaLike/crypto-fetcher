import axiosWithAuth from "@/http";
import { FileResponse } from "@/models/file/fileResponse";
import { PostResponse } from "@/models/posts/postsResponse";

export default class PostsService {
  static async uploadPost(file: any) {
    try {
      const response = await axiosWithAuth.post("/upload", file, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  static async getPosts(url: string | any) {
    try {
      const response = await axiosWithAuth.get<PostResponse[]>(url);
      return response.data;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }
}
