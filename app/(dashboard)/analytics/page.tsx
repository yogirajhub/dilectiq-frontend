"use client";

import { useState, useEffect } from "react";
import { Download, Calendar as CalendarIcon, TrendingUp, TrendingDown, PhoneCall, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, BarChart } from "recharts";

const callVolumeData = [
  { name: "Mon", calls: 400, success: 240 },
  { name: "Tue", calls: 300, success: 139 },
  { name: "Wed", calls: 550, success: 480 },
  { name: "Thu", calls: 450, success: 390 },
  { name: "Fri", calls: 600, success: 480 },
  { name: "Sat", calls: 350, success: 250 },
  { name: "Sun", calls: 200, success: 120 },
];

const funnelData = [
  { name: "Dialed", value: 2850 },
  { name: "Answered", value: 1800 },
  { name: "Engaged > 10s", value: 1200 },
  { name: "Goal Reached", value: 450 },
];

export default function AnalyticsPage() {
  const dateRange = "Last 7 Days";
  const [viewScope, setViewScope] = useState<"overall" | "agents" | "campaigns">("overall");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network fetch
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 pb-12">
        <div className="h-12 w-1/3 bg-card/50 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-card/50 rounded-2xl animate-pulse" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[400px] bg-card/50 rounded-3xl animate-pulse" />
          <div className="h-[400px] bg-card/50 rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">Detailed metrics on latency, success rates, and volume.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-card border border-border p-1 rounded-xl">
            <Button variant="ghost" size="sm" className={`rounded-lg ${viewScope === 'overall' ? 'bg-muted' : ''}`} onClick={() => setViewScope('overall')}>Overall</Button>
            <Button variant="ghost" size="sm" className={`rounded-lg ${viewScope === 'agents' ? 'bg-muted' : ''}`} onClick={() => setViewScope('agents')}>Agents</Button>
            <Button variant="ghost" size="sm" className={`rounded-lg ${viewScope === 'campaigns' ? 'bg-muted' : ''}`} onClick={() => setViewScope('campaigns')}>Campaigns</Button>
          </div>
          <Button variant="outline" className="gap-2 bg-card">
            <CalendarIcon size={16} /> {dateRange}
          </Button>
          <Button variant="outline" className="gap-2 bg-card">
            <Download size={16} /> Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-6 rounded-2xl space-y-2 relative overflow-hidden">
          <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2"><PhoneCall size={14} /> Total Calls</p>
          <p className="text-3xl font-bold">2,850</p>
          <div className="flex items-center gap-1 text-[var(--success-500)] text-sm font-medium">
            <TrendingUp size={16} /> +12.5%
          </div>
        </div>
        <div className="bg-card border border-border p-6 rounded-2xl space-y-2 relative overflow-hidden">
          <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2"><Zap size={14} /> Success Rate</p>
          <p className="text-3xl font-bold">42.8%</p>
          <div className="flex items-center gap-1 text-[var(--success-500)] text-sm font-medium">
            <TrendingUp size={16} /> +4.2%
          </div>
        </div>
        <div className="bg-card border border-border p-6 rounded-2xl space-y-2 relative overflow-hidden">
          <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2"><Clock size={14} /> p50 Latency</p>
          <p className="text-3xl font-bold font-mono">420<span className="text-base text-muted-foreground ml-1">ms</span></p>
          <div className="flex items-center gap-1 text-[var(--success-500)] text-sm font-medium">
            <TrendingDown size={16} /> -20ms
          </div>
        </div>
        <div className="bg-card border border-border p-6 rounded-2xl space-y-2 relative overflow-hidden">
          <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2"><Clock size={14} /> p95 Latency</p>
          <p className="text-3xl font-bold font-mono">850<span className="text-base text-muted-foreground ml-1">ms</span></p>
          <div className="flex items-center gap-1 text-[var(--danger-500)] text-sm font-medium">
            <TrendingUp size={16} /> +50ms
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-card border border-border p-6 rounded-3xl space-y-6">
          <h2 className="font-semibold text-lg">Call Volume & Success</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={callVolumeData}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Area type="monotone" dataKey="calls" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorCalls)" />
                <Area type="monotone" dataKey="success" stroke="var(--success-500)" strokeWidth={2} fillOpacity={0.2} fill="var(--success-500)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel Chart */}
        <div className="bg-card border border-border p-6 rounded-3xl space-y-6">
          <h2 className="font-semibold text-lg">Conversion Funnel</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ left: 40, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} hide />
                <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                  cursor={{ fill: 'var(--muted)' }}
                />
                <Bar dataKey="value" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {viewScope !== "overall" && (
        <div className="bg-card border border-border rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-semibold text-lg capitalize">Performance by {viewScope}</h2>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-medium capitalize">{viewScope.replace(/s$/, '')} Name</th>
                <th className="px-6 py-4 font-medium">Total Calls</th>
                <th className="px-6 py-4 font-medium">Success Rate</th>
                <th className="px-6 py-4 font-medium">Avg Duration</th>
                <th className="px-6 py-4 font-medium">p50 Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {/* Mock Data based on scope */}
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">{viewScope === 'agents' ? 'Sales SDR' : 'Q4 Promo'}</td>
                <td className="px-6 py-4">1,450</td>
                <td className="px-6 py-4 text-[var(--success-500)] font-medium">48.2%</td>
                <td className="px-6 py-4 text-muted-foreground">1m 45s</td>
                <td className="px-6 py-4 font-mono text-muted-foreground">380ms</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">{viewScope === 'agents' ? 'Recovery Bot' : 'Oct Defaulters'}</td>
                <td className="px-6 py-4">950</td>
                <td className="px-6 py-4 text-[var(--warning-500)] font-medium">21.5%</td>
                <td className="px-6 py-4 text-muted-foreground">45s</td>
                <td className="px-6 py-4 font-mono text-muted-foreground">410ms</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
