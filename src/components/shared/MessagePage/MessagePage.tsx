"use client";
import React, { useState, useEffect, useRef } from "react";
import chat from "./chat.module.scss";

import { ChatInput } from "@/components/ui/ChatInput/ChatInput";
import { socket } from "@/socket/socket";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateRoom } from "@/hooks/useCreateRoom";
import { useDebounce } from "@uidotdev/usehooks";
import { useProfile } from "@/hooks/useProfile";
import { TypingIcon } from "@/components/icons/Typing/typing";
import { Box } from "@mui/material";
import { ActionButton, Message } from "@/components/ui";
import { useMessages } from "@/hooks/useMessages";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

import SendIcon from "@mui/icons-material/Send";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { EmojiButton } from "@/components/ui/EmojiButton/EmojiButton";
import { useRoom } from "@/hooks/useRoom";
import { useDebouncedCallback } from "use-debounce";
import { set } from "react-hook-form";

interface Props {
  typing: boolean;
}

export default function MessagePage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const [created, setCreated] = useState<boolean>(false);

  const [typing, setTyping] = useState<boolean>(false);
  const [typingVisible, setTypingVisible] = useState<Props>();

  const searchParams = useSearchParams();
  const search = searchParams.get("res");

  const { profileData } = useProfile({ params: search });

  const { roomTrigger, data, isMutating } = useCreateRoom();

  const { scrollData, setSize, size, ended, isValidating, isLoading } = useMessages({
    search: search,
  });

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
    if (typingTimeout.current && typing) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => setTyping(true), 1000);
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
      setCreated(true);
      socket.emit("send__message", message.trim(), search);
      socket.emit("stopped__typing", search);
      setTyping(false);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.emit("join__room", search);

    return () => {
      socket.off("join__room");
    };
  }, [socket, isMutating]);

  useEffect(() => {
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
      socket.off("send__message");
      socket.off("typing");
      socket.off("stopped__typing");
    };
  }, [socket, messages, isMutating, typing]);

  const test = () => {
    if (socket.connected) {
      console.log("disconnect");
      socket.disconnect();
    } else {
      console.log("connect");
      socket.connect();
    }
  };

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
          {/* <button onClick={test}>test</button> */}
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
              m: "0 10px",
            }}
          >
            <div className={chat.messages__input__emoji}>
              <EmojiButton />
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
              // icon={1}
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
              // icon={21}
            />
          )}
        </div>
      </Box>
    </div>
  );
}
