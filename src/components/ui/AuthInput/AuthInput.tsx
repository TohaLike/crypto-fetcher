"use client";
import React from "react";
import { TextField } from "@mui/material";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";

interface Props {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

export const AuthInput: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <>
      <TextField
        label={label || ""}
        value={value}
        color="primary"
        onChange={(event) => onChange && onChange(event.target.value)}
        variant="filled"
        slotProps={{
          input: { disableUnderline: true } as Partial<OutlinedInputProps>,
        }}
        sx={{
          width: "100%",
          "& .MuiInputBase-root": {
            color: "#fff",
          },
          "& label": {
            color: "#7E7E7E",
          },
          "& .MuiFilledInput-root": {
            overflow: "hidden",
            borderRadius: 1.5,
            border: "1px solid",
            backgroundColor: "#000000",
            borderColor: "#282828",
            "&.Mui-focused": {
              borderColor: "primary.main",
            },
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px #307ECC inset",
              WebkitTextFillColor: "ffffff",
            },
          },
        }}
      />
    </>
  );
};
