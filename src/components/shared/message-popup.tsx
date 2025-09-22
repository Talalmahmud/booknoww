// app/components/MessagePopup.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";

export default function MessagePopup() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    console.log("Message:", message);
    setMessage("");
    // here you can call your API or socket event
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Send Book Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send a Message</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSend} disabled={!message.trim()}>
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
