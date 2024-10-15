"use client";
import React from "react";
import { Box, OutlinedInputProps, TextField } from "@mui/material";
import Image from "next/image";

import arrow from "@/components/shared/Assets/Icons/arrow.svg";

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  name: string;
  label: string;
  array: Option[];
  register: any;
}

export const SelectInput: React.FC<Props> = ({
  name,
  label,
  array,
  register,
}) => {
  return (
    <>
      <TextField
        variant="filled"
        select
        label={label || ""}
        defaultValue={""}
        slotProps={{
          input: {
            disableUnderline: true,
            ...register,
            name: name,
          } as Partial<OutlinedInputProps>,
          select: {
            native: true,
            IconComponent: () => (
              <Box sx={{ position: "absolute", top: "18px", right: "5px" }}>
                <Image src={arrow} alt="arrow" draggable={false} />
              </Box>
            ),
          },
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
      >
        <option key={""} value={""}></option>
        {array.map((option) => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </TextField>
    </>
  );
};
