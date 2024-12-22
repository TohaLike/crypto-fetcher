"use client";
import React, { useEffect, useState } from "react";
import homepage from "./homepage.module.scss";
import { AddPost } from "../AddPost/AddPost";
import { usePosts } from "@/hooks/usePosts";
import { Post } from "@/components/ui/Post/Post";
import { ActionButton } from "@/components/ui";
import { PostResponse } from "@/models/posts/postsResponse";

export const HomePage: React.FC = () => {
  const [updated, setUpdated] = useState<number>(0);
  const [addedPost, setAddedPost] = useState<PostResponse[] | any>([]);

  const { dataPosts, mutatePosts, error, loadMoreData, intersectionRef } = usePosts();

  useEffect(() => {
    setUpdated(loadMoreData);
  }, [loadMoreData]);

  const loadPosts = async () => {
    await mutatePosts().then(() => {
      setAddedPost([]);
      setUpdated(0);
    });
  };

  const concatData = addedPost.concat(dataPosts?.flat());

  const sorted = concatData.sort((a: any, b: any) => {
    const dateA = new Date(a?.createdAt);
    const dateB = new Date(b?.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <>
      <div className={homepage.container}>
        {/* <AddPost setAddedPost={setAddedPost} addedPost={addedPost} />

        {updated > 0 && (
          <ActionButton
            title={`Show ${loadMoreData} posts`}
            onClick={loadPosts}
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
        )}
        {dataPosts &&
          sorted?.map((e: any, i: number) => (
            <Post
              key={`post-user-${i}`}
              owner={e?.owner?.name}
              text={e?.text}
              createdAt={e?.createdAt}
              images={e?.images?.flat()}
              options={e?.owner?.options}
            />
          ))} */}

        <div ref={error ? null : intersectionRef}>end</div>
      </div>
    </>
  );
};
