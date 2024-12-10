"use client";
import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

export const MainIcon: React.FC = () => {
  return (
    <SvgIcon sx={{width: "32px", height: "32px"}}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_22_2)">
          <circle cx="16" cy="16" r="15.5" fill="#000000" stroke="white" />

          <path d="M16 6L18.5 12H13.5L16 6Z" fill="#4FD1C5" />
          <path d="M16 26L13.5 20H18.5L16 26Z" fill="#4FD1C5" />

          <text
            x="16"
            y="19"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="8"
            fontWeight="bold"
            fill="white"
          >
            CF
          </text>
        </g>
        <defs>
          <clipPath id="clip0_22_2">
            <rect width="31.9565" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};
