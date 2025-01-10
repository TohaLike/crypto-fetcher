"use client";
import React, { useContext, useState } from "react";
import post from "./post.module.scss";
import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { PostImage } from "../PostImage/PostImage";
import { timeCreated } from "@/helper/timeCreated";
import { ActionButton } from "../ActionButton/ActionButton";
import { useDeletePost } from "@/hooks/useDeletePost";
import { SocketContext } from "@/app/(home)/provider";
import Image from "next/image";
import Link from "next/link";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Props {
  id: string | null;
  ownerId: string | null;
  owner?: string | null | undefined;
  text?: string;
  createdAt?: string;
  images?: string[] | any;
  options?: any;
}

function MenuItemCustom({ onClick, title, icon }: any) {
  return (
    <MenuItem
      onClick={onClick}
      sx={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "space-between" }}
    >
      {title || title} {icon && icon}
    </MenuItem>
  );
}

export const Post: React.FC<Props> = ({ id, ownerId, owner, text, createdAt, images, options }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const open = Boolean(anchorEl);

  const { userData } = useContext<any>(SocketContext);
  const { triggerDeletePost, deleteDataPost } = useDeletePost();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeletePost = async () => {
    setAnchorEl(null);
    setOpenDialog(false);
    await triggerDeletePost({ postId: id });
  };

  return (
    <>
      {deleteDataPost?._id ? (
        <Typography sx={{ borderBottom: "1px solid #282828", textAlign: "center", p: "10px" }}>
          Post deleted
        </Typography>
      ) : (
        <ListItem
          sx={{
            p: "10px",
            boxSizing: "border-box",
            width: "auto",
            borderBottom: "1px solid #282828",
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
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          ":hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {owner}
                      </Typography>
                      <span
                        style={{ minWidth: "125px", maxWidth: "125px" }}
                        className={post.createdAt}
                      >
                        {timeCreated(createdAt)}
                      </span>
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
          {userData?.id === ownerId && (
            <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
              <ActionButton
                type="button"
                icon={<MoreHorizIcon />}
                maxWidth={"30px"}
                minWidth={"30px"}
                maxHeight={"30px"}
                minHeight={"30px"}
                bgcolor="transparent"
                onClick={handleClick}
              />
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItemCustom
                  onClick={handleOpenDialog}
                  icon={<DeleteOutlineIcon />}
                  title={"Delete post"}
                />
              </Menu>
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to delete the post?"}
                </DialogTitle>

                <DialogActions>
                  <ActionButton
                    width={"max-content"}
                    type="button"
                    title={"Delete"}
                    onClick={handleDeletePost}
                  />
                  <ActionButton
                    width={"max-context"}
                    type="button"
                    title={"Cancel"}
                    onClick={handleCloseDialog}
                  />
                </DialogActions>
              </Dialog>
            </Box>
          )}
        </ListItem>
      )}
    </>
  );
};
