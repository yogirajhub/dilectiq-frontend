"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DilectIQIcon, DilectIQWordmark, DilectIQWordmarkMono } from "@/components/brand/logo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Sun, Moon, Zap, Phone, TrendingUp, AlertCircle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Section wrapper ────────────────────────────────────────
function Section({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────
function StatCard({ label, value, delta, icon: Icon }: { label: string; value: string; delta: string; icon: React.ElementType }) {
  return (
    <div className="rounded-2xl border border-border p-5 space-y-3 bg-card">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Icon size={14} className="text-primary" />
        </div>
      </div>
      <p className="text-3xl font-bold tabular-nums tracking-tight">{value}</p>
      <p className="text-xs text-[var(--success-500)]">{delta} vs yesterday</p>
    </div>
  );
}

// ── Empty state ────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/20 p-10 text-center space-y-3">
      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        <Phone size={20} className="text-muted-foreground" />
      </div>
      <h3 className="text-sm font-semibold">No calls yet</h3>
      <p className="text-xs text-muted-foreground max-w-xs mx-auto">
        Start your first call to see results here. Choose an agent and enter a phone number.
      </p>
      <Button size="sm" className="mt-2">Start a call</Button>
    </div>
  );
}

export function DesignSystemContent() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-12 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Design System</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            DilectIQ visual language — tokens, components, patterns.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="gap-2"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          {theme === "dark" ? "Light" : "Dark"}
        </Button>
      </div>

      {/* Logos */}
      <Section title="Logo & Brand">
        <div className="flex flex-wrap items-center gap-8 p-6 rounded-2xl bg-card border border-border">
          <DilectIQWordmark height={36} />
          <DilectIQWordmark height={36} monochrome />
          <DilectIQIcon size={40} />
          <DilectIQWordmarkMono height={32} className="text-foreground" />
        </div>
      </Section>

      {/* Color tokens */}
      <Section title="Color Tokens">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: "Background", bg: "bg-[#0A0A0A]", hex: "#0A0A0A" },
            { name: "Surface / Card", bg: "bg-[#1C1917] border border-[#2A2622]", hex: "#1C1917" },
            { name: "Border", bg: "bg-[#2A2622]", hex: "#2A2622" },
            { name: "Primary (Teal)", bg: "bg-[#2F8F7D]", hex: "#2F8F7D" },
            { name: "Success", bg: "bg-[#2F8F7D]", hex: "#2F8F7D" },
            { name: "Warning", bg: "bg-[#D6A24A]", hex: "#D6A24A" },
            { name: "Danger", bg: "bg-[#D9534F]", hex: "#D9534F" },
            { name: "Foreground", bg: "bg-[#EDEBE8]", hex: "#EDEBE8" },
          ].map((c) => (
            <div key={c.name} className="space-y-2">
              <div className={cn("h-12 rounded-lg", c.bg)} />
              <p className="text-xs font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground font-mono">{c.hex}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography Scale">
        <div className="space-y-3 p-6 rounded-xl bg-card border border-border">
          {[
            { size: "text-5xl", label: "Display / 48px", text: "DilectIQ Platform" },
            { size: "text-3xl", label: "H1 / 30px", text: "Voice AI Dashboard" },
            { size: "text-2xl", label: "H2 / 24px", text: "Agent Performance" },
            { size: "text-xl", label: "H3 / 20px", text: "EMI Reminder Agent" },
            { size: "text-base", label: "Body / 16px", text: "Your AI workforce handles inbound and outbound calls." },
            { size: "text-sm", label: "Small / 14px", text: "Mumbai, Maharashtra · +91 98765 43210" },
            { size: "text-xs", label: "Caption / 12px", text: "Last synced 2 minutes ago · 1,284 calls today" },
          ].map((t) => (
            <div key={t.label} className="flex items-baseline gap-6">
              <span className="text-xs text-muted-foreground w-28 flex-shrink-0 font-mono">{t.label}</span>
              <span className={cn(t.size, "font-semibold tracking-tight leading-tight")}>{t.text}</span>
            </div>
          ))}
          <Separator className="my-2" />
          <p className="text-base tabular-nums font-mono text-primary">1,284 ↑ 84.2% ↓ 3.8ms</p>
          <p className="text-xs text-muted-foreground">Tabular numbers for metrics</p>
        </div>
      </Section>

      {/* Buttons */}
      <Section title="Buttons">
        <div className="flex flex-wrap gap-3 p-6 rounded-xl bg-card border border-border">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
          <Button className="gap-2">
            <Zap size={14} /> With Icon
          </Button>
        </div>
      </Section>

      {/* Badges */}
      <Section title="Badges">
        <div className="flex flex-wrap gap-3 p-6 rounded-xl bg-card border border-border">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge className="bg-[var(--success-500)]/15 text-[var(--success-500)] border-[var(--success-500)]/30">Active</Badge>
          <Badge className="bg-[var(--warning-500)]/15 text-[var(--warning-500)] border-[var(--warning-500)]/30">Paused</Badge>
          <Badge className="bg-primary/15 text-primary border-primary/30">
            <span className="pulse-dot mr-1.5" /> Live
          </Badge>
          <Badge className="bg-[var(--danger-500)]/15 text-[var(--danger-500)] border-[var(--danger-500)]/30">Failed</Badge>
        </div>
      </Section>

      {/* Inputs */}
      <Section title="Form Inputs">
        <div className="grid sm:grid-cols-2 gap-4 p-6 rounded-xl bg-card border border-border">
          <div className="space-y-2">
            <Label htmlFor="ds-input">Phone Number</Label>
            <Input id="ds-input" placeholder="+91 98765 43210" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ds-input-error">Agent Name</Label>
            <Input id="ds-input-error" placeholder="EMI Reminder Agent" className="border-destructive" />
            <p className="text-xs text-destructive">Name is already taken</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ds-input-disabled">Organization (disabled)</Label>
            <Input id="ds-input-disabled" placeholder="Acme Corp" disabled />
          </div>
        </div>
      </Section>

      {/* Stat cards */}
      <Section title="Stat Cards">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Calls Today" value="1,284" delta="+12.4%" icon={Phone} />
          <StatCard label="Avg Latency" value="420ms" delta="-8ms" icon={TrendingUp} />
          <StatCard label="Cache Hit Rate" value="84.2%" delta="+2.1%" icon={Zap} />
          <StatCard label="Escalation Rate" value="3.8%" delta="-0.5%" icon={AlertCircle} />
        </div>
      </Section>

      {/* Table */}
      <Section title="Data Table">
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Language</TableHead>
                <TableHead className="text-right tabular-nums">Calls</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { agent: "EMI Reminder", dir: "Outbound", lang: "Hinglish", calls: "3,241", status: "Active" },
                { agent: "Fraud Alert", dir: "Outbound", lang: "Hindi", calls: "1,893", status: "Active" },
                { agent: "Support Bot", dir: "Inbound", lang: "English", calls: "984", status: "Paused" },
                { agent: "Survey Agent", dir: "Outbound", lang: "Hinglish", calls: "427", status: "Draft" },
              ].map((row) => (
                <TableRow key={row.agent}>
                  <TableCell className="font-medium">{row.agent}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{row.dir}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{row.lang}</TableCell>
                  <TableCell className="text-right tabular-nums">{row.calls}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn("text-xs",
                        row.status === "Active" && "bg-[var(--success-500)]/15 text-[var(--success-500)]",
                        row.status === "Paused" && "bg-[var(--warning-500)]/15 text-[var(--warning-500)]",
                        row.status === "Draft" && "bg-muted text-muted-foreground"
                      )}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      {/* Progress */}
      <Section title="Progress">
        <div className="space-y-4 p-6 rounded-xl bg-card border border-border">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Minutes Used</span>
              <span className="tabular-nums font-medium">3,240 / 5,000</span>
            </div>
            <Progress value={64.8} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Campaign Progress</span>
              <span className="tabular-nums font-medium">847 / 1,200</span>
            </div>
            <Progress value={70.6} className="h-2" />
          </div>
        </div>
      </Section>

      {/* Skeletons */}
      <Section title="Skeleton Loaders">
        <div className="space-y-3 p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-32 w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-3">
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
          </div>
        </div>
      </Section>

      {/* Empty state */}
      <Section title="Empty States">
        <EmptyState />
      </Section>

      {/* Waveform + animations */}
      <Section title="Animated Elements">
        <div className="flex flex-wrap items-center gap-8 p-6 rounded-xl bg-card border border-border">
          {/* Waveform */}
          <div className="space-y-2 text-center">
            <div className="flex items-end gap-1 h-8 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="waveform-bar" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Live waveform</p>
          </div>

          {/* Pulse dot */}
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2 h-8">
              <span className="pulse-dot" />
              <span className="text-sm font-medium text-primary">Live call</span>
            </div>
            <p className="text-xs text-muted-foreground">Pulse indicator</p>
          </div>

          {/* Shimmer */}
          <div className="space-y-2 flex-1 min-w-[200px]">
            <div className="h-8 rounded-lg shimmer" />
            <p className="text-xs text-muted-foreground">Shimmer skeleton</p>
          </div>

          {/* Gradient text */}
          <div className="space-y-2">
            <p className="text-2xl font-bold text-primary">DilectIQ</p>
            <p className="text-xs text-muted-foreground">Brand text</p>
          </div>
        </div>
      </Section>

      {/* Avatars */}
      <Section title="Avatars">
        <div className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-primary text-white font-semibold">RK</AvatarFallback>
          </Avatar>
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/20 text-primary font-semibold">AI</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-[#D6A24A] text-white font-bold text-sm">SA</AvatarFallback>
          </Avatar>
          <div className="flex -space-x-2">
            {["RK", "AI", "SA", "MN"].map((init) => (
              <Avatar key={init} className="h-8 w-8 ring-2 ring-background">
                <AvatarFallback className="text-xs bg-muted text-foreground font-semibold">{init}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </Section>

      {/* Alert / status patterns */}
      <Section title="Status & Alert Patterns">
        <div className="space-y-3">
          {[
            { icon: CheckCircle, label: "Agent training complete", sub: "Fraud Alert Agent has finished ingesting documents", color: "success" },
            { icon: Info, label: "New number purchased", sub: "+91 98765 43210 is now active and assigned", color: "info" },
            { icon: AlertCircle, label: "Campaign paused", sub: "Daily frequency cap reached for EMI Reminder campaign", color: "warning" },
            { icon: AlertCircle, label: "Call failed", sub: "Target +91 87654 32109 was busy. Will retry in 30 min.", color: "danger" },
          ].map((a) => (
            <div
              key={a.label}
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border",
                a.color === "success" && "bg-[var(--success-500)]/8 border-[var(--success-500)]/20",
                a.color === "info" && "bg-[var(--info-500)]/8 border-[var(--info-500)]/20",
                a.color === "warning" && "bg-[var(--warning-500)]/8 border-[var(--warning-500)]/20",
                a.color === "danger" && "bg-[var(--danger-500)]/8 border-[var(--danger-500)]/20",
              )}
            >
              <a.icon
                size={16}
                className={cn(
                  "mt-0.5 flex-shrink-0",
                  a.color === "success" && "text-[var(--success-500)]",
                  a.color === "info" && "text-[var(--info-500)]",
                  a.color === "warning" && "text-[var(--warning-500)]",
                  a.color === "danger" && "text-[var(--danger-500)]",
                )}
              />
              <div>
                <p className="text-sm font-medium">{a.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Tabs */}
      <Section title="Tabs">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
            <TabsTrigger value="calls">Calls</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="p-4 rounded-lg border border-border bg-card mt-2 text-sm text-muted-foreground">
            Agent overview content would appear here.
          </TabsContent>
          <TabsContent value="configuration" className="p-4 rounded-lg border border-border bg-card mt-2 text-sm text-muted-foreground">
            Configuration options and settings.
          </TabsContent>
          <TabsContent value="knowledge" className="p-4 rounded-lg border border-border bg-card mt-2 text-sm text-muted-foreground">
            Knowledge documents and Q&A pairs.
          </TabsContent>
          <TabsContent value="calls" className="p-4 rounded-lg border border-border bg-card mt-2 text-sm text-muted-foreground">
            Call history and recordings.
          </TabsContent>
        </Tabs>
      </Section>

      {/* Site Footer */}
      <Section title="Site Footer Preview">
        <div className="rounded-2xl border border-border overflow-hidden">
          <SiteFooter />
        </div>
      </Section>
    </div>
  );
}
