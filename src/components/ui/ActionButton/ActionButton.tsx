"use client";
import React from "react";
import { Button } from "@mui/material";

interface Props {
  variant?: "text" | "outlined" | "contained";
  type: "submit" | "reset" | "button" | undefined;
  title?: string | React.ReactNode;
  disabled?: boolean;
  bgcolor?: string;
  color?: string;
  hover?: string;
  onClick?: (action: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon?: React.ReactNode;
  [props: string]: any;
}

export const ActionButton: React.FC<Props> = ({
  variant,
  type,
  bgcolor,
  color,
  hover,
  title,
  onClick,
  disabled,
  icon,
  ...props
}) => {
  return (
    <>
      <Button
        variant={variant || "contained"}
        disabled={disabled}
        disableElevation
        disableRipple
        onClick={onClick}
        type={type}
        sx={{
          bgcolor: bgcolor || "primary",
          color: color || "primary",
          fontSize: "17px",
          fontWeight: "bold",
          textTransform: "unset",
          borderRadius: "32px",
          ...props,
          "&.MuiButton-root": {
            p: 0,
          },
          "&:hover": {
            bgcolor: hover,
          },
        }}
      >
        {icon}
        {title}
      </Button>
    </>
  );
};
