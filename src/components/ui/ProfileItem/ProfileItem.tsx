"use client";
import React, { useContext, useState } from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { ActionButton } from "../ActionButton/ActionButton";
import { MessageRoomIcon } from "@/components/icons/MessageRoomIcon";
import { SocketContext } from "@/app/(home)/provider";
import { useSubscribe } from "@/hooks/useSubscribe";
import { useSubscribeNews } from "@/hooks/useSubscribeNews";
import { useUnsubscribeUser } from "@/hooks/useUnsubscribeUser";
import Image from "next/image";
import { observer } from "mobx-react-lite";

interface Props {
  name: string;
  userID: string;
  options?: any;
  subscribers: any;
}

function ComponentButton({
  title,
  onClick,
  disabled,
  color,
  border,
  bgcolor,
  minWidth,
  maxWidth,
}: {
  onClick: (value: any) => void;
  title: string;
  disabled?: boolean;
  color?: string;
  border?: string;
  bgcolor?: string;
  minWidth?: string | number;
  maxWidth?: string | number;
}) {
  return (
    <ActionButton
      type="button"
      title={title || "title"}
      size="small"
      borderRadius={"16px"}
      bgcolor={bgcolor || "#fff"}
      color={color || "#000"}
      padding={"0 10px"}
      fontWeight={400}
      minWidth={minWidth}
      maxWidth={maxWidth}
      border={border || "0"}
      onClick={onClick}
      disabled={disabled}
    />
  );
}

function ButtonFollow({ onClick }: { onClick: (value: any) => void }) {
  return <ComponentButton title="Follow" onClick={onClick} minWidth={"72px"} maxWidth={"72px"} />;
}

function ButtonUnfollow({ onClick }: { onClick: (value: any) => void }) {
  return (
    <ComponentButton
      title="Unfollow"
      bgcolor="#000"
      color="#fff"
      minWidth={"86px"}
      maxWidth={"86px"}
      onClick={onClick}
      border="1px solid #282828"
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
  if (checkSubscribe?.length > 0) return <ButtonUnfollow onClick={unsubAction} />;

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
  if (checkSubscribe?.length < 0) {
    return <ButtonFollow onClick={subAction} />;
  }

  if (unsub) {
    return <ButtonFollow onClick={subAction} />;
  }

  return <ButtonUnfollow onClick={unsubAction} />;
}

export const ProfileItem: React.FC<Props> = observer(({ name, userID, options, subscribers }) => {
  const { userData } = useContext<any>(SocketContext);
  const { triggerSubscribe, subscribeData, mutatingSubscribe } = useSubscribe();
  const { triggerNews, dataNews, mutatingNews } = useSubscribeNews();
  const { dataUnsub, triggerUnsub } = useUnsubscribeUser();
  const [sub, setSub] = useState<boolean>(subscribers?.subscribers > 0);
  const [unsub, setUnsub] = useState<boolean>(false);
  const router = useRouter();

  const redirectToUserProfile = (event: any) => {
    event.stopPropagation();
    router.push(`/${userID}`);
    return;
  };

  const redirectToChat = (event: any) => {
    event.stopPropagation();
    router.push(`/messages/user?res=${userID}`);
    return;
  };

  const addFriend = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();

    await triggerSubscribe({
      userId: userID,
    }).then((e) => {
      setSub(true);
      setUnsub(false);
    });
    await triggerNews({
      userId: userID,
    });
    return;
  };

  const unsubAction = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();

    await triggerUnsub({ userId: userID }).then(() => {
      setUnsub(true);
      setSub(false);
    });
    return;
  };

  function ButtonsComponent() {
    if (userData?.id !== userID) {
      return subscribers?.subscribers < 1 ? (
        <AddFriendButton
          subAction={addFriend}
          unsubAction={unsubAction}
          checkSubscribe={subscribers?.subscribers}
          sub={sub}
        />
      ) : (
        <RemoveFriend
          subAction={addFriend}
          unsubAction={unsubAction}
          checkSubscribe={subscribers?.subscribers}
          unsub={unsub}
        />
      );
    }
  }

  return (
    <>
      <ListItem
        onClick={redirectToUserProfile}
        sx={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #282828",
          height: "73px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <ListItemAvatar sx={{ display: "flex", alignItems: "center" }}>
            {options?.image?.length <= 0 ? (
              <Avatar
                sx={{
                  bgcolor: `#${options?.defaultColor ? options?.defaultColor : "1976d2"}`,
                  height: "54px",
                  width: "54px",
                  mr: "15px",
                  fontSize: "24px",
                }}
              >
                {name[0]?.toUpperCase()}
              </Avatar>
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${options?.image[0]?.path}`}
                alt="avatar"
                width={54}
                height={54}
                style={{ objectFit: "cover", borderRadius: "50%", marginRight: "15px" }}
              />
            )}
          </ListItemAvatar>
          <Box sx={{ display: "grid", gridTemplateColumns: "auto" }}>
            <ListItemText
              primary={
                <Typography
                  variant="inherit"
                  sx={{
                    color: "#FFFFFF",
                    fontSize: "18px",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    maxWidth: "400px",
                  }}
                  textTransform={"capitalize"}
                >
                  {name}
                </Typography>
              }
              secondary={
                <ActionButton
                  display="flex"
                  columnGap="3px"
                  icon={<MessageRoomIcon width={"16px"} height={"16px"} color={"#00EAFF"} />}
                  title={
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#00EAFF",
                        fontSize: "14px",
                        fontWeight: "100",
                        fontStyle: "italic",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Send message
                    </Typography>
                  }
                  bgcolor="transparent"
                  type="button"
                  onClick={redirectToChat}
                />
              }
            />
          </Box>
        </Box>

        <ButtonsComponent />
      </ListItem>
    </>
  );
});
