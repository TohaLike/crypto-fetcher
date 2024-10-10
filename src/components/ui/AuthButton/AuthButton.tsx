"use client";
import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

interface Props {
  title: string;
  link: string;
  onClick?: () => void
}

export const AuthButton: React.FC<Props> = ({ title, link, onClick }) => {
  return (
    <>
      {/* <Link href={link}> */}
        <Button
          disableElevation
          disableRipple
          onClick={onClick}
          sx={{
            bgcolor: "#fff",
            color: "#000",
            fontSize: "17px",
            fontWeight: "bold",
            textTransform: "unset",
            width: "100%",
            height: "46px",
            borderRadius: "32px",
            "&:hover": {
              bgcolor: "#E3E3E3"
            }
          }}
        >
          {title}
        </Button>
      {/* </Link> */}
    </>
  );
};
