"use client";
import React, { useState, useEffect, useRef } from "react";
import chat from "./chat.module.scss";

import { ChatInput } from "@/components/ui/ChatInput/ChatInput";
import { socket } from "@/socket/socket";
import { useRouter, useSearchParams } from "next/navigation";
import { useRoom } from "@/hooks/useRoom";
import { useDebounce } from "@uidotdev/usehooks";
import { useProfile } from "@/hooks/useProfile";
import { TypingIcon } from "@/components/icons/Typing/typing";
import { Box } from "@mui/material";
import { ActionButton, Message } from "@/components/ui";
import { useMessages } from "@/hooks/useMessages";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

import EmojiPicker from 'emoji-picker-react';

import SendIcon from "@mui/icons-material/Send";
import { ChatHeader } from "../ChatHeader/ChatHeader";

interface Props {
  typing: boolean;
}

export default function MessagePage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const [typing, setTyping] = useState<boolean>(false);
  const [typingVisible, setTypingVisible] = useState<Props>();

  const debouncedSearchTerm = useDebounce(message, 2000);

  const searchParams = useSearchParams();
  const search = searchParams.get("res");

  const { profileData } = useProfile({ params: search });

  const { roomTrigger, isMutating } = useRoom();

  const { scrollData, setSize, size, ended, isValidating } = useMessages({
    search: search,
  });

  const { intersectionRef } = useInfiniteScroll({ isValidating, setSize, size, ended });

  const sendMessage = (event: any) => {
    event.preventDefault();

    if (message.trim()) {
      socket.emit("send__message", message.trim(), search);
      socket.emit("stopped__typing", search);
      setTyping(false);
      setMessage("");
    }
  };

  const handleInputChange = (event: any) => {
    setMessage(event);
    setTyping(true);
  };

  const createRoom = async () => {
    await roomTrigger({
      userId: search,
      lastMessage: message.trim(),
    });

    if (message.trim()) {
      socket.emit("send__message", message.trim(), search);
      socket.emit("stopped__typing", search);
      setTyping(false);
      setMessage("");
    }
  };

  useEffect(() => {
    setTyping(false);
    socket.emit("stopped__typing", search);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    socket.emit("join__room", search);

    return () => {
      socket.off("join__room");
    };
  }, [socket, isMutating]);

  useEffect(() => {
    socket.on("connect", () => console.log("Connected!"));

    if (typing) socket.emit("typing", search);

    socket.on("typing", (data) => setTypingVisible(data));

    socket.on("stopped__typing", (data) => setTypingVisible(data));

    socket.on("send__message", (userName, message, userId, createdAt) => {
      setMessages([
        ...messages,
        { userName: userName, message: message, userId: userId, createdAt: createdAt },
      ]);
    });

    return () => {
      socket.off("connect");
      socket.off("send__message");
    };
  }, [socket, messages, isMutating, typing]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 50px)",
          // maxWidth: "760px",
          width: "100%",
          // margin: "auto",
        }}
      >
        <ChatHeader userData={profileData} />

        <div className={chat.messages}>
          <div className={chat.messages__content}>
            {scrollData
              ?.flat()
              .reverse()
              ?.map((message: any, key: any) => (
                <Message
                  key={key}
                  userName={message.userName}
                  createdAt={message.createdAt}
                  messageText={message.message}
                  userId={message.userId}
                  profileDataId={profileData?.id}
                />
              ))}
            {messages?.map((message, key) => (
              <Message
                key={key}
                userName={message.userName}
                createdAt={message.createdAt}
                messageText={message.message}
                userId={message.userId}
                profileDataId={profileData?.id}
              />
            ))}
          </div>
          <div ref={intersectionRef} className={chat.messages__spacer__loader}></div>
        </div>
        {/* <Box>
          {profileData?.name} {typingVisible?.typing ? <TypingIcon /> : ""}
        </Box> */}
        <div className={chat.messages__input}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              columnGap: "10px",
              bgcolor: "#1A1A1A",
              height: "auto",
              borderRadius: "16px",
              p: "0 20px",
              m: "0 10px",
            }}
          >
                  {/* <EmojiPicker /> */}

            {/* <ActionButton
              type="submit"
              title="CR"
              onClick={createRoom}
              fontSize="14px"
              minWidth="40px"
              height="40px"
              m="0 0 3px"
            /> */}
            <ChatInput
              name="message"
              placeholder="Message"
              label=""
              value={message}
              onChange={handleInputChange}
            />
          </Box>

          <ActionButton
            type="submit"
            title=""
            variant="contained"
            onClick={sendMessage}
            // disabled={loading}
            bgcolor="#6128ff"
            minWidth="45px"
            height="45px"
            icon={<SendIcon sx={{ fontSize: "24px", color: "#fff" }} />}
          />
        </div>
      </Box>
    </div>
  );
}
