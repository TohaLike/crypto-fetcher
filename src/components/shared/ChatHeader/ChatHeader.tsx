"use client";
import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";

interface Props {
  userData: any;
}

export const ChatHeader: React.FC<Props> = ({ userData }) => {
  return (
    <Box sx={{ zIndex: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#282828",
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
          <Typography variant="h2" fontSize={"18px"} fontWeight={"500"} textTransform={"capitalize"} component="div">
            {userData?.name}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
