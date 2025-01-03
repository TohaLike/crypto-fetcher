"use client";
import React, { ChangeEvent, useState } from "react";
import profile from "./profile.module.scss";
import { Box, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useUploadOptions } from "@/hooks/useUploadOptions";
import { AddPost } from "@/components/shared/AddPost/AddPost";
import { useLogout } from "@/hooks/useLogout";
import { ActionButton, FriendsChip, Post, PostImage } from "@/components/ui";
import LogoutIcon from "@mui/icons-material/Logout";
import { PostResponse } from "@/models/posts/postsResponse";
import { ProfileSkeleton } from "@/components/skeletons";

interface Props {
  userId?: string;
  name?: string;
  email?: string;
  posts?: any;
  options?: any;
  countFollowers?: number | string;
  countFollowings?: number | string;
  profileLoading?: boolean;
  postLoading?: boolean;
}

function ProfileButton({ onClick, title, type, mutateProfile }: any) {
  return (
    <ActionButton
      type={type}
      title={title || "btn"}
      onClick={onClick}
      // disabled={!uploadMutation ? false : true}
      // title={uploadMutation ? <CircularProgress size={"20px"} sx={{ zIndex: 100 }} /> : "Post"}
      width={"100%"}
      minHeight={"30px"}
      fontSize={"17px"}
      fontWeight={"500"}
      bgcolor="#fff"
      color="#000"
    />
  );
}

export const Profile: React.FC<Props> = ({
  userId,
  name,
  email,
  countFollowers,
  posts,
  options,
  countFollowings,
  profileLoading,
  postLoading,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loadNewImage, setLoadNewImage] = useState<any>([]);

  const [addedPost, setAddedPost] = useState<PostResponse[] | any>([]);

  const concatData = addedPost.concat(posts);

  const sorted = concatData.flat().sort((a: any, b: any) => {
    const dateA = new Date(a?.createdAt);
    const dateB = new Date(b?.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  const { triggerUploadOptions, dataOptions } = useUploadOptions();
  const { logoutTrigger } = useLogout();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImage(imageUrl);
      setContent(e.target.value);
    }
  };

  const uploadImage = async (e: any) => {
    e.preventDefault();
    const formData: FormData = new FormData();

    if (file) {
      formData.append("file", file);
      await triggerUploadOptions(formData).then((e) => {
        window.location.reload();
      });
      setFile(null);
      setImage("");
      setContent("");
    }
  };

  if (profileLoading || postLoading)
    return (
      <>
        <ProfileSkeleton />
      </>
    );

  function Posts() {
    return sorted?.map((post: any, index: number) => (
      <Post
        key={index}
        ownerId={post?.owner?.id}
        owner={post?.owner?.name}
        text={post?.text}
        createdAt={post?.createdAt}
        images={post?.images?.flat()}
        options={post?.owner?.options}
      />
    ));
  }

  return (
    <>
      <Box
        sx={{
          height: "calc(100vh - 50px)",
          overflowY: "auto",
          scrollbarWidth: "thin",
          width: "100%",
          m: "auto",
          "@media (max-width: 1170px)": {
            height: "100dvh",
            pb: "110px",
          },
        }}
      >
        <form method="post" action="/upload_options" encType="multipart/form-data">
          <input
            className={profile.input}
            id="mainImageButton"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            name="file"
            value={content}
          />

          <div className={profile.user__profile__info}>
            {file ? (
              <div className={profile.user__profile__avatar}>
                <div className={profile.modal__photo}>
                  <PostImage src={image} alt={`image-profile`} rootHeight={200} rootWidth={200} />
                </div>
                <div className={profile.user__profile__buttons}>
                  <ProfileButton type="submit" title="Save Image" onClick={uploadImage} />
                  <ProfileButton type="submit" title="Cancel" onClick={() => setFile(null)} />
                  <label htmlFor="mainImageButton" className={profile.user__profile__change}>
                    Change image
                  </label>
                </div>
              </div>
            ) : (
              <>
                <div className={profile.user__profile__avatar}>
                  <div className={profile.user__profile__photo}>
                    <label htmlFor="mainImageButton" className={profile.user__profile__upload}>
                      {options?.image?.length <= 0 ? (
                        <div
                          className={profile.user__profile__upload__icon}
                          style={{
                            backgroundColor: `#${(options?.defaultColor || "1976d2") + "99"}`,
                          }}
                        >
                          <AddPhotoAlternateIcon sx={{ width: 50, height: 50 }} />
                        </div>
                      ) : (
                        <PostImage
                          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${options?.image[0]?.path}`}
                          alt={`image-profile`}
                          rootHeight={200}
                          rootWidth={200}
                          minWidth={200}
                          minHeight={200}
                        />
                      )}
                    </label>
                  </div>
                </div>
                <div className={profile.user__profile__surname}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      maxWidth: "430px",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h2"
                      fontSize={"36px"}
                      fontFamily={"unset"}
                      whiteSpace={"nowrap"}
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      sx={{ "@media (max-width: 700px)": { textAlign: "center" } }}
                    >
                      {name}
                    </Typography>
                    <Typography
                      variant="inherit"
                      fontSize={"16px"}
                      fontWeight={"100"}
                      fontFamily={"unset"}
                      whiteSpace={"nowrap"}
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      sx={{ "@media (max-width: 700px)": { textAlign: "center" } }}
                    >
                      {email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    <FriendsChip
                      title={"Followers"}
                      path={"followers"}
                      countSubscribers={countFollowers}
                      userId={userId}
                    />
                    <FriendsChip
                      title={"Followings"}
                      path={"followings"}
                      countSubscribers={countFollowings}
                      userId={userId}
                    />
                  </Box>

                  <div className={profile.logout}>
                    <ActionButton
                      icon={<LogoutIcon />}
                      onClick={async () => {
                        await logoutTrigger().then(() => {
                          window.location.replace("/");
                        });
                      }}
                      type="button"
                      minWidth={"30px"}
                      minHeight={"30px"}
                      bgcolor="transparent"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </form>

        <AddPost setAddedPost={setAddedPost} addedPost={addedPost} />

        <div>
          <Posts />
        </div>
      </Box>
    </>
  );
};
