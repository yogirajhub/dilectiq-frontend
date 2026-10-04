"use client";

import { useUIStore, useNotificationStore } from "@/stores/ui-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Bell,
  Menu,
  LogOut,
  User,
  CreditCard,
  ChevronRight,
  Check,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";

// ── Minutes Pill ───────────────────────────────────────────
function MinutesPill() {
  const used = 3240;
  const total = 5000;
  const pct = (used / total) * 100;
  const remaining = total - used;

  return (
    <div
      id="minutes-pill"
      className="flex min-w-[196px] shrink-0 items-center gap-3 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card px-3 py-2 shadow-sm transition-colors hover:border-primary/40 sm:min-w-[220px]"
    >
        {/* Progress ring */}
        <svg width="24" height="24" viewBox="0 0 24 24" className="flex-shrink-0">
          <circle
            cx="12" cy="12" r="9"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle
            cx="12" cy="12" r="9"
            fill="none"
            stroke="url(#pill-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 9}`}
            strokeDashoffset={`${2 * Math.PI * 9 * (1 - pct / 100)}`}
            transform="rotate(-90 12 12)"
          />
          <defs>
            <linearGradient id="pill-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2F8F7D" />
              <stop offset="100%" stopColor="#3AA591" />
            </linearGradient>
          </defs>
        </svg>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Minutes left</p>
          <p className="mt-0.5 whitespace-nowrap text-sm font-bold tabular-nums text-foreground">
            {remaining.toLocaleString()} <span className="text-xs font-medium text-muted-foreground">min</span>
          </p>
        </div>
        <Link
          href="/billing"
          aria-label="Add minutes and go to Billing"
          title="Add minutes"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-all hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Plus size={16} strokeWidth={2.5} />
        </Link>
    </div>
  );
}

// ── Notifications ──────────────────────────────────────────
function NotificationBell() {
  const { notifications, unreadCount, markRead, markAllRead } = useNotificationStore();

  return (
    <Popover>
      <PopoverTrigger
        id="notification-bell"
        className="relative p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0" sideOffset={8}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-primary hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>
        <div className="max-h-[360px] overflow-y-auto divide-y divide-border">
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No notifications</p>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn(
                  "w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors",
                  !n.read && "bg-primary/5"
                )}
              >
                <span
                  className={cn(
                    "mt-1 w-2 h-2 rounded-full flex-shrink-0",
                    n.type === "success" && "bg-[var(--success-500)]",
                    n.type === "info" && "bg-[var(--info-500)]",
                    n.type === "warning" && "bg-[var(--warning-500)]",
                    n.type === "error" && "bg-[var(--danger-500)]"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium truncate", n.read && "text-muted-foreground")}>
                    {n.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {formatRelativeTime(n.timestamp)}
                  </p>
                </div>
                {!n.read && <Check size={12} className="mt-1 text-primary flex-shrink-0" />}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ── Profile Dropdown ───────────────────────────────────────
function ProfileDropdown() {
  const router = useRouter();
  
  const handleLogout = async () => {
    await logoutAction();
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        id="profile-avatar-btn"
        className="flex items-center gap-2 px-1.5 py-1 rounded-lg hover:bg-muted transition-colors cursor-pointer outline-none"
        aria-label="Profile menu"
      >
        <Avatar className="h-7 w-7">
          <AvatarImage src="" alt="User avatar" />
          <AvatarFallback className="text-xs bg-primary text-white font-semibold">
            TU
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:block text-left">
          <p className="text-xs font-semibold leading-none">Test User</p>
          <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">test@gues.in</p>
        </div>
        <ChevronRight size={12} className="text-muted-foreground hidden sm:block" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="pb-1">
            <p className="text-sm font-semibold">Test User</p>
            <p className="text-xs font-normal text-muted-foreground">test@gues.in</p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/settings")} className="gap-2 cursor-pointer">
            <User size={14} />
            Profile & Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/billing")} className="gap-2 cursor-pointer">
            <CreditCard size={14} />
            My Plan & Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="gap-2 text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut size={14} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ── Top Bar ────────────────────────────────────────────────
export function TopBar() {
  const { toggleSidebar, setCommandOpen } = useUIStore();

  return (
    <header className="h-14 flex items-center gap-3 px-4 border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-30 flex-shrink-0">
      {/* Mobile menu */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* Search trigger */}
      <button
        id="search-trigger"
        onClick={() => setCommandOpen(true)}
        className="flex items-center gap-2 flex-1 max-w-sm px-3 h-8 rounded-lg border border-border bg-muted/50 text-muted-foreground text-sm hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Open command palette (Ctrl+K)"
      >
        <Search size={13} />
        <span className="flex-1 text-left text-xs">Search or jump to...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono bg-background px-1.5 py-0.5 rounded border border-border text-muted-foreground/70">
          ⌘K
        </kbd>
      </button>

      <div className="flex items-center gap-1 ml-auto">
        <MinutesPill />
        <NotificationBell />
        <ProfileDropdown />
      </div>
    </header>
  );
}
