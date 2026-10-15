"use client";

import type { ReactNode } from "react";

/** Real document navigation keeps the server document language and profile aligned. */
export function ProfileLanguageLink({
  language,
  children,
  className,
}: {
  language: "en" | "om";
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={language === "en" ? "/" : "/om"}
      hrefLang={language}
      lang={language}
      className={className}
      onClick={() => {
        localStorage.setItem("language", language);
      }}
    >
      {children}
    </a>
  );
}
