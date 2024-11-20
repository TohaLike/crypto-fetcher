"use client";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

interface Props {
  userId?: string;
  userName?: string;
  createdAt?: string;
  messageText?: string;
  profileDataId?: string;
}

export const Message: React.FC<Props> = ({
  userName,
  createdAt,
  messageText,
  userId,
  profileDataId,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: profileDataId === userId ? "flex-start" : "flex-end",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            bgcolor: profileDataId === userId ? "#545454" : "#1976d2",
            borderRadius: profileDataId === userId ? "16px 16px 16px 0" : "16px 16px 0 16px",
            padding: "10px",
            maxWidth: "60%",
          }}
        >
          <Typography variant="body1" style={{ color: "#FFFFFF" }}>
            {messageText}
          </Typography>
          <Typography variant="body2" style={{ color: "#FFFFFF" }}>
            {createdAt}
          </Typography>
        </Paper>
      </Box>
    </>
  );
};
