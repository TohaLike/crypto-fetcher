"use client";
import { useAuthorized } from "@/hooks/useAuthorized";

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { userData } = useAuthorized();

  return (
    <>
      <div>{userData && children}</div>
    </>
  );
};
