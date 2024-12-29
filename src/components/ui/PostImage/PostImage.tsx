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
  rootWidth?: number | null;
  rootHeight?: number | null;
  [key: string]: any;
};

export const PostImage: React.FC<Props> = ({ src, alt, onClick, rootWidth, rootHeight, ...props }) => {
  return (
    <>
      <div className={postimage.container}>
        <Image
          src={src || ""}
          alt={alt || ""}
          width={rootWidth || 0}
          height={rootHeight || 0}
          sizes="100vw"
          draggable={false}
          // priority={true}
          style={{ objectFit: "cover", aspectRatio: "1", ...props }}
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
