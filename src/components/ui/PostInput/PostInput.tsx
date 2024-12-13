"use client";
import React from "react";
import { Box, TextField } from "@mui/material";

interface Props {
  setText?: (value: string) => void;
  text?: string;
}

export const PostInput: React.FC<Props> = ({ text, setText }) => {
  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "#0E0E0E" }}>
        <TextField
          type="text"
          variant="filled"
          placeholder={"What's on your mind?"}
          label=""
          multiline
          color="primary"
          value={text || ""}
          onChange={(e) => setText && setText(e.target.value)}
          maxRows={3}
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
          sx={{
            bgcolor: "#1A1A1A",
            width: "100%",
            overflow: "hidden",
            "& .MuiFilledInput-root": {
              bgcolor: "#0E0E0E",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "500",
            },
            "& .MuiFilledInput-multiline": {
              padding: "5.5px 0",
            },
            "& .MuiFilledInput-input": {
              padding: "0",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "gray",
              fontSize: "20px",
              fontWeight: "500",
            },
           
          }}
        />
      </Box>
    </>
  );
};
