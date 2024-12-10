"use client";
import React, { ChangeEvent, ReactNode, useRef, useState } from "react";
import { ActionButton, PostImage, PostInput } from "@/components/ui";
import { Box, Divider } from "@mui/material";
import { ImageIcon } from "@/components/icons/ImageIcon";
import { useUpload } from "@/hooks/useUpload";
import Image from "next/image";

interface Porps {}

export const AddPost: React.FC = ({}) => {
  const [text, setText] = useState<string>("");
  const [files, setFile] = useState<FileList | null | any>();
  const [images, setImages] = useState<string[]>([]);
  const currentForm = useRef<HTMLFormElement | null>(null);

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

    if (files?.length === 0) return;

    const formData: FormData = new FormData();
    for (let images of files) {
      formData.append("file", images);
    }
    formData.append("description", text);

    await uploadTrigger(formData);
  };

  const handleRemoveImage = (index: number) => {
    const dt = new DataTransfer();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) {
        dt.items.add(file);
      }
    }
    setFile(dt.files);
    images.splice(index, 1);
  };

  return (
    <>
      <form method="post" action="/upload" encType="multipart/form-data">
        <input
          id="file"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          name="file"
        />
        {/* <button type="button" onClick={handleUpload}>
          Add
        </button> */}
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
            <PostInput text={text} setText={setText} />

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
              <ActionButton
                title=""
                icon={<ImageIcon width={"15px"} height={"15px"} />}
                onClick={() => {}}
                type="button"
                bgcolor="transparent"
                maxWidth={"15px"}
                minHeight={"15px"}
                minWidth={"15px"}
              />
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
