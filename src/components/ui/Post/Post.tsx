"use client";
import React from "react";
import post from "./post.module.scss";
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { PostImage } from "../PostImage/PostImage";
import { timeCreated } from "@/helper/timeCreated";
import Image from "next/image";
import Link from "next/link";

interface Props {
  ownerId: string | null;
  owner?: string | null | undefined;
  text?: string;
  createdAt?: string;
  images?: string[] | any;
  options?: any;
}

export const Post: React.FC<Props> = ({ ownerId, owner, text, createdAt, images, options }) => {
  return (
    <>
      <ListItem
        sx={{
          p: "10px",
          boxSizing: "border-box",
          width: "auto",
        }}
      >
        <div className={post.container}>
          <div className={post.header}>
            <ListItemAvatar
              sx={{
                minWidth: "40px",
                mr: "5px",
              }}
            >
              <Box component={Link} href={`/${ownerId}`} sx={{ textDecoration: "none" }}>
                {options?.image?.length <= 0 ? (
                  <Avatar sx={{ bgcolor: `#${options?.defaultColor || "1976d2"}` }}>
                    {owner && owner[0]?.toUpperCase()}
                  </Avatar>
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${options?.image[0]?.path}`}
                    alt="avatar"
                    width={40}
                    height={40}
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                )}
              </Box>
            </ListItemAvatar>

            <Box sx={{ display: "grid", gridTemplateColumns: "auto" }}>
              <ListItemText
                sx={{ m: 0 }}
                primary={
                  <Box display={"flex"} alignItems={"center"} gap={"6px"}>
                    <Typography
                      component={Link}
                      href={`/${ownerId}`}
                      variant="body1"
                      sx={{
                        color: "#FFFFFF",
                        lineHeight: "normal",
                        fontWeight: "100",
                        textDecoration: "none",
                        textTransform: "capitalize",
                        ":hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {owner}
                    </Typography>
                    <span className={post.createdAt}>{timeCreated(createdAt)}</span>
                  </Box>
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
                    @user id
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
                  lineHeight: "1.5em",
                  fontWeight: "200",
                  fontSize: "15px",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "break-word",
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
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${e?.path}`}
                    alt={`image-${i}`}
                    maxHeight={"250px"}
                    minHeight={"100%"}
                    height={"100%"}
                    width={"100%"}
                    borderRadius={"16px"}
                  />
                </div>
              ))}
          </div>
        </div>
      </ListItem>
    </>
  );
};
