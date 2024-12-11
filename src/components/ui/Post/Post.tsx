"use client";
import React from "react";
import post from "./post.module.scss";
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { PostImage } from "../PostImage/PostImage";

interface Props {
  owner?: string;
  text?: string;
  createdAt?: string;
  images?: string[] | any;
}

export const Post: React.FC<Props> = ({ owner, text, createdAt, images }) => {
  console.log(images);

  return (
    <>
      <ListItem
        sx={{
          bgcolor: "#0E0E0E",
          p: "10px",
          m: "10px",
          borderRadius: "16px",
          boxSizing: "border-box",
          width: "auto",
        }}
      >
        <div>
          <div className={post.header}>
            <ListItemAvatar sx={{ minWidth: "40px", mr: "5px" }}>
              <Avatar sx={{ bgcolor: "#1976d2" }}>{owner && owner[0].toUpperCase()}</Avatar>
            </ListItemAvatar>

            <Box sx={{ display: "grid", gridTemplateColumns: "auto" }}>
              <ListItemText
                sx={{ m: 0 }}
                primary={
                  <Typography
                    variant="body1"
                    sx={{ color: "#FFFFFF", lineHeight: "normal", fontWeight: "100" }}
                    textTransform={"capitalize"}
                  >
                    {owner}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    style={{
                      color: "#FFFFFF",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "500px",
                      lineHeight: "normal",
                      fontWeight: "100",
                    }}
                  >
                    [потом добавлю]
                  </Typography>
                }
              />
            </Box>
          </div>
          <div className={post.body}>
            <div>
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  lineHeight: "1.03em",
                  fontWeight: "200",
                  fontSize: "15px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {text || ""}
              </Typography>
            </div>
          </div>
          <div className={post.body__images}>
            {images?.length > 0 &&
              images.map((e: any, i: number) => (
                <div key={`image-${i}`} className={post.body__image}>
                  <PostImage
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${e.path}`}
                    alt={`image-${i}`}
                    width={250}
                    height={250}
                  />
                </div>
              ))}
          </div>
        </div>
      </ListItem>
    </>
  );
};
