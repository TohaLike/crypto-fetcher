"use client";
import React, { ChangeEvent, useState } from "react";
import profile from "./profile.module.scss";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { useUploadOptions } from "@/hooks/useUploadOptions";
import { AddPost } from "@/components/shared/AddPost/AddPost";
import { useLogout } from "@/hooks/useLogout";
import { ActionButton, FriendsChip, Post, PostImage } from "@/components/ui";
import { PostResponse } from "@/models/posts/postsResponse";
import { ProfileSkeleton } from "@/components/skeletons";

import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface Props {
  userId?: string;
  name?: string;
  email?: string;
  posts?: any;
  options?: any;
  countFollowers?: number | string;
  countFollowings?: number | string;
  profileLoading?: boolean;
  postLoading?: boolean;
}

function ProfileButton({ onClick, title, type, disabled, minWidth }: any) {
  return (
    <ActionButton
      type={type}
      title={title || "btn"}
      onClick={onClick}
      width={"100%"}
      minWidth={minWidth}
      minHeight={"30px"}
      fontSize={"17px"}
      fontWeight={"500"}
      bgcolor="#fff"
      color="#000"
      disabled={disabled}
    />
  );
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

export const Profile: React.FC<Props> = ({
  userId,
  name,
  email,
  countFollowers,
  posts,
  options,
  countFollowings,
  profileLoading,
  postLoading,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [addedPost, setAddedPost] = useState<PostResponse[] | any>([]);
  const [isOptions, setOpenOptions] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const concatData = addedPost.concat(posts);

  const sorted = concatData.flat().sort((a: any, b: any) => {
    const dateA = new Date(a?.createdAt);
    const dateB = new Date(b?.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  const { triggerUploadOptions, dataOptions } = useUploadOptions();
  const { logoutTrigger } = useLogout();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImage(imageUrl);
      setContent(e.target.value);
    }
  };

  const uploadImage = async (e: any) => {
    e.preventDefault();
    const formData: FormData = new FormData();

    if (file) {
      formData.append("file", file);
      await triggerUploadOptions(formData).then((e) => {
        window.location.reload();
      });
      setFile(null);
      setImage("");
      setContent("");
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenOptions = () => {
    setOpenOptions(true);
    setAnchorEl(null);
  };

  const handleCloseOptions = () => {
    setOpenOptions(false);
    setFile(null);
    setImage("");
    setContent("");
  };

  const handleLogout = async () => {
    await logoutTrigger().then(() => {
      window.location.replace("/");
    });
  };

  function ProfileImg() {
    return options?.image?.length <= 0 ? (
      <Avatar
        sx={{
          width: 170,
          height: 170,
          bgcolor: `#${options?.defaultColor || "1976d2"}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "@media (max-width: 600px)": { width: 100, height: 100 },
        }}
      >
        <Typography sx={{ fontSize: "48px", fontWeight: 100 }}>
          {name && name[0]?.toUpperCase()}
        </Typography>
      </Avatar>
    ) : (
      <PostImage
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${options?.image[0]?.path}`}
        alt={`image-profile`}
        rootHeight={170}
        rootWidth={170}
        minWidth={170}
        minHeight={170}
      />
    );
  }


  function Posts() {
    if (sorted?.length === 0)
      return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", p: "30px 10px" }}>
          <Typography sx={{ fontSize: "18px" }}>You have no posts</Typography>
        </Box>
      );

    return sorted?.map((post: any, index: number) => (
      <Post
        key={index}
        id={post?._id}
        ownerId={post?.owner?._id}
        owner={post?.owner?.name}
        text={post?.text}
        createdAt={post?.createdAt}
        images={post?.images?.flat()}
        options={post?.owner?.options}
      />
    ));
  }

  return (
    <>
      <Box
        sx={{
          height: "calc(100vh - 50px)",
          overflowY: "auto",
          scrollbarWidth: "thin",
          width: "100%",
          m: "auto",
          "@media (max-width: 1170px)": {
            height: "115dvh",
            pb: "210px",
          },
        }}
      >
        <form method="post" action="/upload_options" encType="multipart/form-data">
          <input
            className={profile.input}
            id="mainImageButton"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            name="file"
            value={content}
          />

          <div className={profile.user__profile__info}>
            {isOptions ? (
              <div className={profile.user__profile__avatar}>
                <div className={profile.modal__photo}>
                  {!image ? (
                    <ProfileImg />
                  ) : (
                    <PostImage src={image} alt={`image-profile`} rootHeight={170} rootWidth={170} />
                  )}
                </div>
                <div className={profile.user__profile__buttons}>
                  <ProfileButton
                    type="submit"
                    title="Save Image"
                    onClick={uploadImage}
                    disabled={!image}
                    minWidth={"120px"}
                  />
                  {/* <ProfileButton
                    type="submit"
                    title="Delete Image"
                    onClick={uploadImage}
                    // disabled={!image}
                    minWidth={"120px"}
                  /> */}
                  <label htmlFor="mainImageButton" className={profile.user__profile__change}>
                    Change image
                  </label>
                </div>
                <div className={profile.options}>
                  <ActionButton
                    icon={<CloseOutlinedIcon />}
                    onClick={handleCloseOptions}
                    type="button"
                    minWidth={"30px"}
                    minHeight={"30px"}
                    bgcolor="transparent"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className={profile.user__profile__avatar}>
                  <div className={profile.user__profile__photo}>
                    {/* <label htmlFor="mainImageButton" className={profile.user__profile__upload}> */}
                    <ProfileImg />
                    {/* </label> */}
                  </div>
                </div>
                <div className={profile.user__profile__surname}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      maxWidth: "430px",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h2"
                      fontSize={"36px"}
                      whiteSpace={"nowrap"}
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      sx={{ "@media (max-width: 700px)": { textAlign: "center" } }}
                    >
                      {name}
                    </Typography>
                    <Typography
                      variant="inherit"
                      fontSize={"16px"}
                      fontWeight={"100"}
                      fontFamily={"sans-serif"}
                      whiteSpace={"nowrap"}
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      sx={{ "@media (max-width: 700px)": { textAlign: "center" } }}
                    >
                      {email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    <FriendsChip
                      title={"Followers"}
                      path={"followers"}
                      countSubscribers={countFollowers}
                      userId={userId}
                    />
                    <FriendsChip
                      title={"Followings"}
                      path={"followings"}
                      countSubscribers={countFollowings}
                      userId={userId}
                    />
                  </Box>

                  <div className={profile.options}>
                    <ActionButton
                      icon={<SettingsIcon />}
                      onClick={handleClick}
                      ariaControls={open ? "options-menu" : undefined}
                      ariaHaspopup="true"
                      ariaExpanded={open ? "true" : undefined}
                      type="button"
                      minWidth={"30px"}
                      minHeight={"30px"}
                      bgcolor="transparent"
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
                        onClick={handleOpenOptions}
                        icon={<ManageAccountsOutlinedIcon />}
                        title={"Options"}
                      />
                      <MenuItemCustom
                        onClick={handleLogout}
                        icon={<LogoutIcon />}
                        title={"Logout"}
                      />
                    </Menu>
                  </div>
                </div>
              </>
            )}
          </div>
        </form>

        <AddPost setAddedPost={setAddedPost} addedPost={addedPost} />

        <div>
          <Posts />
        </div>
      </Box>
    </>
  );
};
