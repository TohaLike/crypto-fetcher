"use client";
import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { LinkButton } from "@/components/ui/LinkButton/LinkButton";
import { BackIcon } from "@/components/icons/BackIcon";
import Image from "next/image";

interface Props {
  userData?: any;
  userActivity?: any;
}

export const ChatHeader: React.FC<Props> = ({ userData, userActivity }) => {
  return (
    <Box sx={{ zIndex: 1 }}>
      <AppBar
        position="static"
        sx={{
          p: "0 5px",
          bgcolor: "#1A1A1A",
          "&.MuiAppBar-root": {
            maxHeight: "50px",
          },
        }}
      >
        <Toolbar variant="dense" sx={{ "&.MuiToolbar-root": { p: 0, boxSizing: "border-box" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            disableRipple
            disableFocusRipple
            disableTouchRipple
            sx={{
              "&.MuiIconButton-root": {
                paddingRight: 0,
                boxSizing: "border-box",
              },
            }}
          >
            <Box
              sx={{
                display: "none",
                "@media (max-width: 1170px)": { display: "flex", alignItems: "center", pr: "10px" },
              }}
            >
              <LinkButton
                icon={<BackIcon />}
                title={""}
                p={"5px 10px 5px 5px"}
                color={"#707070"}
                minWidth={"24px"}
                minHeight={"24px"}
                bgcolor={"transparent"}
                href={`/messages`}
                cursor={"pointer"}
              />
            </Box>
            {userData?.options?.image?.length <= 0 ? (
              <Avatar
                component={Link}
                href={`/${userData?.id}`}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: `#${userData?.options?.defaultColor || "1976d2"}`,
                  textDecoration: "none",
                }}
              >
                {userData?.name[0].toUpperCase()}
              </Avatar>
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${userData?.options?.image[0]?.path}`}
                alt="avatar"
                width={40}
                height={40}
                style={{ objectFit: "cover", borderRadius: "50%", minWidth: "40px" }}
              />
            )}
          </IconButton>
          <Box
            display={"flex"}
            component={Link}
            href={`/${userData?.id}`}
            sx={{ textDecoration: "none", color: "inherit" }}
            flexDirection={"column"}
            m={"0 0 0 10px"}
          >
            <Typography
              variant="h2"
              fontSize={"16px"}
              fontWeight={"500"}
              textTransform={"capitalize"}
              component="div"
            >
              {userData?.name}
            </Typography>
            <Typography variant="body2" fontSize={"12px"} fontWeight={"100"} fontStyle={"italic"}>
              {userActivity || "offline"}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
