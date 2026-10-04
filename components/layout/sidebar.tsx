"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_BOTTOM_ITEMS, NAV_GROUPS, type NavItem } from "@/lib/nav";
import { DilectIQIcon, DilectIQWordmark } from "@/components/brand/logo";
import { useUIStore } from "@/stores/ui-store";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// ── Nav Item ───────────────────────────────────────────────
function SidebarNavItem({
  item,
  collapsed,
  depth = 0,
}: {
  item: NavItem;
  collapsed: boolean;
  depth?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(() => {
    if (item.children) {
      return item.children.some(
        (c) => pathname === c.href || pathname.startsWith(c.href + "/")
      );
    }
    return false;
  });

  const isActive =
    pathname === item.href ||
    (item.href !== "/" && pathname.startsWith(item.href + "/") && !item.children);
  const isParentActive =
    item.children?.some(
      (c) =>
        pathname === c.href ||
        pathname.startsWith(c.href + "/") ||
        c.children?.some((gc) => pathname === gc.href)
    ) ?? false;

  const hasChildren = Boolean(item.children?.length);
  const Icon = item.icon;

  const handleClick = useCallback(() => {
    if (hasChildren) setOpen((v) => (isHovered ? true : !v));
  }, [hasChildren, isHovered]);

  const itemContent = (
    <button
      onClick={handleClick}
      className={cn(
        "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group relative",
        depth === 0 ? "py-2" : "py-1.5",
        collapsed && depth === 0 ? "justify-center" : "",
        isActive || isParentActive
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
      )}
      style={{ paddingLeft: collapsed ? undefined : depth > 0 ? `${12 + depth * 12}px` : undefined }}
    >
      {/* Active indicator bar */}
      {(isActive || isParentActive) && !collapsed && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4/5 bg-primary rounded-full" />
      )}

      <Icon
        size={16}
        className={cn(
          "flex-shrink-0 transition-colors",
          isActive || isParentActive ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
        )}
      />

      {!collapsed && (
        <>
          <span className="flex-1 text-left leading-none">{item.label}</span>
          {item.badge !== undefined && (
            <span className="ml-auto text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-semibold">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <ChevronRight
              size={14}
              className={cn(
                "ml-auto text-muted-foreground/60 transition-transform duration-200",
                open ? "rotate-90" : ""
              )}
            />
          )}
        </>
      )}
    </button>
  );

  return (
    <div
      onMouseEnter={() => {
        if (hasChildren) {
          setIsHovered(true);
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (hasChildren) {
          setIsHovered(false);
          setOpen(false);
        }
      }}
    >
      {/* Link or button */}
      {!hasChildren ? (
        collapsed && depth === 0 ? (
          <Tooltip>
            <TooltipTrigger
              onClick={() => router.push(item.href)}
              className={cn(
                "w-full flex items-center justify-center p-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer outline-none",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <Icon size={18} className="flex-shrink-0" />
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group relative",
              depth === 0 ? "py-2" : "py-1.5",
              isActive
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
            style={{ paddingLeft: depth > 0 ? `${12 + depth * 12}px` : undefined }}
          >
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4/5 bg-primary rounded-full" />
            )}
            <Icon
              size={depth === 0 ? 16 : 14}
              className={cn(
                "flex-shrink-0 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
              )}
            />
            <span className="flex-1 leading-none">{item.label}</span>
            {item.badge !== undefined && (
              <span className="ml-auto text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-semibold">
                {item.badge}
              </span>
            )}
          </Link>
        )
      ) : (
        collapsed && depth === 0 ? (
          <Tooltip>
            <TooltipTrigger
              onClick={() => setOpen(!open)}
              className={cn(
                "w-full flex items-center justify-center p-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer outline-none",
                isParentActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <Icon size={18} />
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ) : (
          itemContent
        )
      )}

      {/* Children */}
      {hasChildren && !collapsed && (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-0.5 space-y-0.5">
                {item.children!.map((child) => (
                  <SidebarNavItem
                    key={child.href}
                    item={child}
                    collapsed={false}
                    depth={depth + 1}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

// ── Main Sidebar ───────────────────────────────────────────
export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const collapsed = !mobile && !isHovered;

  return (
    <aside
      onMouseEnter={() => !mobile && setIsHovered(true)}
      onMouseLeave={() => !mobile && setIsHovered(false)}
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 relative",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      {/* Logo area */}
      <div className={cn(
        "flex items-center h-14 px-3 border-b border-sidebar-border flex-shrink-0",
        collapsed ? "justify-center" : "gap-2"
      )}>
        {collapsed ? (
          <DilectIQIcon size={32} />
        ) : (
          <DilectIQWordmark height={28} />
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="space-y-0.5">
            {group.label && !collapsed && (
              <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                {group.label}
              </p>
            )}
            {group.items.map((item) => (
              <SidebarNavItem
                key={item.href}
                item={item}
                collapsed={collapsed}
                depth={0}
              />
            ))}
          </div>
        ))}
      </nav>

      <div className="flex-shrink-0 border-t border-sidebar-border py-2 px-2 space-y-0.5">
        {NAV_BOTTOM_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            collapsed={collapsed}
            depth={0}
          />
        ))}
      </div>

    </aside>
  );
}

// ── Mobile Drawer Sidebar ──────────────────────────────────
export function MobileSidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
          >
            <Sidebar mobile />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
