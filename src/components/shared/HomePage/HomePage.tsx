"use client";
import React from "react";
import homepage from "./homepage.module.scss";
import { AddPost } from "../AddPost/AddPost";
import { usePosts } from "@/hooks/usePosts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Post } from "@/components/ui/Post/Post";

export const HomePage: React.FC = () => {
  const { dataPosts, isLoading, isValidating, setSize, size, ended } = usePosts();
  const { intersectionRef } = useInfiniteScroll({ isValidating, setSize, size, ended });

  console.log(dataPosts?.flat());

  return (
    <>
      <div className={homepage.container}>
        <AddPost />
        {dataPosts?.flat()?.map((e, i) => (
          <Post
            key={`post-user-${i}`}
            owner={e?.owner.name}
            text={e?.text}
            createdAt={e?.createdAt}
            images={e?.images.flat()}
          />
        ))}
        <div ref={intersectionRef}></div>
      </div>
    </>
  );
};
