"use client";
import React, { useState } from "react";
import registermodal from "./registermodal.module.scss";
import { AuthButton, AuthInput, SelectInput } from "@/components/ui";
import { Box, Modal, Stack, Typography } from "@mui/material";
import Image from "next/image";

import logo from "../Assets/Icons/logo.svg";

interface Props {}

export const RegisterModal: React.FC<Props> = ({}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <Modal open={true}>
        <Box
          sx={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            padding: "20px 80px",
            bgcolor: "#0E0E0E",
            maxWidth: "600px",
            width: "100%",
            height: "auto",
            borderRadius: "16px",
          }}
        >
          <Stack
            display={"grid"}
            gridTemplateRows={"repeat(4, auto)"}
            rowGap={"20px"}
          >
            <div className={registermodal.modal__icon}>
              <Image src={logo} alt="logo" draggable={false} />
            </div>
            <AuthInput label="Email" value={email} onChange={setEmail} />
            <AuthInput
              label="Password"
              value={password}
              onChange={setPassword}
            />
            <div>
              <Typography
                variant="body1"
                fontWeight={"bold"}
                fontSize={15}
                mb={"10px"}
              >
                Date of birth
              </Typography>
              <Typography
                variant="body2"
                fontWeight={"regular"}
                lineHeight={"normal"}
                fontSize={15}
              >
                This information will not be publicly available. Please confirm
                your age, even if this account is intended for a company, pet,
                etc.
              </Typography>
              <div className={registermodal.modal__select}>
                <SelectInput label="Month" value="" />
                <SelectInput label="Day" value="" />
                <SelectInput label="Year" value="" />

              </div>
            </div>
          </Stack>

          <div className={registermodal.modal__button}>
            <AuthButton title="Next" link="" />
          </div>
        </Box>
      </Modal>
    </>
  );
};
