"use client";
import React from "react";
import homepage from "./homepage.module.scss";
import { AddPost } from "../AddPost/AddPost";


export const HomePage: React.FC = () => {
  return (
    <>
      <div className={homepage.container}>
        <AddPost />
      </div>
    </>
  );
};
