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
import { useUnsubscribeUser } from "@/hooks/useUnsubscribeUser";

import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { MessageRoomIcon } from "@/components/icons/MessageRoomIcon";

interface Props {
  userId?: string;
  name?: string;
  email?: string;
  posts?: any;
  options?: any;
  checkSubscribe?: string;
  countFollowers?: number | string;
  countFollowings?: number | string;
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
      width={"max-content"}
      display={"flex"}
      justifyContent={"space-between"}
      gap={"5px"}
      minHeight={"30px"}
      fontSize={"14px"}
      fontWeight={"500"}
      icon={<MessageRoomIcon width={"16px"} height={"16px"} color={"#000"} />}
      bgcolor="#fff"
      color="#000"
      padding={"0 10px"}
      hover="#d9d9d9"
    />
  );
}

function ButtonUnfollow({ onClick }: any) {
  return (
    <ActionButton
      type="button"
      title="Unfollow"
      onClick={onClick}
      icon={<PersonRemoveOutlinedIcon sx={{ width: "20px", height: "20px" }} />}
      width={"max-content"}
      display={"flex"}
      justifyContent={"space-between"}
      gap={"5px"}
      minHeight={"30px"}
      fontSize={"14px"}
      fontWeight={"500"}
      bgcolor="#000"
      color="#fff"
      border={"1px solid #282828"}
      padding={"0 10px"}
    />
  );
}

function ButtonFollow({ onClick }: any) {
  return (
    <ActionButton
      type="button"
      title="Follow"
      onClick={onClick}
      icon={<PersonAddAltOutlinedIcon sx={{ width: "20px", height: "20px" }} />}
      width={"max-content"}
      display={"flex"}
      justifyContent={"space-between"}
      gap={"5px"}
      minHeight={"30px"}
      fontSize={"14px"}
      fontWeight={"500"}
      bgcolor="#fff"
      color="#000"
      padding={"0 10px"}
      hover="#d9d9d9"
    />
  );
}

function AddFriendButton({
  subAction,
  unsubAction,
  checkSubscribe,
  sub,
}: {
  subAction: (value: any) => void;
  unsubAction: (value: any) => void;
  checkSubscribe: any;
  sub: boolean;
}) {
  if (checkSubscribe) {
    return <ButtonUnfollow onClick={unsubAction} />;
  }

  if (sub) {
    return <ButtonUnfollow onClick={unsubAction} />;
  }

  return <ButtonFollow onClick={subAction} />;
}

function RemoveFriend({
  subAction,
  unsubAction,
  checkSubscribe,
  unsub,
}: {
  subAction: (value: any) => void;
  unsubAction: (value: any) => void;
  checkSubscribe: any;
  unsub: boolean;
}) {
  if (!checkSubscribe) {
    return <ButtonFollow onClick={subAction} />;
  }

  if (unsub) {
    return <ButtonFollow onClick={subAction} />;
  }

  return <ButtonUnfollow onClick={unsubAction} />;
}

export const UserProfile: React.FC<Props> = ({
  userId,
  name,
  email,
  posts,
  options,
  checkSubscribe,
  countFollowers,
  countFollowings,
  profileLoading,
  postLoading,
}) => {
  const { triggerSubscribe, mutatingSubscribe } = useSubscribe();
  const { triggerNews, mutatingNews } = useSubscribeNews();
  const { triggerUnsub } = useUnsubscribeUser();
  const [sub, setSub] = useState<boolean>(false);
  const [unsub, setUnsub] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams();

  const redirectToRoom = () => {
    router.push(`/messages/user?res=${params?.profile}`);
    socket.emit("join__room", params?.profile);
    return;
  };

  const addFriend = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();

    await triggerSubscribe({
      userId: userId,
    }).then((e) => {
      setSub(true);
      setUnsub(false);
    });
    await triggerNews({
      userId: userId,
    });
    return;
  };

  const unsubAction = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();

    await triggerUnsub({ userId: userId }).then(() => {
      setUnsub(true);
      setSub(false);
    });
    return;
  };

  function ButtonsComponent() {
    return !checkSubscribe ? (
      <AddFriendButton
        subAction={addFriend}
        unsubAction={unsubAction}
        checkSubscribe={checkSubscribe}
        sub={sub}
      />
    ) : (
      <RemoveFriend
        subAction={addFriend}
        unsubAction={unsubAction}
        checkSubscribe={checkSubscribe}
        unsub={unsub}
      />
    );
  }

  // if (profileLoading || postLoading)
  //   return (
  //     <>
  //       <ProfileSkeleton />
  //     </>
  //   );

  function Posts() {
    if (posts?.length <= 0)
      return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", p: "30px 10px" }}>
          <Typography sx={{ fontSize: "18px" }}>The user has no posts yet</Typography>
        </Box>
      );

    return posts?.map((post: any, index: number) => (
      <Post
        key={index}
        id={post?._id}
        ownerId={post?.owner?._id}
        owner={post?.owner?.name}
        text={post?.text}
        createdAt={post?.createdAt}
        images={post?.images[0]}
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
                fontFamily={"unset"}
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

            <Box sx={{ display: "flex", gap: "5px", mt: "10px" }}>
              <ProfileButton title="Send message" type="button" onClick={redirectToRoom} />
              <ButtonsComponent />
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
