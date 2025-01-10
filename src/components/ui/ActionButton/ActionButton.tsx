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
  padding?: string | number;
  onClick?: (action: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon?: React.ReactNode;
  startIcon?: React.ReactNode;
  borderRadius?: string | number;
  endIcon?: React.ReactNode;
  [props: string]: any;
  ariaControls?: string | undefined | any;
  ariaHaspopup?: boolean | undefined | any;
  ariaExpanded?: boolean | undefined | any;
}

export const ActionButton: React.FC<Props> = ({
  variant,
  type,
  bgcolor,
  color,
  hover,
  padding,
  title,
  onClick,
  disabled,
  icon,
  startIcon,
  endIcon,
  borderRadius,
  ariaControls,
  ariaExpanded,
  ariaHaspopup,
  ...props
}) => {
  return (
    <>
      <Button
        aria-controls={ariaControls || undefined}
        aria-haspopup={ariaHaspopup || undefined}
        aria-expanded={ariaExpanded || undefined}
        variant={variant || "contained"}
        disabled={disabled}
        disableElevation
        disableRipple
        onClick={onClick}
        type={type}
        startIcon={startIcon}
        endIcon={endIcon}
        sx={{
          bgcolor: bgcolor || "primary",
          color: color || "primary",
          fontSize: "17px",
          fontWeight: "bold",
          textTransform: "unset",
          borderRadius: borderRadius || "32px",
          ...props,
          "&.MuiButton-root": {
            p: padding || 0,
          },
          "&:disabled": {
            backgroundColor: "#fff",
            color: "#000",
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
