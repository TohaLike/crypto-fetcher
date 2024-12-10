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
};

export const PostImage: React.FC<Props> = ({ src, alt, onClick }) => {
  return (
    <>
      <div className={postimage.container}>
        <Image
          src={src || ""}
          alt={alt || ""}
          width={100}
          height={100}
          style={{ objectFit: "cover", borderRadius: "16px" }}
        />
        <div className={postimage.container__close}>
          <ActionButton
            icon={<ClearIcon />}
            onClick={onClick}
            type="button"
            bgcolor="transparent"
            minWidth={"24px"}
            minHeight={"24px"}
          />
        </div>
      </div>
    </>
  );
};
