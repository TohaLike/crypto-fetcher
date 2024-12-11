"use client";
import React, { ChangeEvent, useState } from "react";
import addpost from "./addpost.module.scss";
import { ActionButton, PostImage, PostInput } from "@/components/ui";
import { Avatar, Box, Divider } from "@mui/material";
import { ImageIcon } from "@/components/icons/ImageIcon";
import { useUpload } from "@/hooks/useUpload";
import { useAuthorized } from "@/hooks/useAuthorized";

export const AddPost: React.FC = ({}) => {
  const [text, setText] = useState<string>("");
  const [files, setFile] = useState<FileList | null | any>(null);
  const [images, setImages] = useState<string[]>([]);

  const { userData } = useAuthorized();

  const { uploadTrigger, uploadData } = useUpload();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files);
      const imagesUrl = Array.from(e.target.files).map((image) => URL.createObjectURL(image));
      setImages(imagesUrl);
    }
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();

    const formData: FormData = new FormData();
    for (let images of files) {
      formData.append("file", images);
    }
    formData.append("description", text.trim());

    await uploadTrigger(formData);
  };

  const handleRemoveImage = (index: number) => {
    const dt = new DataTransfer();

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
        />

        <div>
          <Box
            sx={{
              m: "10px",
              p: "10px",
              boxSizing: "border-box",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              bgcolor: "#0E0E0E",
            }}
          >
            <Box display={"flex"} alignItems={"flex-end"} p={"0 0 5px"}> 
              <Avatar sx={{ bgcolor: "#1976d2", mr: "16px" }}>{userData?.name[0].toUpperCase()}</Avatar>
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
              {images?.map((image, index) => (
                <PostImage
                  key={index}
                  src={image}
                  alt=""
                  onClick={() => handleRemoveImage(index)}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <label htmlFor="fileButton" className={addpost.label}>
                <ImageIcon width={"15px"} height={"15px"} />
              </label>
              <ActionButton
                title="Post"
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
