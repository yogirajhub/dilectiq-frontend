import {
  LayoutDashboard,
  Bot,
  BookOpen,
  Phone,
  PhoneCall,
  PhoneIncoming,
  Users,
  BarChart3,
  Puzzle,
  LifeBuoy,
  CreditCard,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  children?: NavItem[];
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      {
        label: "Overview",
        href: "/overview",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Voice Agents",
    items: [
      {
        label: "Agents",
        href: "/agents",
        icon: Bot,
        children: [
          {
            label: "Agent Templates",
            href: "/agents",
            icon: Bot,
          },
          {
            label: "My Agents",
            href: "/agents/my",
            icon: Users,
          },
          {
            label: "Training Documents",
            href: "/agents/documents",
            icon: BookOpen,
          },
        ],
      },
    ],
  },
  {
    label: "Phone Numbers",
    items: [
      {
        label: "Numbers",
        href: "/numbers",
        icon: Phone,
        children: [
          {
            label: "Buy New Number",
            href: "/numbers/buy",
            icon: PhoneIncoming,
          },
          {
            label: "My Numbers",
            href: "/numbers/my",
            icon: Phone,
          },
        ],
      },
    ],
  },
  {
    label: "Calling",
    items: [
      {
        label: "Calling",
        href: "/calling",
        icon: PhoneCall,
        children: [
          {
            label: "Individual Call",
            href: "/calling/individual",
            icon: PhoneCall,
          },
          {
            label: "Bulk Call",
            href: "/calling/bulk",
            icon: Users,
            children: [
              {
                label: "Leads",
                href: "/calling/leads",
                icon: Users,
              },
              {
                label: "Campaigns",
                href: "/calling/campaigns",
                icon: BarChart3,
              },
              {
                label: "Follow-ups",
                href: "/calling/followups",
                icon: PhoneCall,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Data & Insights",
    items: [
      {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "Platform",
    items: [
      {
        label: "Integrations",
        href: "/integrations",
        icon: Puzzle,
      },
    ],
  },
];

export const NAV_BOTTOM_ITEMS: NavItem[] = [
  {
    label: "Support",
    href: "/support",
    icon: LifeBuoy,
  },
  {
    label: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
