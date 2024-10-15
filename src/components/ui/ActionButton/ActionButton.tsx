"use client";
import React from "react";
import { Button } from "@mui/material";

interface Props {
  type: "submit" | "reset" | "button" | undefined;
  title: string;
  onClick?: () => void;
}

export const ActionButton: React.FC<Props> = ({ type, title, onClick }) => {
  return (
    <>
      <Button
        disableElevation
        disableRipple
        onClick={onClick}
        type={type}
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
            bgcolor: "#E3E3E3",
          },
        }}
      >
        {title}
      </Button>
    </>
  );
};
