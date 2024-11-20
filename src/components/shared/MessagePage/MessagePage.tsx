"use client";
import React, { useState, useEffect, useRef } from "react";
import chat from "./chat.module.scss";

import { ChatInput } from "@/components/ui/ChatInput/ChatInput";
import { socket } from "@/socket/socket";
import { useRouter, useSearchParams } from "next/navigation";
import { useMessages } from "@/hooks/useMessages";
import { useRoom } from "@/hooks/useRoom";
import { useDebounce } from "@uidotdev/usehooks";
import { useProfile } from "@/hooks/useProfile";
import { TypingIcon } from "@/components/icons/Typing/typing";
import { Box } from "@mui/material";
import { ActionButton } from "@/components/ui";

import SendIcon from "@mui/icons-material/Send";
import { Message } from "@/components/ui/Message/Message";

export default function MessagePage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const [typing, setTyping] = useState<boolean>(false);
  const [typingVisible, setTypingVisible] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const debouncedSearchTerm = useDebounce(message, 2000);

  const searchParams = useSearchParams();
  const search = searchParams.get("res");

  const { profileData } = useProfile({ params: search });

  const { roomTrigger, isMutating } = useRoom();

  const { messagesData, loading } = useMessages();

  const sendMessage = (event: any) => {
    event.preventDefault();

    if (message.trim()) {
      socket.emit("send__message", message, search);
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
      lastMessage: message,
    });

    if (message.trim()) {
      socket.emit("send__message", message, search);
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
  }, [socket, messagesData, isMutating]);

  useEffect(() => {
    socket.on("connect", () => console.log("Connected!"));

    messagesEndRef.current?.scrollIntoView();

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
  }, [socket, messages, messagesData, isMutating, typing]);

  return (
    <>
      {/* <div>
          {profileData?.name} {typingVisible ? <TypingIcon /> : ""}
        </div> */}
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div className={chat.messages}>
          <div className={chat.messages__content}>
            {!messagesData
              ? []
              : messagesData?.map((message: any, key: any) => (
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
            <div ref={messagesEndRef}></div>
          </div>
        </div>

        <div className={chat.container}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              columnGap: "10px",
              bgcolor: "#1A1A1A",
              height: "auto",
              borderRadius: "16px",
              p: "0 16px",
              m: "0 10px",
            }}
          >
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
            disabled={loading}
            bgcolor="#6128ff"
            minWidth="45px"
            height="45px"
            icon={<SendIcon sx={{ fontSize: "24px", color: "#fff" }} />}
          />
        </div>
      </Box>
    </>
  );
}
