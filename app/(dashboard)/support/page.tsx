"use client";

import { useState, useEffect } from "react";
import { MessageSquare, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SupportPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 pb-12">
        <div className="h-12 w-1/3 bg-card/50 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-[500px] bg-card/50 rounded-3xl animate-pulse" />
          <div className="space-y-6">
            <div className="h-[200px] bg-card/50 rounded-3xl animate-pulse" />
            <div className="h-[200px] bg-card/50 rounded-3xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Support & Help</h1>
          <p className="text-sm text-muted-foreground">Get assistance with your DilectIQ platform.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-card border border-border p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="font-semibold text-lg">Contact Support</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Topic</Label>
                <select className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm">
                  <option>Technical Issue</option>
                  <option>Billing Question</option>
                  <option>Agent Configuration</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Urgency</Label>
                <select className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High (Production Down)</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea 
                className="w-full min-h-[150px] p-4 rounded-xl border border-input bg-transparent text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Describe your issue in detail..."
              />
            </div>
            <Button className="w-full h-11 rounded-xl">Submit Ticket</Button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-primary/10 border border-primary/20 p-6 rounded-3xl space-y-4 text-center">
            <MessageSquare size={32} className="mx-auto text-primary" />
            <h3 className="font-semibold text-lg text-primary">Live Chat</h3>
            <p className="text-sm text-primary/80">Available Mon-Fri, 9AM to 6PM IST.</p>
            <Button className="w-full rounded-xl">Start Chat</Button>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl space-y-4">
            <FileText size={24} className="text-muted-foreground" />
            <h3 className="font-semibold">Documentation</h3>
            <p className="text-sm text-muted-foreground">Browse our guides on creating agents and bulk calling.</p>
            <Button variant="outline" className="w-full gap-2 rounded-xl">
              View Docs <ExternalLink size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
