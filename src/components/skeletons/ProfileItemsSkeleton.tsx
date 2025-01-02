"use client";
import React from "react";
import { Box, Skeleton } from "@mui/material";

const PROFILE_ITEMS_SKELETON = [
  { height: "72px" },
  { height: "72px" },
  { height: "72px" },
  { height: "72px" },
  { height: "72px" },
  { height: "72px" },
  { height: "72px" },
  { height: "72px" },
  { height: "72px" },
  { height: "72px" },
  { height: "72px" },
  { height: "72px" },
  { height: "72px" },
  { height: "72px" },
  { height: "72px" },
];

export const ProfileItemsSkeleton: React.FC = () => {
  return (
    <Box p={"0 10px"}>
      {PROFILE_ITEMS_SKELETON.map((e: any, i: number) => (
        <Skeleton
          key={`skeleton-${i}`}
          variant="rectangular"
          sx={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: "1.5s",
            // maxWidth: "700px",
            height: e.height,
            width: "100%",
            bgcolor: "#363636",
            borderRadius: "5px",
            m: "10px 0",
          }}
        />
      ))}
    </Box>
  );
};
