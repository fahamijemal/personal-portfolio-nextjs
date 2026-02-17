"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "certificates", href: "#certificates" },
  { key: "blog", href: "#blog" },
  { key: "contact", href: "#contact" },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();

  useEffect(() => {
    const sections = navItems.map((item) => ({
      id: item.href.slice(1),
      element: document.getElementById(item.href.slice(1)),
    }));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActiveSection(id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(({ element }) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            {!profileImageError ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="/api/profile-image"
                alt="Profile photo"
                width={48}
                height={48}
                className="rounded-full object-cover w-12 h-12"
                onError={() => setProfileImageError(true)}
              />
            ) : (
              <div
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0"
                aria-hidden
              >
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-accent-brand"
                      : "text-muted-foreground hover:text-accent-brand"
                  )}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Toggle language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  <span className={cn(language === "en" && "font-bold")}>
                    {t.language.en}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("om")}>
                  <span className={cn(language === "om" && "font-bold")}>
                    {t.language.om}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  {t.theme.light}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  {t.theme.dark}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  {t.theme.system}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-border bg-background"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col px-4 py-2">
            {navItems.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "px-3 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "text-accent-brand"
                      : "text-muted-foreground hover:text-accent-brand"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
