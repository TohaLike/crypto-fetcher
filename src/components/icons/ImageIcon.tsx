"use client";
import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

interface Props {
  [key: string]: any;
}

export const ImageIcon: React.FC<Props> = ({...props}) => {
  return (
    <SvgIcon sx={{ ...props }}>
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_72_141)">
          <path
            d="M11.875 1.875H3.125C2.43464 1.875 1.875 2.43464 1.875 3.125V11.875C1.875 12.5654 2.43464 13.125 3.125 13.125H11.875C12.5654 13.125 13.125 12.5654 13.125 11.875V3.125C13.125 2.43464 12.5654 1.875 11.875 1.875Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.3125 6.25C5.83027 6.25 6.25 5.83027 6.25 5.3125C6.25 4.79473 5.83027 4.375 5.3125 4.375C4.79473 4.375 4.375 4.79473 4.375 5.3125C4.375 5.83027 4.79473 6.25 5.3125 6.25Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.125 9.375L10 6.25L3.125 13.125"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_72_141">
            <rect width="15" height="15" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};
