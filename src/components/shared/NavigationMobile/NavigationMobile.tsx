"use client";
import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { HomeIcon, MessageIcon, ProfileIcon } from "@/components/icons";

export const NavigationMobile: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "#707070" }}>
        <BottomNavigation
          sx={{ bgcolor: "#707070" }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<HomeIcon />} />
          <BottomNavigationAction label="Favorites" icon={<MessageIcon />} />
          <BottomNavigationAction label="Nearby" icon={<ProfileIcon />} />
        </BottomNavigation>
      </Box>
    </>
  );
};
