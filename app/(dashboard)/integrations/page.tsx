"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const INTEGRATIONS = [
  { name: "Salesforce", desc: "Sync leads and call logs automatically.", status: "Connected", icon: "☁️" },
  { name: "HubSpot", desc: "Two-way contact and timeline sync.", status: "Available", icon: "🧡" },
  { name: "Zapier", desc: "Connect to 5000+ apps via webhooks.", status: "Available", icon: "⚡" },
  { name: "Make", desc: "Advanced visual workflow automation.", status: "Available", icon: "🟣" },
  { name: "Twilio", desc: "Bring your own SIP trunk or numbers.", status: "Connected", icon: "🔴" },
];

export default function IntegrationsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 pb-12">
        <div className="h-12 w-1/3 bg-card/50 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 bg-card/50 rounded-3xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
          <p className="text-sm text-muted-foreground">Connect DilectIQ with your existing CRM and tools.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INTEGRATIONS.map(int => (
          <div key={int.name} className="bg-card border border-border p-6 rounded-3xl space-y-4 hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center text-2xl">
                {int.icon}
              </div>
              {int.status === "Connected" ? (
                <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--success-500)] bg-[var(--success-500)]/10 px-2.5 py-1 rounded-full border border-[var(--success-500)]/20">
                  <CheckCircle2 size={12} /> Connected
                </div>
              ) : (
                <div className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border">
                  Available
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">{int.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{int.desc}</p>
            </div>

            <Button variant={int.status === "Connected" ? "outline" : "default"} className="w-full gap-2 rounded-xl mt-2">
              {int.status === "Connected" ? "Configure" : "Connect"}
              {int.status !== "Connected" && <ArrowRight size={16} />}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
