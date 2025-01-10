"use client";
import React, { useContext } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useParams } from "next/navigation";
import { Profile } from "@/components/shared/Profile/Profile";
import { useUserPosts } from "@/hooks/useUserPosts";
import { SocketContext } from "@/app/(home)/provider";
import { UserProfile } from "@/components/shared/UserProfile/UserProfile";
import { Box, Typography } from "@mui/material";

export const ProfilePage: React.FC = () => {
  const { userData } = useContext<any>(SocketContext);

  const params = useParams();

  const { profileData, profileLoading } = useProfile({ params: params?.profile });
  const { postsData, isLoadingPosts } = useUserPosts({ userId: params?.profile });

  // function splitString(str: any, length: any) {
  //   let arr: any = str.split(" ");
  //   let arr2: any = [];

  //   arr.map((e: any, i: number) => {
  //     if (i < arr.length && i % 200 === 0) arr2.push(arr.slice(i, i + 200).join(" "));
  //   });

  //   return arr2;
  // }

  if (!profileData)
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", p: "30px 10px" }}>
        <Typography sx={{ fontSize: "18px" }}>User not found</Typography>
      </Box>
    );

  return (
    <>
      {userData?.id === params?.profile && (
        <Profile
          userId={profileData?.id}
          name={profileData?.name}
          email={profileData?.email}
          posts={postsData}
          options={profileData?.options}
          countFollowers={profileData?.countFollowers}
          countFollowings={profileData?.countFollowings}
          profileLoading={profileLoading}
          postLoading={isLoadingPosts}
        />
      )}

      {userData?.id !== params?.profile && (
        <UserProfile
          userId={profileData?.id}
          name={profileData?.name}
          email={profileData?.email}
          posts={postsData}
          options={profileData?.options}
          countFollowers={profileData?.countFollowers}
          countFollowings={profileData?.countFollowings}
          checkSubscribe={profileData?.checkSubscribe}
          profileLoading={profileLoading}
          postLoading={isLoadingPosts}
        />
      )}
    </>
  );
};
