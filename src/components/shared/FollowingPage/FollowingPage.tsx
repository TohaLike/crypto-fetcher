"use client";
import React from "react";
import { useFollowing } from "@/hooks/useFriends";
import { useParams } from "next/navigation";
import { ProfileItem } from "@/components/ui/ProfileItem/ProfileItem";
import { Box } from "@mui/material";
import { ProfileItemsSkeleton } from "@/components/skeletons";

export const FollowingPage: React.FC = () => {
  const params = useParams();

  const { dataFriends, loadingDataFriends } = useFollowing({ userId: params?.profile });

  if (loadingDataFriends) return <ProfileItemsSkeleton />;

  if (dataFriends?.newsFrom?.length <= 0) return (
    <div>
      nope
    </div>
  )

  return (
    <>
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
