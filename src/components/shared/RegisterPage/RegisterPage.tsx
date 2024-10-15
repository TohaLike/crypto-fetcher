"use client";
import React, { useState } from "react";
import { ActionButton } from "@/components/ui";
import { RegisterModal } from "../RegisterModal/RegisterModal";

export const RegisterPage: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClose = () => setOpenModal(false);
 

  return (
    <div>
      <ActionButton
        title="Registration"
        type="button"
        onClick={() => setOpenModal(true)}
      />
      <RegisterModal onOpen={openModal} onClose={handleClose} />
    </div>
  );
};
