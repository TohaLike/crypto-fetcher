"use client";
import { ProfileItem } from "@/components/ui/ProfileItem/ProfileItem";
import { useProfiles } from "@/hooks/useProfiles";
import { Box } from "@mui/material";
import React from "react";
export const PeoplesPage: React.FC = () => {
  const { usersData } = useProfiles();

  return (
    <>
      <Box
        sx={{
          height: "calc(100vh - 50px)",
          overflowY: "auto",
          "@media (max-width: 1170px)": {
            height: "100vh",
            pb: "110px"
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
