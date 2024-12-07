"use client";
import React from "react";
import { ActionButton, PostInput } from "@/components/ui";
import { Box, Divider } from "@mui/material";
import { ImageIcon } from "@/components/icons/ImageIcon";

interface Porps {}

export const AddPost: React.FC = () => {
  return (
    <>
      <div>
        <Box
          sx={{
            m: "10px",
            p: "10px",
            boxSizing: "border-box",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#0E0E0E",
          }}
        >
          <PostInput />
          <Divider
            variant="fullWidth"
            sx={{ "&.MuiDivider-root": { m: "0 0 10px", bgcolor: "#282828" } }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ActionButton
              title=""
              icon={<ImageIcon width={"15px"} height={"15px"} />}
              onClick={() => {}}
              type="button"
              bgcolor="transparent"
              maxWidth={"15px"}
              minHeight={"15px"}
              minWidth={"15px"}
            />
            <ActionButton
              title="Post"
              type="submit"
              icon
              maxWidth={"70px"}
              minHeight={"30px"}
              fontSize={"17px"}
              fontWeight={"500"}
              bgcolor="#fff"
              color="#000"
            />
          </Box>
        </Box>
      </div>
    </>
  );
};
