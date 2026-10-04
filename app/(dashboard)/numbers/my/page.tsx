"use client";

import { Phone, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MOCK_NUMBERS = [
  { phone: "+91 98765 43210", label: "Main Support Line", type: "Local", capability: "Voice, SMS", status: "Active" },
  { phone: "+91 87654 32109", label: "Outbound Sales", type: "Local", capability: "Voice", status: "Active" },
  { phone: "+1 415 555 2671", label: "US Tech Support", type: "Toll-Free", capability: "Voice", status: "Configuring" },
];

export default function MyNumbersPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Numbers</h1>
          <p className="text-sm text-muted-foreground">Manage your purchased phone numbers and routing.</p>
        </div>
        <Link href="/numbers/buy">
          <Button className="gap-2 rounded-xl">
            Buy New Number
          </Button>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-3xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Number</th>
              <th className="px-6 py-4 font-medium">Label</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Capabilities</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_NUMBERS.map((num, i) => (
              <tr key={i} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Phone size={16} className="text-primary" />
                    </div>
                    <span className="font-semibold text-foreground font-mono">{num.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{num.label}</td>
                <td className="px-6 py-4 text-muted-foreground">{num.type}</td>
                <td className="px-6 py-4 text-muted-foreground">{num.capability}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {num.status === "Active" ? (
                      <span className="w-2 h-2 rounded-full bg-[var(--success-500)]" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[var(--warning-500)] animate-pulse" />
                    )}
                    <span>{num.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg">
                    <MoreVertical size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
