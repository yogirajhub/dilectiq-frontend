import { create } from "zustand";

// ── UI Store: sidebar collapse + command palette ───────────
interface UIStore {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  commandOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setCommandOpen: (v: boolean) => void;
  toggleCommand: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  sidebarCollapsed: false,
  commandOpen: false,
  setSidebarOpen: (v) => set({ sidebarOpen: v }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  toggleSidebarCollapsed: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setCommandOpen: (v) => set({ commandOpen: v }),
  toggleCommand: () => set((s) => ({ commandOpen: !s.commandOpen })),
}));

// ── Notifications Store ────────────────────────────────────
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: Date;
  href?: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, "id" | "read" | "timestamp">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [
    {
      id: "1",
      title: "Campaign started",
      message: "EMI Reminder Q4 campaign is now running",
      type: "success",
      read: false,
      timestamp: new Date(Date.now() - 5 * 60000),
      href: "/calling/campaigns",
    },
    {
      id: "2",
      title: "New number purchased",
      message: "+91 98765 43210 is now active",
      type: "info",
      read: false,
      timestamp: new Date(Date.now() - 30 * 60000),
    },
    {
      id: "3",
      title: "Agent training complete",
      message: "Fraud Alert Agent has finished ingesting documents",
      type: "success",
      read: true,
      timestamp: new Date(Date.now() - 2 * 3600000),
    },
  ],
  unreadCount: 2,
  addNotification: (n) =>
    set((s) => {
      const notification: Notification = {
        ...n,
        id: crypto.randomUUID(),
        read: false,
        timestamp: new Date(),
      };
      return {
        notifications: [notification, ...s.notifications],
        unreadCount: s.unreadCount + 1,
      };
    }),
  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, s.unreadCount - 1),
    })),
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
