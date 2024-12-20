"use client";
import React from "react";
import profile from "./profile.module.scss"
import { Avatar, Box, Typography } from "@mui/material";

interface Props {
  name?: string;
  email?: string;
  isAuthorized?: boolean;
  profileData?: any;
}

export const Profile: React.FC<Props> = ({ name, email, isAuthorized, profileData }) => {
  console.log(profileData)

  return (
    <>
      <Box >
        <div>
          <div className={profile.avatar}>
            <Avatar
              sx={{
                bgcolor: "#1976d2",
                height: "150px",
                width: "150px",
                fontSize: "64px",
              }}
            >
              {name && name[0].toUpperCase()}
            </Avatar>
          </div>
          <div>
            <Typography variant="h2" fontSize={"32px"} fontFamily={"unset"} textAlign={"center"}>{name}</Typography>
            <Typography variant="inherit" fontSize={"16px"} fontWeight={"100"} fontFamily={"unset"} textAlign={"center"}>{email}</Typography>
          </div>


        </div>
      </Box>
    </>
  );
};

