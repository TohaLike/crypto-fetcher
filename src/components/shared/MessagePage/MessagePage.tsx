"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import chat from "./chat.module.scss";
import { ChatInput } from "@/components/ui/ChatInput/ChatInput";
import { socket } from "@/socket";
import { useSearchParams } from "next/navigation";
import { useCreateRoom } from "@/hooks/useCreateRoom";
import { useRoom } from "@/hooks/useRoom";
import { useProfile } from "@/hooks/useProfile";
import { Box, Typography } from "@mui/material";
import { ActionButton, Message } from "@/components/ui";
import { useMessages } from "@/hooks/useMessages";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { EmojiButton } from "@/components/ui/EmojiButton/EmojiButton";
import { useDebouncedCallback } from "use-debounce";

import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { SocketContext } from "@/app/(home)/provider";

type myKey = {
  [key: string]: any;
};

export const MessagePage: React.FC = () => {
  const { isConnected, transport } = useContext<any>(SocketContext);

  const [isSocket, setIsSocket] = useState<any>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const [typing, setTyping] = useState<boolean>(false);
  const [typingVisible, setTypingVisible] = useState<myKey>();

  const searchParams = useSearchParams();
  const search = searchParams.get("res");

  const { profileData } = useProfile({ params: search });
  const { roomTrigger, data, isMutating } = useCreateRoom();
  const { scrollData, setSize, size, ended, isValidating, isLoading } = useMessages();
  const { intersectionRef } = useInfiniteScroll({ isValidating, setSize, size, ended });
  const { dataRoom } = useRoom();

  let typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = useDebouncedCallback((value) => {
    if (value.length <= 0 || value === message || value === "") {
      setTyping(false);
      socket.emit("stopped__typing", search);
    }
  }, 2000);

  const handleInputChange = (event: any) => {
    setTyping(true);
    debounce(event);
    setMessage(event);
  };

  const sendMessage = (event: any) => {
    event.preventDefault();

    if (message.trim()) {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);

      socket.emit("send__message", message.trim(), search);
      socket.emit("stopped__typing", search);
      setTyping(false);
      setMessage("");
    }
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
    if (isConnected) socket.emit("join__room", search);
    console.log("connect", isConnected);

    return () => {
      socket.off("join__room");
    };
  }, [socket, isConnected, isMutating]);

  useEffect(() => {
    if (typing) {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(() => socket.emit("typing", search), 500);
    }

    socket.on("typing", (data) => setTypingVisible(data));

    socket.on("stopped__typing", (data) => setTypingVisible(data));

    socket.on("send__message", (userName, message, userId, createdAt) => {
      setMessages([
        ...messages,
        { userName: userName, message: message, userId: userId, createdAt: createdAt },
      ]);
    });

    return () => {
      socket.off("send__message");
      socket.off("typing");
      socket.off("stopped__typing");
    };
  }, [socket, isConnected, messages, isMutating, typing]);

  const test = () => {
    if (socket.connected) {
      console.log("disconnect");
      socket.disconnect();
    } else {
      console.log("connect");
      socket.connect();
    }
  };

  if (isLoading) {
    return (
      <div className={chat.chat__container}>
        <div className={chat.chat__container__response}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className={chat.chat__container}>
        <div className={chat.chat__container__response}>
          <Typography></Typography>
          <Typography variant="inherit" fontSize={32}>
            User not found
          </Typography>
          <Link href="/messages">Back to Messages</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={chat.chat__container}>
      <div className={chat.chat__container__messages}>
        <ChatHeader
          userData={profileData}
          userActivity={typingVisible?.typing ? profileData?.name + " is typing..." : "Online"}
        />

        <div className={chat.messages}>
          <div className={chat.messages__content}>
            {scrollData
              ?.flat()
              .reverse()
              ?.map((message: any, key: any) => (
                <Message
                  key={key}
                  userName={message?.userName}
                  createdAt={message?.createdAt}
                  messageText={message?.message}
                  userId={message?.userId}
                  profileDataId={profileData?.id}
                />
              ))}
            {messages?.map((message, key) => (
              <Message
                key={key}
                userName={message?.userName}
                createdAt={message?.createdAt}
                messageText={message?.message}
                userId={message?.userId}
                profileDataId={profileData?.id}
              />
            ))}
          </div>
          <div ref={intersectionRef} className={chat.messages__spacer__loader}></div>
        </div>

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
              p: "0 20px 0 15px",
              m: "0 10px 0 0",
            }}
          >
            <button onClick={test}>tsst</button>
            <div className={chat.messages__input__emoji}>
              <EmojiButton setMessage={setMessage} />
            </div>

            <ChatInput
              name="message"
              placeholder="Message"
              label=""
              value={message}
              onChange={handleInputChange}
            />
          </Box>
          {!dataRoom && !data ? (
            <ActionButton
              type="submit"
              title=""
              variant="contained"
              onClick={createRoom}
              disabled={isLoading}
              bgcolor="#6128ff"
              minWidth="45px"
              height="45px"
              icon={<SendIcon sx={{ fontSize: "24px", color: "#fff" }} />}
            />
          ) : (
            <ActionButton
              type="submit"
              title=""
              variant="contained"
              onClick={sendMessage}
              disabled={isLoading}
              bgcolor="#6128ff"
              minWidth="45px"
              height="45px"
              icon={<SendIcon sx={{ fontSize: "24px", color: "#fff" }} />}
            />
          )}
        </div>
      </div>
    </div>
  );
};
