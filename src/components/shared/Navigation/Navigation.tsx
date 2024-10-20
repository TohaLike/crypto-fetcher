"use client";
import React from "react";
import { NavigationLink } from "@/components/ui";
import { Stack } from "@mui/material";
import { HomeIcon, MessageIcon, ProfileIcon } from "@/components/icons";
export const Navigation: React.FC = () => {
  return (
    <Stack
      direction={"column"}
      spacing={2.5}
      p={"20px 0 0"}
      borderRight={"1px solid #282828"}
      height={"100vw"}
    >
      <NavigationLink title="Home" icon={<HomeIcon />} href="/home" />
      <NavigationLink title="Profile" icon={<ProfileIcon />} href="profile" />
      <NavigationLink title="Messages" icon={<MessageIcon />} href="messages" />
    </Stack>
  );
};
