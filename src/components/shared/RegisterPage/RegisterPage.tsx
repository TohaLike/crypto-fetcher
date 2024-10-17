"use client";
import React, { useState } from "react";
import { ActionButton } from "@/components/ui";
import { RegisterModal } from "../RegisterModal/RegisterModal";
import { useAuthorized } from "@/hooks/useAuthorized";
import { redirect, useRouter } from "next/navigation";

export const RegisterPage: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { isAuthorized, isLoading } = useAuthorized();

  const router = useRouter();

  const handleClose = () => setOpenModal(false);

  // if (isAuthorized) redirect("/home");

  return (
    <div>
      {!isAuthorized && (
        <div>
          <ActionButton title="Registration" type="button" onClick={() => setOpenModal(true)} />
          <RegisterModal onOpen={openModal} onClose={handleClose} />
        </div>
      )}
    </div>
  );
};
