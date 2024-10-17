"use client";
import React from "react";
import header from "./header.module.scss";
import { Container } from "../Container/Container";
import { Avatar, Typography } from "@mui/material";
import Image from "next/image";

import logo from "../Assets/Icons/logo.svg";

export const Header: React.FC = ({}) => {
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
            <Avatar sx={{ width: 40, height: 40, bgcolor: "green" }}>A</Avatar>
          </div>
        </div>
      </Container>
    </header>
  );
};
