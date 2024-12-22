"use client";
import React, { ChangeEvent, useContext, useState } from "react";
import addpost from "./addpost.module.scss";
import { ActionButton, PostImage, PostInput } from "@/components/ui";
import { Avatar, Box, Divider } from "@mui/material";
import { ImageIcon } from "@/components/icons/ImageIcon";
import { useAuthorized } from "@/hooks/useAuthorized";
import { useUpload } from "@/hooks/useUpload";
import { CircularProgress } from "@mui/material";
import { SocketContext } from "@/app/(home)/provider";
import Image from "next/image";

interface Props {
  setAddedPost?: React.Dispatch<React.SetStateAction<any>>;
  addedPost?: any;
}

export const AddPost: React.FC<Props> = ({ setAddedPost, addedPost }) => {
  const [text, setText] = useState<string>("");
  const [files, setFile] = useState<FileList | null | any>([]);
  const [images, setImages] = useState<string[]>([]);
  const [content, setContent] = React.useState("");
  const { uploadTrigger, uploadData, uploadMutation } = useUpload();

  const { userData } = useContext<any>(SocketContext);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imagesUrl = Array.from(e.target.files);
      setFile([...files, ...imagesUrl]);
      setContent(e.target.value);
      const visibleImages = Array.from(e.target.files).map((image) => URL.createObjectURL(image));
      setImages([...images, ...visibleImages]);
    }
  };

  const handleUpload = (e: any) => {
    e.preventDefault();

    const formData: FormData = new FormData();

    if (files) {
      for (let images of files) {
        formData.append("file", images);
      }
    }

    if (text.trim()) {
      formData.append("description", text.trim());
      uploadTrigger(formData).then((e) => {
        if (e?.data && setAddedPost) setAddedPost([...addedPost, e.data]);
      });
      setContent("");
      setText("");
      setImages([]);
      setFile([]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const dt = new DataTransfer();
    setContent("");

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file);
    }

    setFile(dt.files);
    images.splice(index, 1);
  };

  return (
    <>
      <form method="post" action="/upload" encType="multipart/form-data">
        <input
          className={addpost.input}
          id="fileButton"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          name="file"
          value={content}
        />

        <div>
          <Box
            sx={{
              m: "10px 0",
              p: "10px",
              boxSizing: "border-box",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              bgcolor: "#0E0E0E",
            }}
          >
            <Box display={"flex"} alignItems={"flex-end"} p={"0 0 5px"}>
              {userData?.options?.image?.length > 0 ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${userData?.options?.image[0]?.path}`}
                  alt="avatar"
                  width={40}
                  height={40}
                  style={{ objectFit: "cover", minWidth: "40px", borderRadius: "50%", marginRight: "16px" }}
                />
              ) : (
                <Avatar sx={{ bgcolor: "#1976d2", mr: "16px" }}>
                  {userData?.name[0].toUpperCase()}
                </Avatar>
              )}
              <PostInput text={text} setText={setText} />
            </Box>

            <Divider
              variant="fullWidth"
              sx={{ "&.MuiDivider-root": { m: "0 0 10px", bgcolor: "#282828" } }}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(10px, 100px))",
                gap: "10px",
              }}
            >
              {images.length > 0 &&
                images?.map((image, index) => (
                  <PostImage
                    key={`image-${index}`}
                    src={image}
                    width={"100px"}
                    height={"100px"}
                    alt={`image-${index}`}
                    onClick={() => handleRemoveImage(index)}
                  />
                ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <label htmlFor="fileButton" className={addpost.label}>
                <ImageIcon width={"15px"} height={"15px"} />
              </label>
              <ActionButton
                disabled={!uploadMutation ? false : true}
                title={
                  uploadMutation ? <CircularProgress size={"20px"} sx={{ zIndex: 100 }} /> : "Post"
                }
                type="submit"
                onClick={handleUpload}
                maxWidth={"70px"}
                minHeight={"30px"}
                fontSize={"17px"}
                fontWeight={"500"}
                bgcolor="#fff"
                color="#000"
              />
            </Box>
          </Box>
        </div>
      </form>
    </>
  );
};
