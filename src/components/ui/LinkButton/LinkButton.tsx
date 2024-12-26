import { Button } from "@mui/material";
import Link from "next/link";

interface Props {
  variant?: "text" | "outlined" | "contained";
  title: string;
  icon?: React.ReactNode;
  href: string;
  bgcolor?: string;
  hover?: string;
  padding?: string | number;
  [key: string]: any;
}
export const LinkButton: React.FC<Props> = ({
  variant,
  title,
  bgcolor,
  hover,
  icon,
  href,
  padding,
  ...props
}) => {
  return (
    <>
      <Button
        disableElevation
        disableRipple
        LinkComponent={Link}
        href={href || ""}
        sx={{
          width: "100%",
          columnGap: 1,
          backgroundColor: bgcolor || "#1976d2",
          "&:hover": {
            bgcolor: hover,
          },
          "&.MuiButton-root": {
            p: padding || 0,
          },
          ...props,
        }}
      >
        {icon}
        {title}
      </Button>
    </>
  );
};
