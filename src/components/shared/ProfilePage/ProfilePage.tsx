"use client";
import React, { useContext } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useParams } from "next/navigation";
import { Profile } from "@/components/shared/Profile/Profile";
import { useUserPosts } from "@/hooks/useUserPosts";
import { SocketContext } from "@/app/(home)/provider";
import { UserProfile } from "@/components/shared/UserProfile/UserProfile";

export const ProfilePage: React.FC = () => {
  const { userData } = useContext<any>(SocketContext);

  const params = useParams();

  const { profileData, mutateProfile } = useProfile({ params: params?.profile });
  const { postsData, isLoadingPosts } = useUserPosts({ userId: params?.profile });

  return (
    <>
      {userData?.id === params?.profile && (
        <Profile
          userId={profileData?.id}
          name={profileData?.name}
          email={profileData?.email}
          posts={postsData}
          options={profileData?.options}
          subscribers={profileData?.subscribers?.subscribers}
          following={profileData?.following}
        />
      )}

      {userData?.id !== params?.profile && (
        <UserProfile
          userId={profileData?.id}
          name={profileData?.name}
          email={profileData?.email}
          posts={postsData}
          options={profileData?.options}
          subscribers={profileData?.subscribers?.subscribers}
          checkSubscribe={profileData?.checkSubscribe}
          following={profileData?.following}
        />
      )}
    </>
  );
};
