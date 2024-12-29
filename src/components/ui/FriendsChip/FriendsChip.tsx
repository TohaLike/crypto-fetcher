"use client";
import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  path: String;
  subscribers: any;
  userId: string | undefined;
}

export const FriendsChip: React.FC<Props> = ({ title, path, subscribers, userId }) => {
  // console.log(subscribers[0]?.options?.image[0]?.path);

  return (
    <>
      <Box component={Link} href={`${userId}/${path}`} sx={{ textDecoration: "none" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #282828",
            borderRadius: "50px",
            p: "5px",
            gap: "5px",
            width: "max-content",
          }}
        >
          {subscribers?.length > 0 ? (
            subscribers?.map((e: any, i: number) => (
              <div
                key={`users-${i}-${e.name}-${e.email}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                {e?.options?.image?.length <= 0 ? (
                  <Avatar
                    sx={{
                      bgcolor: `#${e.options?.defaultColor || "1976d2"}`,
                      width: "30px",
                      height: "30px",
                      border: "1px solid #282828",
                      fontSize: "14px",
                    }}
                  >
                    {e.name[0]?.toUpperCase()}
                  </Avatar>
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${e.options?.image[0]?.path}`}
                    alt="avatar"
                    width={30}
                    height={30}
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                      maxHeight: "30px",
                      maxWidth: "30px",
                    }}
                  />
                )}
              </div>
            ))
          ) : (
            <Avatar
              sx={{
                width: "30px",
                height: "30px",
                border: "1px solid #282828",
                fontSize: "14px",
                bgcolor: "#000",
              }}
            >
              0
            </Avatar>
          )}
          <Typography
            variant="h2"
            fontSize={"16px"}
            fontFamily={"unset"}
            fontStyle={"italic"}
            pr={"5px"}
            sx={{ color: "#00EAFF" }}
          >
            {title || "Title"}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
