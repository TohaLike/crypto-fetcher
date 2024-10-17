"use client";
import React, { useState } from "react";
import { ActionButton } from "@/components/ui";
import { RegisterModal } from "../RegisterModal/RegisterModal";
import { useAuthorized } from "@/hooks/useAuthorized";
import { redirect, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// const RegisterModal = dynamic(
//   () => import("../RegisterModal/RegisterModal").then((module) => module.RegisterModal),
//   {
//     loading: () => <div>load</div>,
//     ssr: false,
//   }
// );

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
