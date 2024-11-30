"use client";
import React, { useState } from "react";
import { ActionButton } from "@/components/ui";
import { RegisterModal } from "../RegisterModal/RegisterModal";
import { useAuthorized } from "@/hooks/useAuthorized";
import { redirect, useRouter } from "next/navigation";
import { LoginModal } from "../LoginModal/LoginModal";
import { Box } from "@mui/material";

export const AuthPage: React.FC = () => {
  const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

  const { isAuthorized, isLoading, userData } = useAuthorized();

  const router = useRouter();

  const handleRegisterClose = () => setOpenRegisterModal(false);

  const handleLoginClose = () => setOpenLoginModal(false);

  return (
    <div>
      {!isAuthorized && (
        <Box
          sx={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
          }}
        >
          <div>
            <ActionButton
              title="Registration"
              type="button"
              onClick={() => setOpenRegisterModal(true)}
              height={"46px"}
              width={"100%"}
              bgcolor="#fff"
              color="#000"
              hover="#E3E3E3"
            />
            <RegisterModal onOpen={openRegisterModal} onClose={handleRegisterClose} />
          </div>
          <div>
            <ActionButton
              title="Login"
              type="button"
              onClick={() => setOpenLoginModal(true)}
              height={"46px"}
              width={"100%"}
              bgcolor="#fff"
              color="#000"
              hover="#E3E3E3"
            />
            <LoginModal onOpen={openLoginModal} onClose={handleLoginClose} />
          </div>
        </Box>
      )}
    </div>
  );
};
