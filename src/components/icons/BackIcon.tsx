"use client";
import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

export const BackIcon: React.FC = () => {
  return (
    <SvgIcon>
      <svg
        className="feather feather-arrow-left"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="19" x2="5" y1="12" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </SvgIcon>
  );
};
