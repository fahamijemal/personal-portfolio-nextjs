"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Award,
  MessageSquare,
  Settings,
  LogOut,
  Home,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

type AdminSidebarProps = {
  user: User;
  onNavigate?: () => void;
  variant?: "sidebar" | "drawer";
  collapsed?: boolean;
};

export function AdminSidebar({
  user,
  onNavigate,
  variant = "sidebar",
  collapsed = false,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleLinkClick = () => {
    onNavigate?.();
  };

  const showLabels = variant === "drawer" || !collapsed;
  const asideWidth = variant === "drawer" ? "w-full" : collapsed ? "w-16" : "w-64";

  const asideClasses =
    variant === "drawer"
      ? "h-full w-full bg-card flex flex-col"
      : cn(
          "fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col transition-[width] duration-200",
          asideWidth
        );

  return (
    <aside className={asideClasses}>
      <div
        className={cn(
          "border-b border-border flex items-center",
          collapsed ? "p-2 justify-center" : "p-6"
        )}
      >
        <Link
          href="/admin"
          className={cn(
            "font-bold text-foreground",
            collapsed ? "flex flex-col items-center gap-0" : "block"
          )}
        >
          {collapsed ? (
            <span className="text-sm">AP</span>
          ) : (
            <>
              <span className="text-xl">Admin Panel</span>
              <p className="text-sm text-muted-foreground mt-1 truncate">
                {user.email}
              </p>
            </>
          )}
        </Link>
      </div>

      <nav
        className={cn(
          "flex-1 space-y-1",
          collapsed ? "p-2" : "p-4"
        )}
      >
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors",
                collapsed ? "px-2 py-2 justify-center" : "px-3 py-2",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {showLabels && item.label}
            </Link>
          );
        })}
      </nav>

      <div className={cn("border-t border-border space-y-2", collapsed ? "p-2" : "p-4")}>
        <Button
          variant="ghost"
          className={cn("w-full", collapsed ? "justify-center px-0" : "justify-start")}
          asChild
        >
          <Link href="/" onClick={handleLinkClick} title={collapsed ? "View Site" : undefined}>
            <Home className="h-4 w-4 shrink-0" />
            {showLabels && <span className="ml-2">View Site</span>}
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "w-full text-destructive hover:text-destructive",
            collapsed ? "justify-center px-0" : "justify-start"
          )}
          onClick={handleSignOut}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {showLabels && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
}
