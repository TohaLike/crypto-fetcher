"use client";
import React, { useState } from "react";
import userprofile from "./userprofile.module.scss";
import { Box, Skeleton, Typography } from "@mui/material";
import { ActionButton, FriendsChip, Post, PostImage } from "@/components/ui";
import { useSubscribe } from "@/hooks/useSubscribe";
import { useParams, useRouter } from "next/navigation";
import { socket } from "@/socket";
import { useSubscribeNews } from "@/hooks/useSubscribeNews";
import { ProfileSkeleton } from "@/components/skeletons";

interface Props {
  userId?: string;
  name?: string;
  email?: string;
  posts?: any;
  options?: any;
  subscribers?: any;
  checkSubscribe?: string;
  following?: any;
  profileLoading?: boolean;
  postLoading?: boolean;
}

function ProfileButton({ onClick, title, type, disabled }: any) {
  return (
    <ActionButton
      type={type}
      title={title || "btn"}
      onClick={onClick}
      disabled={disabled}
      // disabled={!uploadMutation ? false : true}
      // title={uploadMutation ? <CircularProgress size={"20px"} sx={{ zIndex: 100 }} /> : "Post"}
      width={"100%"}
      minHeight={"30px"}
      fontSize={"14px"}
      fontWeight={"500"}
      bgcolor="#fff"
      color="#000"
      padding={"0 10px"}
      minWidth={"130px"}
      maxWidth={"130px"}
    />
  );
}

export const UserProfile: React.FC<Props> = ({
  userId,
  name,
  email,
  posts,
  options,
  subscribers,
  checkSubscribe,
  following,
  profileLoading,
  postLoading,
}) => {
  const [sub, setSub] = useState<boolean>(false);

  const { triggerSubscribe, subscribeData, mutatingSubscribe } = useSubscribe();
  const { triggerNews, dataNews, mutatingNews } = useSubscribeNews();

  const router = useRouter();
  const params = useParams();
  const redirectToRoom = () => {
    router.push(`/messages/user?res=${params?.profile}`);
    socket.emit("join__room", params?.profile);
    return;
  };

  const subscribe = async () => {
    await triggerSubscribe({
      userId: userId,
    }).then((e) => {
      setSub(true);
    });
    await triggerNews({
      userId: userId,
    });
    return;
  };

  function AddFriend() {
    if (sub || checkSubscribe)
      return <ProfileButton title="Following" type="button" disabled={true} />;

    return <ProfileButton title={"Follow"} type="button" onClick={subscribe} />;
  }

  if (profileLoading)
    return (
      <Box sx={{ p: "0 10px" }}>
        <ProfileSkeleton />
      </Box>
    );

  function Posts() {
    return posts?.map((post: any, index: number) => (
      <Post
        key={index}
        owner={post.owner.name}
        text={post.text}
        createdAt={post.createdAt}
        images={post.images[0]}
        options={post.owner.options}
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
          p: "10px",
          maxWidth: "700px",
          width: "100%",
          m: "auto",
          "@media (max-width: 1170px)": {
            height: "100vh",
            pb: "110px",
          },
        }}
      >
        <div className={userprofile.user__profile__info}>
          <div className={userprofile.user__profile__avatar}>
            <div className={userprofile.user__profile__photo}>
              {options?.image?.length <= 0 ? (
                <div
                  className={userprofile.user__profile__upload__icon}
                  style={{
                    backgroundColor: `#${options?.defaultColor}`,
                  }}
                >
                  <Typography variant="h2" fontSize={"54px"}>
                    {name && name[0]?.toUpperCase()}
                  </Typography>
                </div>
              ) : (
                <PostImage
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${options?.image[0]?.path}`}
                  alt={`image-userprofile`}
                  rootHeight={200}
                  rootWidth={200}
                  minWidth={200}
                  minHeight={200}
                />
              )}
            </div>
          </div>
          <div className={userprofile.user__profile__surname}>
            <div>
              <Typography variant="h2" fontSize={"36px"} fontFamily={"unset"}>
                {name}
              </Typography>
              <Typography
                variant="inherit"
                fontSize={"16px"}
                fontWeight={"100"}
                fontFamily={"unset"}
              >
                {email}
              </Typography>
            </div>

            <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <FriendsChip
                title={"Followers"}
                path={"followers"}
                subscribers={subscribers}
                userId={userId}
              />
              <FriendsChip
                title={"Following"}
                path={"following"}
                subscribers={following?.newsFrom}
                userId={userId}
              />
            </Box>

            <Box sx={{ display: "flex", gap: "5px" }}>
              <ProfileButton title="Send message" type="button" onClick={redirectToRoom} />
              <AddFriend />
            </Box>
          </div>
        </div>
        <div>
          <Posts />
        </div>
      </Box>
    </>
  );
};
