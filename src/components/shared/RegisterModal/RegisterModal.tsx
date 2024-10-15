"use client";
import React, { useState } from "react";
import registermodal from "./registermodal.module.scss";
import { ActionButton, AuthInput, SelectInput } from "@/components/ui";
import { Box, Modal, Stack, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { observer } from "mobx-react-lite";
import { stateAauth } from "@/store/store";
import Image from "next/image";

import logo from "../Assets/Icons/logo.svg";
import { useRouter } from "next/navigation";
import { useRegistration } from "@/hooks/useAuth";
import { FormProvider, useForm } from "react-hook-form";
import { registrationSchema } from "./validate";

const yearArr = Array.from({ length: 100 }, (_, i) => ({
  value: (2024 - i).toString(),
  label: (2024 - i).toString(),
}));

const monthArr = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const dayArr = Array.from({ length: 31 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

export const RegisterModal: React.FC<Props> = observer(
  ({ onClose, onOpen }) => {
    const form = useForm({
      resolver: zodResolver(registrationSchema),
      defaultValues: {
        email: "",
        password: "",
        date: {
          day: "",
          month: "",
          year: "",
        },
      },
    });

    const { registrationTrigger } = useRegistration();

    const router = useRouter();

    const onSubmit = (data: any) => {
      // try {
      console.log(data);
      //   // router.push("/activate")
      //   // stateAauth.registration(email, password, date)
      //   await registrationTrigger(data);
      // } catch (e) {
      //   console.log(e);
      // }

      stateAauth.registration(data?.email, data?.password, data?.day, data?.month, data?.year);
    };

    return (
      <>
        <Modal open={onOpen} onClose={onClose}>
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
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack
                  display={"grid"}
                  gridTemplateRows={"repeat(4, auto)"}
                  rowGap={"20px"}
                >
                  <div className={registermodal.modal__icon}>
                    <Image src={logo} alt="logo" draggable={false} />
                  </div>

                  <AuthInput
                    label="Email"
                    register={form.register("email")}
                    name="email"
                  />
                  <AuthInput
                    label="Password"
                    register={form.register("password")}
                    name="password"
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
                      textAlign={"start"}
                    >
                      This information will not be publicly available. Please
                      confirm your age, even if this account is intended for a
                      company, pet, etc.
                    </Typography>
                    <div className={registermodal.modal__select}>
                      <SelectInput
                        name="month"
                        label="Month"
                        array={monthArr}
                        register={form.register("date.month")}
                      />
                      <SelectInput
                        name="day"
                        label="Day"
                        array={dayArr}
                        register={form.register("date.day")}
                      />
                      <SelectInput
                        name="year"
                        label="Year"
                        array={yearArr}
                        register={form.register("date.year")}
                      />
                    </div>
                  </div>
                </Stack>

                <div className={registermodal.modal__button}>
                  <ActionButton title="Next" type="submit" />
                </div>
              </form>
            </FormProvider>
          </Box>
        </Modal>
      </>
    );
  }
);
