"use client";
import React from "react";
import { TextField } from "@mui/material";

interface Props {
  name: string;
  label: string | undefined;
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const ChatInput: React.FC<Props> = ({ name, label, value, placeholder, onChange }) => {
  return (
    <>
      <TextField
        placeholder={placeholder}
        type="text"
        variant={"filled"}
        name={name}
        label={label}
        value={value}
        multiline
        maxRows={10}
        slotProps={{
          input: {
            disableUnderline: true,
          },
        }}
        onChange={(e) => onChange && onChange(e.target.value)}
        sx={{
          bgcolor: "#1A1A1A",
          width: "100%",
          overflow: "hidden",
          "& .MuiFilledInput-root": {
            bgcolor: "#1A1A1A",
            color: "#fff",
          },
          "& .MuiFilledInput-multiline": {
            padding: "11px 0",
          },
          "& .MuiFilledInput-input": {
            padding: "0",
          },
        }}
      />
    </>
  );
};
