"use client";
import React from "react";
import { useAuthorized } from "@/hooks/useAuthorized";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import { socket } from "@/socket";
import { useParams } from "next/navigation";
import { useSubscribe } from "@/hooks/useSubscribe";
import { Profile } from "@/components/ui/Profile/Profile";
import { useUserPosts } from "@/hooks/useUserPosts";

export const ProfilePage: React.FC = () => {
  const { userData, isAuthorized } = useAuthorized();

  const router = useRouter();
  const params = useParams();

  const { profileData, mutateProfile } = useProfile({ params: params?.profile });
  const { triggerSubscribe, subscribeData, mutatingSubscribe } = useSubscribe();
  const { postsData, isLoadingPosts } = useUserPosts({ userId: params?.profile });

  const redirectToRoom = () => {
    router.push(`/messages/user?res=${params?.profile}`);
    socket.emit("join__room", params?.profile);
    return;
  };

  const subscribe = async () => {
    await triggerSubscribe({
      userId: profileData?.id,
    });
    return;
  };

  return (
    <>
      {userData?.id === params?.profile && (
        <Profile
          name={profileData?.name}
          email={profileData?.email}
          isAuthorized={isAuthorized}
          profileData={profileData}
          posts={postsData}
          options={profileData?.options}
          mutateProfile={mutateProfile}
        />
      )}

      {userData?.id !== params?.profile && (
        <div>
          <h2>Имя: {profileData?.name}</h2>
          <p>Создан: {profileData?.createdAt}</p>
          <p>Почта: {profileData?.email}</p>

          <button onClick={redirectToRoom}>Начать беседу</button>
          <button onClick={subscribe}>Добавить в друзья</button>
        </div>
      )}
    </>
  );
};
