"use client";
import React from "react";
import moment from "moment";
import { Box, Paper, Typography } from "@mui/material";

import message from "./message.module.scss";

interface Props {
  userId?: string;
  userName?: string;
  createdAt?: string;
  messageText?: string;
  profileDataId?: string;
}

export const Message: React.FC<Props> = ({ createdAt, messageText, userId, profileDataId }) => {
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
            boxSizing: "border-box",
            maxWidth: "60%",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              margin: "4px 8px 5px",
              boxSizing: "border-box",
              letterHeight: "1.3125px",
              fontSize: "16px",
            }}
          >
            {messageText}
            <div className={message.time}>
              <span className={message.time__contaoner}>{moment(createdAt).locale("ru").format("H:mm")}</span>
            </div>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};
