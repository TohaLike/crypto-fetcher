"use client";
import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";

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
          bgcolor: "#1A1A1A",
          "&.MuiAppBar-root": {
            maxHeight: "50px",
          },
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            LinkComponent={Link}
            href={`/${userData?.id}`}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            disableRipple
            disableFocusRipple
            disableTouchRipple
          >
            <Avatar sx={{ width: 40, height: 40, bgcolor: "#1976d2" }}>
              {userData?.name[0].toUpperCase()}
            </Avatar>
          </IconButton>
          <Box display={"flex"} flexDirection={"column"}>
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