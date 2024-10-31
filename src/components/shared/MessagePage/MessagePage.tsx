"use client";
import React, { useState, useEffect } from "react";
import { ChatInput } from "@/components/ui/ChatInput/ChatInput";
import { useAuthorized } from "@/hooks/useAuthorized";
import { socket } from "@/socket/socket";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useMessages } from "@/hooks/useMessages";
import SocketService from "@/services/SocketService";

export default function MessagePage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const searchParams = useSearchParams();
  const search = searchParams.get("res");

  const { userData } = useAuthorized();
  const { messagesData, mutate, loading } = useMessages();

  useEffect(() => {
    socket.on("connect", () => console.log("Connected!"));

    socket.emit("join__room", search);

    socket.on("send__message", (userName, message) => {
      setMessages([...messages, { userName: userName, message: message }]);
    });

    return () => {
      socket.off("send__message");
      socket.off("join__room");
      socket.off("connect");
    };
  }, [socket, messages]);

  useEffect(() => {
    socket.emit("room__id", search);
    return () => {
      socket.off("room__id");
    };
  }, []);

  const sendMessage = (event: any) => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit("send__message", userData?.name, message, userData?.id, search);
      setMessage("");
    }
  };

  return (
    <>
      <div>
        {/* <button onClick={async () => await mutate(SocketService.getMessages())}>test</button> */}

        <ChatInput name="message" label="Message" value={message} onChange={setMessage} />
        <button onClick={sendMessage}>Send</button>
        <div>
          {loading
            ? "Loading..."
            : messagesData?.map((message: any, key: any) => (
                <div key={key}>
                  <p style={{ color: "white" }}>
                    {key}: {message.message}
                  </p>
                </div>
              ))}

          {messages?.map((message, key) => (
            <div key={key}>
              <p style={{ color: "white" }}>{`${message.userName}: ` + message.message}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
