"use client";
import { AddFriendItem } from "@/components/ui";
import { useSubscription } from "@/hooks/useSubscription";

export const Friends: React.FC = () => {
  const { subscribtionsData } = useSubscription();

  return (
    <div>
      {subscribtionsData?.subscribers?.map((item: any, index: number) => (
        <AddFriendItem
          key={`user-profile-${index}`}
          name={item.name}
          userID={item._id}
          options={item.options}
        />
      ))}
    </div>
  );
};
