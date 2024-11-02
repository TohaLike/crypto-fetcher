"use client";
import React, { useState, useEffect } from "react";
import { ChatInput } from "@/components/ui/ChatInput/ChatInput";
import { useAuthorized } from "@/hooks/useAuthorized";
import { socket } from "@/socket/socket";
import { useParams, useSearchParams } from "next/navigation";
import { useMessages } from "@/hooks/useMessages";
import { useRoom } from "@/hooks/useRoom";

export default function MessagePage() {
  const [roomId, setRoomId] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const searchParams = useSearchParams();
  const search = searchParams.get("res")?.split("-")[0];

  const { userData } = useAuthorized();
  const { roomTrigger } = useRoom();
  const { messagesData, loading } = useMessages();

  useEffect(() => {
    socket.on("connect", () => console.log("Connected!"));

    socket.on("room__id", (id) => {
      setRoomId(id);
      console.log(id);
    });

    socket.emit("join__room", searchParams.get("res"));

    socket.on("send__message", (userName, message) => {
      setMessages([...messages, { userName: userName, message: message }]);
    });

    return () => {
      socket.off("send__message");
      socket.off("join__room");
      socket.off("connect");
      socket.off("room__id");
    };
  }, [socket, messages]);

  const sendMessage = (event: any) => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit(
        "send__message",
        userData?.name,
        message,
        userData?.id,
        roomId,
        searchParams.get("res")
      );
      setMessage("");
    }
  };

  console.log(roomId);

  return (
    <>
      <div>
        <ChatInput name="message" label="Message" value={message} onChange={setMessage} />
        <button onClick={sendMessage}>Send</button>
        <div>
          {!messagesData
            ? []
            : messagesData?.map((message: any, key: any) => (
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

          <button
            onClick={async () =>
              await roomTrigger({
                name: userData?.name + " room",
                ownerId: userData?.id,
                userId: search,
              })
            }
          >
            Add room
          </button>
        </div>
      </div>
    </>
  );
}
