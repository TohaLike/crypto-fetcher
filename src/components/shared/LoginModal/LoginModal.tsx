"use client";
import React from "react";
import loginmodal from "./loginmodal.module.scss";
import { ActionButton, AuthInput, SelectInput } from "@/components/ui";
import { Box, Modal, Stack, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { loginSchema } from "./validate";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

interface Props {
  onOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<Props> = ({ onClose, onOpen }) => {
  const { loginTrigger, loginMutating, loginData } = useLogin();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: object) => {
    loginTrigger(data).then(() => {
      onClose();
      router.push("/home");
    });
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
              <Stack display={"grid"} gridTemplateRows={"repeat(4, auto)"} rowGap={"20px"}>
                <div className={loginmodal.modal__icon}>
                  <span></span>
                </div>
                <AuthInput type="" label="Email" register={form.register("email")} name="email" />
                <div>
                  <div className={loginmodal.modal__password}>
                    <AuthInput
                      type="password"
                      label="Password"
                      register={form.register("password")}
                      name="password"
                    />
                  </div>
                </div>
              </Stack>

              <div className={loginmodal.modal__button}>
                <ActionButton
                  title="Next"
                  type="submit"
                  height={"46px"}
                  width={"100%"}
                  bgcolor="#fff"
                  color="#000"
                  hover="#E3E3E3"
                />
              </div>
            </form>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
};
