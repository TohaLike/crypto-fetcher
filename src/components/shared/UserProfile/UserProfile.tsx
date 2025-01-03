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
    return <ProfileButton title="Fllowing" onClick={unsubAction} />;
  }

  if (sub) {
    return <ProfileButton title="Fllowing" onClick={unsubAction} />;
  }

  return <ProfileButton title="Follow" onClick={subAction} />;
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
    return <ProfileButton title="Follow" onClick={subAction} />;
  }

  if (unsub) {
    return <ProfileButton title="Follow" onClick={subAction} />;
  }

  return <ProfileButton title="Fllowing" onClick={unsubAction} />;
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
  const { triggerSubscribe, subscribeData, mutatingSubscribe } = useSubscribe();
  const { triggerNews, dataNews, mutatingNews } = useSubscribeNews();
  const { dataUnsub, triggerUnsub } = useUnsubscribeUser();
  const [sub, setSub] = useState<boolean>(false);
  const [unsub, setUnsub] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams();
  const redirectToRoom = () => {
    router.push(`/messages/user?res=${params?.profile}`);
    socket.emit("join__room", params?.profile);
    return;
  };

  function Posts() {
    return posts?.map((post: any, index: number) => (
      <Post
        key={index}
        owner={post?.owner?.name}
        text={post?.text}
        createdAt={post?.createdAt}
        images={post?.images[0]}
        options={post?.owner?.options}
      />
    ));
  }

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

  console.log(checkSubscribe);

  function ButtonsComponent() {
    if (checkSubscribe) {
      return (
        <AddFriendButton
          subAction={addFriend}
          unsubAction={unsubAction}
          checkSubscribe={checkSubscribe}
          sub={sub}
        />
      );
    } else {
      return (
        <RemoveFriend
          subAction={addFriend}
          unsubAction={unsubAction}
          checkSubscribe={checkSubscribe}
          unsub={unsub}
        />
      );
    }
  }

  if (profileLoading || postLoading)
    return (
      <>
        <ProfileSkeleton />
      </>
    );

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
            height: "100dvh",
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
                fontFamily={"unset"}
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
              {/* <AddFriend /> */}
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
