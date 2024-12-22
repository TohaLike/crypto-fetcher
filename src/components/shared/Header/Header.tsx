"use client";
import React, { useContext } from "react";
import header from "./header.module.scss";
import { Container } from "../Container/Container";
import { Avatar, Box, Typography } from "@mui/material";
import { MainIcon } from "@/components/icons/MainIcon";
import { SocketContext } from "@/app/(home)/provider";
import Link from "next/link";
import Image from "next/image";

export const Header: React.FC = ({}) => {
  const { userData } = useContext<any>(SocketContext);

  console.log(userData);

  return (
    <header className={header.header}>
      <Container>
        <div className={header.container}>
          <Box
            component={Link}
            href={"/home"}
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "11px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <MainIcon />
            <Typography variant="h1" fontSize={24} fontFamily={"unset"}>
              Crypto Fetcher
            </Typography>
          </Box>
          <div className={header.avatar}>
            <Link href={`/${userData?.id}`}>
              {userData?.options?.image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${userData.options?.image[0]?.path}`}
                  alt="avatar"
                  width={40}
                  height={40}
                  style={{ objectFit: "cover", borderRadius: "50%", marginRight: "15px" }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: `#${userData.options.defaultColor || "1976d2"}`,
                  }}
                >
                  {userData?.name[0].toUpperCase()}
                </Avatar>
              )}
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};
