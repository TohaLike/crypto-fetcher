"use client";
import { useMemo, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Button, Menu } from "@mui/material";
import { SmileIcon } from "@/components/icons/smile";
import emojibutton from "./emojibutton.module.scss";

interface Props {
  setMessage: (message: any) => void;
}

export const EmojiButton: React.FC<Props> = ({ setMessage }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getSicker = useMemo(() => {
    return (
      <div className={emojibutton.container__emoji}>
        <EmojiPicker
          onEmojiClick={(value) => setMessage((prev: any) => prev + value.emoji)}
          lazyLoadEmojis={false}
          style={{ borderRadius: "16px" }}
          skinTonesDisabled
          searchPlaceHolder="Search"
          previewConfig={{
            showPreview: false,
          }}
        />
      </div>
    );
  }, [open, setMessage, EmojiPicker]);

  return (
    <>
      <div className={emojibutton.container}>
        <Menu
          sx={{
            "& .MuiPaper-root": {
              bgcolor: "transparent",
            },
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getSicker}
        </Menu>

        <div>
          <Button
            onClick={handleClick}
            sx={{
              "&.MuiButton-root": {
                p: 0,
                minWidth: "24px",
                minHeight: "24px",
                borderRadius: "16px",
                color: "#707070",
              },
            }}
          >
            <SmileIcon />
          </Button>
        </div>
      </div>
    </>
  );
};
