"use client";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@mui/material";
import { SmileIcon } from "@/components/icons/smile";
import emojibutton from "./emojibutton.module.scss";

export const EmojiButton: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className={emojibutton.container}>
        <EmojiPicker
          open={open}
          onEmojiClick={() => setOpen(false)}
          className={emojibutton.container__emoji}
          width={"300px"}
          height={"400px"}
          style={{ position: "absolute", top: "-420px", left: 0 }}
        />
        <Button
          onClick={() => setOpen(true)}
          sx={{
            "&.MuiButton-root": {
              p: 0,
              minWidth: "24px",
              minHeight: "24px",
              borderRadius: "16px",
              color: "#fff",
            },
          }}
        >
          <SmileIcon />
        </Button>
      </div>
    </>
  );
};
