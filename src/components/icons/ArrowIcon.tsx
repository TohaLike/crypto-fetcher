"use client";
import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

interface Props {
  [key: string]: any;
  classNmae?: any
}

export const ArrowIcon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <SvgIcon className={className} sx={{ ...props }}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.5 8.25L11 13.75L16.5 8.25"
          stroke="#7E7E7E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
