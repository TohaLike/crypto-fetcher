"use client";
import React, { useContext } from "react";
import { useAuthorized } from "@/hooks/useAuthorized";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import { socket } from "@/socket";
import { useParams } from "next/navigation";
import { useSubscribe } from "@/hooks/useSubscribe";
import { Profile } from "@/components/shared/Profile/Profile";
import { useUserPosts } from "@/hooks/useUserPosts";
import { SocketContext } from "@/app/(home)/provider";
import { UserProfile } from "@/components/shared/UserProfile/UserProfile";

export const ProfilePage: React.FC = () => {
  const { userData } = useContext<any>(SocketContext);

  const params = useParams();

  const { profileData, mutateProfile } = useProfile({ params: params?.profile });
  const { postsData, isLoadingPosts } = useUserPosts({ userId: params?.profile });

  console.log(profileData?.checkSubscribe)

  return (
    <>
      {userData?.id === params?.profile && (
        <Profile
          userId={userData?.id}
          name={profileData?.name}
          email={profileData?.email}
          posts={postsData}
          options={profileData?.options}
          subscribers={userData?.subscribers?.subscribers}
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
        />
      )}
    </>
  );
};
