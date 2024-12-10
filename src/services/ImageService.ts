import axiosWithAuth from "@/http";
import { FileResponse } from "@/models/file/fileResponse";

export default class ImageService {
  static async uploadImage(file: any) {
    try {
      const response = await axiosWithAuth.post("/upload", file, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  static async getImage() {
    try {
      const response = await axiosWithAuth.get("/images");

      return response.data;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }
}
