"use client";

import { Sidebar, MobileSidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/topbar";
import { CommandPalette } from "@/components/layout/command-palette";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {/* Skip to main content (a11y) */}
      <a href="#main-content" className="skip-to-content">Skip to main content</a>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      <MobileSidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar />
        <main
          id="main-content"
          className={cn(
            "flex-1 overflow-y-auto",
            "p-4 sm:p-6 lg:p-8"
          )}
        >
          {children}
        </main>
      </div>

      {/* Command palette (global) */}
      <CommandPalette />
    </div>
  );
}
