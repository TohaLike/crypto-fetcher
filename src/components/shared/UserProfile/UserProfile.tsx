"use client";
import React, { useState } from "react";
import userprofile from "./userprofile.module.scss";
import { Avatar, Box, Typography } from "@mui/material";
import { ActionButton, Post, PostImage } from "@/components/ui";
import { useSubscribe } from "@/hooks/useSubscribe";
import { useParams, useRouter } from "next/navigation";
import { socket } from "@/socket";
import Link from "next/link";
import { useSubscribeNews } from "@/hooks/useSubscribeNews";

interface Props {
  userId?: string;
  name?: string;
  email?: string;
  posts?: any;
  options?: any;
  subscribers?: any;
  checkSubscribe?: string;
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
      maxWidth={"170px"}
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
    // await triggerNews({
    //   userId: userId,
    // });
    return;
  };

  function AddFriend() {
    if (sub || checkSubscribe) return <ProfileButton title="Вы подписаны" type="button" disabled={true} />

    return (
      <ProfileButton title={"Добавить в друзья"} type="button" onClick={subscribe} />
    );
  }
  console.log(subscribeData?.checkSubscribe);

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
        }}
      >
        <div className={userprofile.user__profile__info}>
          <div className={userprofile.user__profile__avatar}>
            <div className={userprofile.user__profile__photo}>
              {!options?.image[0]?.path ? (
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
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${options?.image[0].path}`}
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
            <Box component={Link} href={`${userId}/subscriptions`} sx={{ textDecoration: "none" }}>
              {subscribers && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #282828",
                    borderRadius: "50px",
                    p: "5px",
                    gap: "5px",
                    width: "max-content",
                  }}
                >
                  {subscribers?.map((e: any, i: number) => (
                    <div key={`users-${i}-${e.name}-${e.email}`}>
                      <Avatar
                        sx={{
                          bgcolor: `#${e.options?.defaultColor || "1976d2"}`,
                          width: "30px",
                          height: "30px",
                          border: "1px solid #282828",
                          fontSize: "14px",
                        }}
                      >
                        {e.name[0]?.toUpperCase()}
                      </Avatar>
                    </div>
                  ))}
                  <Typography
                    variant="h2"
                    fontSize={"16px"}
                    fontFamily={"unset"}
                    fontStyle={"italic"}
                    sx={{ color: "#00EAFF" }}
                  >
                    Subs
                  </Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <ProfileButton title="Написать сообщение" type="button" onClick={redirectToRoom} />
              <AddFriend />
            </Box>
          </div>
        </div>
        <div>
          {posts &&
            posts.map((post: any, index: number) => (
              <Post
                key={index}
                owner={post.owner.name}
                text={post.text}
                createdAt={post.createdAt}
                images={post.images}
                options={post.owner.options}
              />
            ))}
        </div>
      </Box>
    </>
  );
};
