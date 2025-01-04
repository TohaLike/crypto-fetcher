"use client";
import React from "react";
import { ProfileItemsSkeleton } from "@/components/skeletons";
import { ProfileItem } from "@/components/ui/ProfileItem/ProfileItem";
import { useSubscription } from "@/hooks/useSubscription";
import { Box } from "@mui/material";

export const Friends: React.FC = () => {
  const { subscribtionsData, subscribtionsLoading } = useSubscription();

  if (subscribtionsLoading) return <ProfileItemsSkeleton />;

  return (
    <Box
      sx={{
        height: "calc(100vh - 50px)",
        overflowY: "auto",
        "@media (max-width: 1170px)": {
          height: "115dvh",
          pb: "210px",
        },
      }}
    >
      {subscribtionsData?.subscribers?.map((item: any, index: number) => (
        <ProfileItem
          key={`user-profile-${index}`}
          name={item.name}
          userID={item._id}
          options={item.options}
          subscribers={item.subscribers}
        />
      ))}
    </Box>
  );
};
