"use client";
import { useAuthorized } from "@/hooks/useAuthorized";
import { Box, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { userData, isLoading } = useAuthorized();

  if (isLoading) {
    return (
      <Box
        sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box
        sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <Typography variant="inherit" fontSize={"30px"} fontWeight={600}>
          You are not logged in
        </Typography>
        <Typography variant="inherit" fontSize={"24px"}>
          <Link href={"/"}>Redirecting to login page...</Link>
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <div>
        {userData ? (
          children
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography variant="inherit" fontSize={"30px"} fontWeight={600}>
              You are not logged in
            </Typography>
            <Typography variant="inherit" fontSize={"24px"}>
              <Link href={"/"}>Redirecting to login page...</Link>
            </Typography>
          </Box>
        )}
      </div>
    </>
  );
};
