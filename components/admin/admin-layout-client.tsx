"use client";

import { useState } from "react";
import { Menu, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";

export function AdminLayoutClient({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <AdminSidebar user={user} collapsed={sidebarCollapsed} />
      </div>

      {/* Mobile menu - Sheet drawer */}
      <div className="md:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed left-4 top-4 z-40 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <AdminSidebar
              user={user}
              onNavigate={() => setSheetOpen(false)}
              variant="drawer"
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <main
        className={cn(
          "flex-1 p-4 md:p-8 min-w-0 transition-[margin-left] duration-200",
          sidebarCollapsed ? "md:ml-16" : "md:ml-64"
        )}
      >
        {/* Spacer for mobile menu button */}
        <div className="h-12 md:hidden" />
        {/* Desktop: collapse toggle */}
        <div className="hidden md:flex mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <PanelLeft className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </Button>
        </div>
        {children}
      </main>
    </div>
  );
}
