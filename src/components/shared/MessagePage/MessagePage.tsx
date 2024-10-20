"use client";
import React, { useState } from "react";
import { ChatInput } from "@/components/ui/ChatInput/ChatInput";
import { useMessage } from "@/hooks/useMessage";

export default function MessagePage() {
  const [message, setMessage] = useState<string>("");

  const { messageTrigger } = useMessage();

  return (
    <>
      <div>
        <ChatInput name="message" label="Message" value={message} onChange={setMessage} />
        <button onClick={async () => await messageTrigger({ message: message })}>Send</button>
      </div>
    </>
  );
}
