"use client";
import { ProfileItem } from "@/components/ui/ProfileItem/ProfileItem";
import { useProfiles } from "@/hooks/useProfiles";
import { Box } from "@mui/material";
import React from "react";
export const PeoplesPage: React.FC = () => {
  const { usersData } = useProfiles();

  console.log(usersData);

  return (
    <>
      <Box sx={{ height: "calc(100vh - 50px)", overflowY: "auto" }}>
        {usersData?.map((item, index) => (
          <ProfileItem key={`user-profile-${index}`} name={item.name} userID={item.id} />
        ))}
      </Box>
    </>
  );
};
