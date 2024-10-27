"use client";
import React, { useEffect, useState } from "react";
import header from "./header.module.scss";
import { Container } from "../Container/Container";
import { Avatar, Badge, Typography } from "@mui/material";
import { useAuthorized } from "@/hooks/useAuthorized";
import Link from "next/link";
import { socket } from "@/socket/socket";

export const Header: React.FC = ({}) => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const { userData } = useAuthorized();

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }
  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   socket.on("connect", onConnect);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //   }
  // }, []);

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
            <Link href={"/profile"}>
              {/* <Badge badgeContent={isConnected ? "online" : "no online"} color="primary"> */}
                <Avatar sx={{ width: 40, height: 40, bgcolor: "green" }}>
                  {userData?.name[0].toUpperCase()}
                </Avatar>
              {/* </Badge> */}
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};
