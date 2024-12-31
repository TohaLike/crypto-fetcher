"use client";
import React, { useContext, useEffect, useState } from "react";
import { NavigationLink } from "@/components/ui";
import { BottomNavigation, BottomNavigationAction, Box, Stack } from "@mui/material";
import { HomeIcon, MessageIcon, PeoplesIcon, ProfileIcon } from "@/components/icons";
import { SocketContext } from "@/app/(home)/provider";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Navigation: React.FC = () => {
  const { userData } = useContext<any>(SocketContext);
  const [value, setValue] = useState<string | null>(null);

  const pathname = usePathname();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(pathname);
  }, [pathname]);

  return (
    <>
      <Stack
        sx={{ "@media (max-width: 1170px)": { display: "none" } }}
        direction={"column"}
        spacing={2.5}
        p={"20px 0 0"}
        borderRight={"1px solid #282828"}
        height={"100%"}
      >
        <NavigationLink title="Home" icon={<HomeIcon />} href="/home" />
        <NavigationLink title="Profile" icon={<ProfileIcon />} href={`/${userData?.id}`} />
        <NavigationLink title="Messages" icon={<MessageIcon />} href="/messages" />
        <NavigationLink title="Peoples" icon={<PeoplesIcon />} href="/peoples" />
      </Stack>

      {pathname !== "/messages/user" && (
        <Box
          sx={{
            display: "none",
            bgcolor: "#000",
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            "@media (max-width: 1170px)": {
              display: "block",
              position: "fixed",
              bottom: "0",
              width: "100%",
              zIndex: 100,
            },
          }}
        >
          <BottomNavigation
            sx={{ bgcolor: "#0e0e0e", color: "#fff" }}
            showLabels
            value={value}
            onChange={handleChange}
          >
            <BottomNavigationAction
              label="Home"
              value="/home"
              LinkComponent={Link}
              href="/home"
              sx={{
                color: "#fff",
                "&.Mui-selected": {
                  color: "#00EAFF",
                },
              }}
              icon={<HomeIcon color={value === "/home" && "#00EAFF"} />}
            />
            <BottomNavigationAction
              label="Profile"
              value={`/${userData?.id}`}
              LinkComponent={Link}
              href={`/${userData?.id}`}
              sx={{
                color: "#fff",
                "&.Mui-selected": {
                  color: "#00EAFF",
                },
              }}
              icon={<ProfileIcon color={value === `/${userData?.id}` && "#00EAFF"} />}
            />
            <BottomNavigationAction
              label="Messages"
              LinkComponent={Link}
              href="/messages"
              value="/messages"
              sx={{
                color: "#fff",
                "&.Mui-selected": {
                  color: "#00EAFF",
                },
              }}
              icon={<MessageIcon color={value === "/messages" && "#00EAFF"} />}
            />
            <BottomNavigationAction
              label="Peoples"
              LinkComponent={Link}
              href="/peoples"
              value="/peoples"
              sx={{
                color: "#fff",
                "&.Mui-selected": {
                  color: "#00EAFF",
                },
              }}
              icon={<PeoplesIcon color={value === "/peoples" && "#00EAFF"} />}
            />
            {/* <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} /> */}
          </BottomNavigation>
        </Box>
      )}
    </>
  );
};
