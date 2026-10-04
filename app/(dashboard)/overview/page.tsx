"use client";

import { useQuery } from "@tanstack/react-query";
import { getHealth } from "@/lib/api/services";
import { LayoutDashboard, Phone, TrendingUp, Zap, AlertCircle, Activity, Circle, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- Mock Data ---
const chartData = [
  { time: "00:00", calls: 120 },
  { time: "04:00", calls: 80 },
  { time: "08:00", calls: 450 },
  { time: "12:00", calls: 980 },
  { time: "16:00", calls: 1240 },
  { time: "20:00", calls: 850 },
  { time: "24:00", calls: 300 },
];

const liveCalls = [
  { id: "CA1234", agent: "Recovery Bot", phone: "+91 98765 43210", duration: "02:14" },
  { id: "CA1235", agent: "Sales SDR", phone: "+91 87654 32109", duration: "01:05" },
  { id: "CA1236", agent: "Support L1", phone: "+91 76543 21098", duration: "04:30" },
];

const activityFeed = [
  { id: 1, type: "success", title: "Agent Training Complete", desc: "Recovery Bot has finished ingesting PDFs.", time: "10m ago" },
  { id: 2, type: "info", title: "Campaign Started", desc: "Diwali Promo campaign dialed 500 leads.", time: "1h ago" },
  { id: 3, type: "warning", title: "Latency Spike", desc: "TTS latency exceeded 800ms for 5 minutes.", time: "2h ago" },
];

export default function OverviewPage() {
  const { data: health, isLoading: isHealthLoading } = useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
    refetchInterval: 30000,
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Page header & Health Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <LayoutDashboard size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
            <p className="text-sm text-muted-foreground">Good morning, Test User</p>
          </div>
        </div>
        
        {/* Health Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card">
          <Activity size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">System Status:</span>
          {isHealthLoading ? (
            <span className="text-sm text-muted-foreground animate-pulse">Checking...</span>
          ) : (
            <Badge 
              variant="outline" 
              className={cn(
                "ml-2 uppercase tracking-wide",
                health?.status === "ok" && "bg-[var(--success-500)]/15 text-[var(--success-500)] border-[var(--success-500)]/30",
                health?.status === "degraded" && "bg-[var(--warning-500)]/15 text-[var(--warning-500)] border-[var(--warning-500)]/30",
                health?.status === "down" && "bg-[var(--danger-500)]/15 text-[var(--danger-500)] border-[var(--danger-500)]/30"
              )}
            >
              {health?.status === "ok" ? "All Systems Operational" : health?.status}
            </Badge>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Calls Today", value: "1,284", delta: "+12.4%", icon: Phone },
          { label: "Avg Latency", value: "420ms", delta: "-8ms", icon: TrendingUp },
          { label: "Cache Hit Rate", value: "84.2%", delta: "+2.1%", icon: Zap },
          { label: "Escalation Rate", value: "3.8%", delta: "-0.5%", icon: AlertCircle },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
              <div className="p-1.5 rounded-lg bg-primary/10">
                <stat.icon size={14} className="text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold tabular-nums tracking-tight">{stat.value}</p>
            <p className="text-xs">
              <span className={stat.delta.startsWith("+") && stat.label !== "Escalation Rate" ? "text-primary" : "text-primary"}>
                {stat.delta}
              </span>{" "}
              <span className="text-muted-foreground">vs yesterday</span>
            </p>
          </div>
        ))}
      </div>

      {/* Live Calls Strip */}
      <div className="rounded-2xl border border-border bg-card p-4 flex flex-col md:flex-row items-start md:items-center gap-4 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <span className="pulse-dot w-2 h-2" />
          <span className="text-sm font-semibold text-primary">Live Calls</span>
        </div>
        <div className="flex-1 flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {liveCalls.map((call) => (
            <div key={call.id} className="flex items-center gap-3 bg-muted/50 rounded-lg px-4 py-2 shrink-0 border border-border/50">
              <div className="flex items-end gap-0.5 h-3 opacity-70">
                <div className="waveform-bar w-[2px] min-h-[4px]" style={{ animationDuration: '0.8s' }} />
                <div className="waveform-bar w-[2px] min-h-[4px]" style={{ animationDuration: '1.2s' }} />
                <div className="waveform-bar w-[2px] min-h-[4px]" style={{ animationDuration: '1s' }} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium">{call.agent}</span>
                <span className="text-[10px] text-muted-foreground tabular-nums">{call.phone} • {call.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 space-y-6">
          <h2 className="text-base font-semibold">Call Volume</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis 
                  dataKey="time" 
                  stroke="var(--muted-foreground)" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="var(--muted-foreground)" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="calls" 
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorCalls)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
          <h2 className="text-base font-semibold">Recent Activity</h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:to-transparent">
            {activityFeed.map((item) => (
              <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-background bg-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                  {item.type === 'success' && <CheckCircle2 size={14} className="text-primary" />}
                  {item.type === 'warning' && <AlertCircle size={14} className="text-[var(--warning-500)]" />}
                  {item.type === 'info' && <Circle size={14} className="text-muted-foreground fill-current" />}
                </div>
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-background shadow-sm ml-4 md:ml-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
