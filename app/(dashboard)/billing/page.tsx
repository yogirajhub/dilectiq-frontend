"use client";

import { useState, useEffect } from "react";
import { CreditCard, Download, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
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
          <div className="md:col-span-2 h-[400px] bg-card/50 rounded-3xl animate-pulse" />
          <div className="h-[400px] bg-card/50 rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing & Usage</h1>
          <p className="text-sm text-muted-foreground">Manage your subscription, invoices, and call minutes.</p>
        </div>
        <Button className="gap-2 rounded-xl">
          <CreditCard size={16} /> Update Payment Method
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-card border border-border p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <h2 className="font-semibold text-lg">Current Usage (October)</h2>
            <span className="text-sm text-muted-foreground">Resets in 12 days</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground">Voice Minutes</p>
                <p className="text-3xl font-bold">1,240 <span className="text-base font-normal text-muted-foreground">/ 5,000</span></p>
              </div>
              <p className="text-sm font-medium">24% Used</p>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: "24%" }} />
            </div>
          </div>

          <div className="pt-6">
            <h3 className="font-semibold mb-4">Recent Invoices</h3>
            <div className="space-y-3">
              {[
                { id: "INV-2024-09", date: "Oct 1, 2024", amount: "₹14,999", status: "Paid" },
                { id: "INV-2024-08", date: "Sep 1, 2024", amount: "₹14,999", status: "Paid" },
              ].map(inv => (
                <div key={inv.id} className="flex items-center justify-between p-4 bg-muted/20 border border-border rounded-xl">
                  <div>
                    <p className="font-medium text-sm">{inv.id}</p>
                    <p className="text-xs text-muted-foreground">{inv.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">{inv.amount}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Download size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border p-6 rounded-3xl space-y-6">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Zap size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">Growth Plan</h3>
              <p className="text-sm text-muted-foreground">₹14,999 / month</p>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[var(--success-500)]" /> 5,000 Voice Minutes</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[var(--success-500)]" /> Unlimited Agents</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[var(--success-500)]" /> API Access</li>
            </ul>
            <Button variant="outline" className="w-full rounded-xl border-primary text-primary hover:bg-primary/10">Upgrade Plan</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
