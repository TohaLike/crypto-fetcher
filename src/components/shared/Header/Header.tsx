"use client";
import React from "react";
import header from "./header.module.scss";
import { Container } from "../Container/Container";
import { Avatar, Typography } from "@mui/material";
import Image from "next/image";

import logo from "./logo.svg";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header>
      <Container>
        <div className={header.container}>
          <div className={header.header__logo}>
            <Image
              src={logo}
              alt="mainLogo"
              width={32}
              height={32}
              draggable={false}
            />
            <Typography variant="h1" fontSize={32}>
              Crypto Fetcher
            </Typography>
          </div>
          <div>
            <Avatar sx={{ width: 42, height: 42, bgcolor: "green" }} />
          </div>
        </div>
      </Container>
    </header>
  );
};
