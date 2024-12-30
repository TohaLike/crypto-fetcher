"use client";
import React from "react";
import { useFollowing } from "@/hooks/useFriends";
import { useParams } from "next/navigation";
import { ProfileItem } from "@/components/ui/ProfileItem/ProfileItem";
import { Box } from "@mui/material";

export const FollowingPage: React.FC = () => {
  const params = useParams();

  const { dataFriends } = useFollowing({ userId: params?.profile });

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
        {dataFriends?.newsFrom?.map((item: any, index: number) => (
          <ProfileItem
            key={`user-profile-${index}`}
            name={item.name}
            userID={item._id}
            options={item.options}
            subscribers={item.subscribers}
          />
        ))}
      </Box>
    </>
  );
};
