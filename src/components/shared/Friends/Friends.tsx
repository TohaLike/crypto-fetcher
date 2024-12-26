"use client";
import { ProfileItem } from "@/components/ui/ProfileItem/ProfileItem";
import { useSubscription } from "@/hooks/useSubscription";

export const Friends: React.FC = () => {
  const { subscribtionsData } = useSubscription();

  return (
    <div>
      {subscribtionsData?.subscribers?.map((item: any, index: number) => (
        <ProfileItem
          key={`user-profile-${index}`}
          name={item.name}
          userID={item._id}
          options={item.options}
        />
      ))}
    </div>
  );
};
