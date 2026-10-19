"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";

const links = [
  ["Work", "#projects"],
  ["Expertise", "#skills"],
  ["Approach", "#approach"],
  ["About", "#about"],
] as const;
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const trigger = useRef<HTMLButtonElement>(null);
  const href = (hash: string) => (pathname === "/" ? hash : `/${hash}`);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="portfolio-header">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="folio-container header-line">
        <Link
          href="/"
          className="folio-wordmark"
          aria-label="Fahami Jemal Harun home"
        >
          fahami<span>.</span>
          <span className="wordmark-caption">DEVELOPER & FOUNDER</span>
        </Link>
        <nav className="folio-desktop-nav" aria-label="Main navigation">
          {links.map(([label, hash]) => (
            <Link key={hash} href={href(hash)}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="folio-header-actions">
          <button
            className="folio-icon-button theme-button"
            type="button"
            aria-label="Toggle theme"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <Moon className="theme-moon" size={18} aria-hidden="true" />
            <Sun className="theme-sun" size={18} aria-hidden="true" />
          </button>
          <Link className="header-contact" href={href("#contact")}>
            Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button
            ref={trigger}
            type="button"
            className="folio-icon-button folio-menu-trigger"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="folio-mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="folio-mobile-nav"
          className="folio-mobile-nav folio-container"
          aria-label="Mobile navigation"
        >
          {[...links, ["Contact", "#contact"]].map(([label, hash]) => (
            <Link key={hash} href={href(hash)} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
