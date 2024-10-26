"use client";
import React, { useState, useEffect } from "react";
import { ChatInput } from "@/components/ui/ChatInput/ChatInput";
import { useMessage } from "@/hooks/useMessage";
import { useAuthorized } from "@/hooks/useAuthorized";
import { socket } from "@/socket/socket";

export default function MessagePage() {
  const [isMessages, setISmessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const { userData } = useAuthorized();
  const { messageTrigger } = useMessage();

  const sendMessage = () => {
    socket.emit("send__message", { message: message, userId: userData?.id });
  };

  return (
    <>
      <div>
        <ChatInput name="message" label="Message" value={message} onChange={setMessage} />
        <button
          onClick={async () => {
            await messageTrigger({ message: message, userId: userData?.id });
            sendMessage()
          }}
        >
          Send
        </button>
      </div>
    </>
  );
}
