"use client";
import React from "react";
import postimage from "./postimage.module.scss";
import { Box } from "@mui/material";
import { ActionButton } from "../ActionButton/ActionButton";
import Image from "next/image";

import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  src?: string;
  alt?: string;
  onClick?: (index: any) => void;
  width?: string | number | any;
  height?: string | number | any;
};

export const PostImage: React.FC<Props> = ({ src, alt, onClick, width, height }) => {
  return (
    <>
      <div className={postimage.container}>
        <Image
          src={src || ""}
          alt={alt || ""}
          width={width || 100}
          height={height || 100}
          draggable={false}
          style={{ objectFit: "cover", borderRadius: "7px" }}
        />
        {onClick && (
          <div className={postimage.container__close}>
            <ActionButton
              icon={<ClearIcon />}
              onClick={onClick}
              boxShadow={"0 0 10px blue"}
              border={"1px solid #000"}
              type="button"
              bgcolor="#000"
              minWidth={"24px"}
              minHeight={"24px"}
            />
          </div>
        )}
      </div>
    </>
  );
};
