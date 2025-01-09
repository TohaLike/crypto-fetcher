"use client";
import React from "react";
import { ProfileItemsSkeleton } from "@/components/skeletons";
import { ProfileItem } from "@/components/ui/ProfileItem/ProfileItem";
import { useProfiles } from "@/hooks/useProfiles";
import { Box, Typography } from "@mui/material";

export const PeoplesPage: React.FC = () => {
  const { usersData, loadingUsers } = useProfiles();

  if (loadingUsers) return <ProfileItemsSkeleton />;

  if (usersData && usersData?.length <= 0)
    return (
      <div>
        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: "28px",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          No registered users
        </Typography>
      </div>
    );

  return (
    <>
      <Box
        sx={{
          height: "calc(100vh - 50px)",
          overflowY: "auto",
          scrollbarWidth: "thin",
          "@media (max-width: 1170px)": {
            height: "115dvh",
            pb: "210px",
          },
        }}
      >
        {usersData?.map((item, index) => (
          <ProfileItem
            key={`user-profile-${index}`}
            name={item.name}
            userID={item.id}
            options={item.options}
            subscribers={item.subscribers}
          />
        ))}
      </Box>
    </>
  );
};
