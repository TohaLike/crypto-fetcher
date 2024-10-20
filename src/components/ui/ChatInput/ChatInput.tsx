"use client";
import React from "react";
import { TextField } from "@mui/material";

interface Props {
  name: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

export const ChatInput: React.FC<Props> = ({ name, label, value, onChange }) => {
  return (
    <>
      <TextField
        color="success"
        variant="standard"
        name={name}
        label={label}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        sx={{
           bgcolor: "white"
        }}
      />
    </>
  );
};
