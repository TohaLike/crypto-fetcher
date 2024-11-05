"use client";
import React from "react";
import header from "./header.module.scss";
import { Container } from "../Container/Container";
import { Avatar, Typography } from "@mui/material";
import { useAuthorized } from "@/hooks/useAuthorized";
import Link from "next/link";

export const Header: React.FC = ({}) => {
  const { userData } = useAuthorized();

  return (
    <header className={header.header}>
      <Container>
        <div className={header.container}>
          <div className={header.header__logo}>
            <span></span>
            <Typography variant="h1" fontSize={24} fontFamily={"unset"}>
              Crypto Fetcher
            </Typography>
          </div>
          <div className={header.avatar}>
            <Link href={`/${userData?.id}`}>
              <Avatar sx={{ width: 40, height: 40, bgcolor: "green" }}>
                {userData?.name[0].toUpperCase()}
              </Avatar>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};
