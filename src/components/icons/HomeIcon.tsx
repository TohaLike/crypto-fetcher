"use client";
import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

type Props = {
  [key: string]: any;
};

export const HomeIcon: React.FC<Props> = ({color, ...props}) => {
  return (
    <SvgIcon sx={{...props}}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_204_99)">
          <path
            d="M3 8.64004L12 1.92004L21 8.64004V19.2C21 19.7093 20.7893 20.1976 20.4142 20.5577C20.0391 20.9178 19.5304 21.12 19 21.12H5C4.46957 21.12 3.96086 20.9178 3.58579 20.5577C3.21071 20.1976 3 19.7093 3 19.2V8.64004Z"
            stroke={color || "#fff"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 21.12V11.52H15V21.12"
            stroke={color || "#fff"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </SvgIcon>
  );
}
