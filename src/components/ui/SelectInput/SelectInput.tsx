"use client";
import React from "react";
import selectinput from "./selectinput.module.scss";
import { InputAdornment, OutlinedInputProps, TextField } from "@mui/material";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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

export const SelectInput: React.FC<Props> = ({ name, label, array, register }) => {
  // console.log(register);
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
            IconComponent: (e) => <ArrowIcon className={e.className} />,
          },
        }}
        sx={{
          width: "100%",
          "& .MuiInputBase-root": {
            color: "#fff",
            bgcolor: "#000",
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
        <option style={{ color: "#fff", backgroundColor: "#000" }} key={""} value={""}></option>
        {array.map((option) => (
          <option
            key={option?.value}
            style={{ color: "#fff", backgroundColor: "#000", scrollbarWidth: "thin" }}
            value={option?.value}
          >
            {option?.label}
          </option>
        ))}
      </TextField>
    </>
  );
};
