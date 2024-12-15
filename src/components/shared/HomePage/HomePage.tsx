"use client";
import React from "react";
import homepage from "./homepage.module.scss";
import { AddPost } from "../AddPost/AddPost";
import { usePosts } from "@/hooks/usePosts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Post } from "@/components/ui/Post/Post";
import { ActionButton } from "@/components/ui";
import { useLoadMore } from "@/hooks/useLoadMore";

export const HomePage: React.FC = () => {
  const { loadMoreData } = useLoadMore();
  const { dataPosts, isLoading, isValidating, setSize, size, ended, mutate } = usePosts();
  const { intersectionRef } = useInfiniteScroll({ isValidating, setSize, size, ended });

  return (
    <>
      <div className={homepage.container}>
        <AddPost />

        <ActionButton
          title="Show posts"
          onClick={() => mutate()}
          type="button"
          width={"100%"}
          bgcolor="#0E0E0E"
          color="#00EAFF"
          boxSizing={"border-box"}
          fontSize={"15px"}
          fontWeight={"100"}
          height={"100%"}
          maxHeight={"30px"}
        />

        {!dataPosts ? "" : dataPosts?.flat()?.map((e, i) => (
          <Post
            key={`post-user-${i}`}
            owner={e?.owner?.name}
            text={e?.text}
            createdAt={e?.createdAt}
            images={e?.images?.flat()}
          />
        ))}
        <div ref={intersectionRef}>end</div>
      </div>
    </>
  );
};
