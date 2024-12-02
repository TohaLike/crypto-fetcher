"use client";
import React from "react";
import header from "./header.module.scss";
import { Container } from "../Container/Container";
import { Avatar, Box, Typography } from "@mui/material";
import { useAuthorized } from "@/hooks/useAuthorized";
import Link from "next/link";
import { MainIcon } from "@/components/icons/MainIcon";

export const Header: React.FC = ({}) => {
  const { userData } = useAuthorized();

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
              <Avatar sx={{ width: 40, height: 40, bgcolor: "#1976d2" }}>
                {userData?.name[0].toUpperCase()}
              </Avatar>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};
