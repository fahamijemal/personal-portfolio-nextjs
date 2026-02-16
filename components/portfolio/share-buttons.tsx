"use client";

import { useState } from "react";
import { Share2, Linkedin, Send, MessageCircle } from "lucide-react";

type ShareButtonsProps = {
  title: string;
};

export function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      label: "Share on X",
      icon: Send,
    },
    {
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      label: "Share on LinkedIn",
      icon: Linkedin,
    },
    {
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      label: "Share on Telegram",
      icon: MessageCircle,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <Share2 className="h-4 w-4" />
        Share
      </span>
      {shareLinks.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
          aria-label={label}
        >
          <Icon className="h-4 w-4" />
          {label}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
