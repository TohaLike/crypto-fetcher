"use client";
import React, { useState, useEffect } from "react";
import { ChatInput } from "@/components/ui/ChatInput/ChatInput";
import { socket } from "@/socket/socket";
import { useRouter, useSearchParams } from "next/navigation";
import { useMessages } from "@/hooks/useMessages";
import { useRoom } from "@/hooks/useRoom";

export default function MessagePage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const searchParams = useSearchParams();
  const search = searchParams.get("res");
  const router = useRouter();

  const { roomTrigger } = useRoom();

  const { messagesData, loading } = useMessages();

  const sendMessage = (event: any) => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit("send__message", message, search);
      setMessage("");
    }
  };

  const createRoom = async () => {
    await roomTrigger({
      userId: search,
      lastMessage: message,
    });

    if (message.trim()) {
      socket.emit("send__message", message, search);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("connect", () => console.log("Connected!"));

    socket.emit("join__room", search);

    socket.on("send__message", (userName, message) => {
      setMessages([...messages, { userName: userName, message: message }]);
    });

    return () => {
      socket.off("connect");
      socket.off("send__message");
      socket.off("join__room");
    };
  }, [socket, messages, messagesData, createRoom]);

  return (
    <>
      <div>
        <div>{messagesData?.roomData.usersId[0].name}</div>

        <ChatInput name="message" label="Message" value={message} onChange={setMessage} />
        <button onClick={sendMessage}>Send</button>
        <div>
          {!messagesData
            ? []
            : messagesData.messages?.map((message: any, key: any) => (
                <div key={key}>
                  <p style={{ color: "white" }}>
                    {message.sender}: {message.message}
                  </p>
                </div>
              ))}

          {messages?.map((message, key) => (
            <div key={key}>
              <p style={{ color: "white" }}>{`${message.userName}: ` + message.message}</p>
            </div>
          ))}

          <button onClick={createRoom}>Add room</button>
        </div>
      </div>
    </>
  );
}
