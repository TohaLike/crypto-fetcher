"use client";
import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import typing from "./typing.module.scss";

export const TypingIcon: React.FC = () => {
  return (
    <SvgIcon>
      <svg height="40" width="40" className={typing.loader}>
        <circle className={typing.dot} cx="10" cy="20" r="3" style={{ fill: "grey" }} />
        <circle className={typing.dot} cx="20" cy="20" r="3" style={{ fill: "grey" }} />
        <circle className={typing.dot} cx="30" cy="20" r="3" style={{ fill: "grey" }} />
      </svg>
    </SvgIcon>
  );
};
