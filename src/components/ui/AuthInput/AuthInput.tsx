"use client";
import React from "react";
import { TextField } from "@mui/material";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";

interface Props {
  label: string;
  name: string;
  register: any;
  type: "password" | "email" | "" | undefined;
}

export const AuthInput: React.FC<Props> = ({ label, name, register, type }) => {
  return (
    <>
      <TextField
        autoComplete="on"
        type={type}
        label={label || ""}
        name={name}
        color="primary"
        variant="filled"
        slotProps={{
          htmlInput: {
            maxLength: 55,
          },
          input: {
            ...register,
            name: name,
            disableUnderline: true,
          } as Partial<OutlinedInputProps>,
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
