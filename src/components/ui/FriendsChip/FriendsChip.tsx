"use client";
import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  path: String;
  countSubscribers: number | string | undefined;
  userId: string | undefined;
}

export const FriendsChip: React.FC<Props> = ({ title, path, countSubscribers, userId }) => {
  // console.log(subscribers[0]?.options?.image[0]?.path);

  return (
    <>
      <Box component={Link} href={`${userId}/${path}`} sx={{ textDecoration: "none" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            width: "max-content",
          }}
        >
          <Typography
            variant="h2"
            fontSize={"16px"}
            // fontFamily={"unset"}
            sx={{ color: "#fff" }}
          >
            {countSubscribers || 0}
          </Typography>
          <Typography
            variant="h2"
            fontSize={"16px"}
            sx={{ color: "#71767B" }}
          >
            {title || "Title"}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
