"use client";
import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

import navlink from "./navlink.module.scss";

interface Props {
  title: string;
  icon?: React.ReactNode;
  href: string;
}

export const NavigationLink: React.FC<Props> = ({ title, icon, href }) => {
  return (
    <>
      <Link href={href} className={navlink.link}>
        <ListItemIcon sx={{ minWidth: "24px", mr: "15px", display: "flex", alignItems: "center" }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          disableTypography
          sx={{
            fontFamily: "var(--font-IBMPlexMono-mono)",
            fontSize: "20px",
            margin: 0,
          }}
        >
          {title}
        </ListItemText>
      </Link>
    </>
  );
};
