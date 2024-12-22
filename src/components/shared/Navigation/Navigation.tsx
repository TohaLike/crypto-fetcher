"use client";
import React, { useContext } from "react";
import { NavigationLink } from "@/components/ui";
import { Stack } from "@mui/material";
import { HomeIcon, MessageIcon, ProfileIcon } from "@/components/icons";
import { SocketContext } from "@/app/(home)/provider";

export const Navigation: React.FC = () => {
  const { userData } = useContext<any>(SocketContext);

  return (
    <Stack
      direction={"column"}
      spacing={2.5}
      p={"20px 0 0"}
      borderRight={"1px solid #282828"}
      height={"100%"}
    >
      <NavigationLink title="Home" icon={<HomeIcon />} href="/home" />
      <NavigationLink title="Profile" icon={<ProfileIcon />} href={`/${userData?.id}`} />
      <NavigationLink title="Messages" icon={<MessageIcon />} href="/messages" />
    </Stack>
  );
};
