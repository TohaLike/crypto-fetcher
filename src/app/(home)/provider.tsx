"use client";
import { useAuthorized } from "@/hooks/useAuthorized";
import { socket } from "@/socket/socket";
import { Box, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { userData, isLoading } = useAuthorized();

  // if (isLoading) {
  //   return (
  //     <Box
  //       sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // if (!userData) {
  //   return (
  //     <Box
  //       sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
  //     >
  //       <Typography variant="inherit" fontSize={"30px"} fontWeight={600}>
  //         You are not logged in
  //       </Typography>
  //       <Typography variant="inherit" fontSize={"24px"}>
  //         <Link href={"/"}>Redirecting to login page...</Link>
  //       </Typography>
  //     </Box>
  //   );
  // }

  useEffect(() => {
    socket.connect();
    socket.emit("join__rooms");
    socket.on("connection",(data) => {
      console.log(data, "!");
    })


  
    return () => {
      socket.disconnect();
      socket.off("join__rooms");
    }
  }, [socket]);

  return (
    <>
      <div>{userData && children}</div>
    </>
  );
};
