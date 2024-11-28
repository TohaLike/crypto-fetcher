import React from "react";
import CustomContainer from "@mui/material/Container";

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return (
    <CustomContainer
      sx={{ maxWidth: 1250, "@media (max-width: 1250px)": { p: 0 } }}
      maxWidth={false}
    >
      {children}
    </CustomContainer>
  );
};
