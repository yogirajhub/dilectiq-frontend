"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useUIStore } from "@/stores/ui-store";
import {
  LayoutDashboard,
  Bot,
  Phone,
  PhoneCall,
  BarChart3,
  Puzzle,
  LifeBuoy,
  CreditCard,
  Settings,
  Users,
  BookOpen,
} from "lucide-react";

const COMMAND_ITEMS = [
  {
    group: "Pages",
    items: [
      { label: "Overview",           href: "/overview",           icon: LayoutDashboard },
      { label: "Agent Templates",    href: "/agents",             icon: Bot },
      { label: "My Agents",          href: "/agents/my",          icon: Users },
      { label: "Training Documents", href: "/agents/documents",   icon: BookOpen },
      { label: "Buy New Number",     href: "/numbers/buy",        icon: Phone },
      { label: "My Numbers",         href: "/numbers/my",         icon: Phone },
      { label: "Individual Call",    href: "/calling/individual", icon: PhoneCall },
      { label: "Leads",              href: "/calling/leads",      icon: Users },
      { label: "Campaigns",          href: "/calling/campaigns",  icon: BarChart3 },
      { label: "Follow-ups",         href: "/calling/followups",  icon: PhoneCall },
      { label: "Analytics",          href: "/analytics",          icon: BarChart3 },
      { label: "Integrations",       href: "/integrations",       icon: Puzzle },
      { label: "Support",            href: "/support",            icon: LifeBuoy },
      { label: "Billing",            href: "/billing",            icon: CreditCard },
      { label: "Settings",           href: "/settings",           icon: Settings },
      { label: "Compliance",         href: "/settings/compliance",icon: Settings },
    ],
  },
];

export function CommandPalette() {
  const { commandOpen, setCommandOpen } = useUIStore();
  const router = useRouter();

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [setCommandOpen]);

  const handleSelect = useCallback(
    (href: string) => {
      setCommandOpen(false);
      router.push(href);
    },
    [router, setCommandOpen]
  );

  return (
    <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
      <Command>
        <CommandInput placeholder="Search pages, agents, calls..." id="cmd-palette-input" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {COMMAND_ITEMS.map((group) => (
            <CommandGroup key={group.group} heading={group.group}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.label}
                  onSelect={() => handleSelect(item.href)}
                  className="gap-2"
                >
                  <item.icon size={14} className="text-muted-foreground" />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem value="create agent" onSelect={() => handleSelect("/agents")} className="gap-2">
              <Bot size={14} className="text-muted-foreground" />
              Create new agent
            </CommandItem>
            <CommandItem value="start call" onSelect={() => handleSelect("/calling/individual")} className="gap-2">
              <PhoneCall size={14} className="text-muted-foreground" />
              Start a call
            </CommandItem>
            <CommandItem value="new campaign" onSelect={() => handleSelect("/calling/campaigns")} className="gap-2">
              <BarChart3 size={14} className="text-muted-foreground" />
              New campaign
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
