"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, MailOpen, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
};

export function MessagesAdminClient({
  initialMessages,
}: {
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const router = useRouter();

  const markAsRead = async (message: Message) => {
    if (message.read) return;

    const supabase = createClient();
    await supabase
      .from("contact_messages")
      .update({ read: true })
      .eq("id", message.id);

    setMessages(
      messages.map((m) => (m.id === message.id ? { ...m, read: true } : m))
    );
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    const supabase = createClient();
    await supabase.from("contact_messages").delete().eq("id", id);
    setMessages(messages.filter((m) => m.id !== id));
    setSelectedMessage(null);
    router.refresh();
  };

  const openMessage = (message: Message) => {
    setSelectedMessage(message);
    markAsRead(message);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          {unreadCount > 0 && (
            <p className="text-muted-foreground mt-1">
              {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={cn(
              "bg-card border-border cursor-pointer transition-colors hover:bg-secondary/50",
              !message.read && "border-l-4 border-l-primary"
            )}
            onClick={() => openMessage(message)}
          >
            <CardHeader className="flex flex-row items-start justify-between py-4">
              <div className="flex items-start gap-3">
                {message.read ? (
                  <MailOpen className="h-5 w-5 text-muted-foreground mt-1" />
                ) : (
                  <Mail className="h-5 w-5 text-primary mt-1" />
                )}
                <div>
                  <CardTitle
                    className={cn(
                      "text-base",
                      !message.read ? "font-bold text-foreground" : "text-foreground"
                    )}
                  >
                    {message.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{message.email}</p>
                  {message.subject && (
                    <p className="text-sm font-medium text-foreground mt-1">
                      {message.subject}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(message.created_at)}
                </span>
                {!message.read && <Badge>New</Badge>}
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-4">
              <p className="text-sm text-muted-foreground line-clamp-2 ml-8">
                {message.message}
              </p>
            </CardContent>
          </Card>
        ))}

        {messages.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No messages yet.
          </p>
        )}
      </div>

      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent className="max-w-2xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Message from {selectedMessage.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">From:</span>
                    <p className="font-medium text-foreground">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium text-foreground">
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Subject:</span>
                    <p className="font-medium text-foreground">
                      {selectedMessage.subject || "No subject"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <p className="font-medium text-foreground">
                      {formatDate(selectedMessage.created_at)}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Message:</span>
                  <p className="mt-2 whitespace-pre-wrap text-foreground">
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button asChild className="flex-1">
                    <a href={`mailto:${selectedMessage.email}`}>Reply via Email</a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
