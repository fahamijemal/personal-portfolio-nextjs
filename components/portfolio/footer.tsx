"use client";

import { Github, Linkedin, Mail, Heart, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/fahamijemal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/fahamijemal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://t.me/fahamijemal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Telegram</span>
            </a>
            <a
              href="mailto:fahamijemal1@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {t.footer.madeWith}{" "}
            <Heart className="h-4 w-4 text-red-500 fill-current" /> by Fahami
            Jemal Harun
          </p>

          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
