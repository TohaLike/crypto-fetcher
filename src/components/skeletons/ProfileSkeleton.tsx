"use client";
import React from "react";
import { Skeleton } from "@mui/material";

const POST_SKELETON = [
  { height: "220px" },
  { height: "106px" },
  { height: "200px" },
  { height: "150px" },
  { height: "300px" },
  { height: "200px" },
];

export const ProfileSkeleton: React.FC = () => {
  return (
    <>
      {POST_SKELETON.map((e: any, i: number) => (
        <Skeleton
          key={`skeleton-${i}`}
          variant="rectangular"
          sx={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: "1.5s",
            maxWidth: "700px",
            height: e.height,
            width: "100%",
            bgcolor: "#363636",
            borderRadius: "16px",
            m: "10px 0",
          }}
        />
      ))}
    </>
  );
};
