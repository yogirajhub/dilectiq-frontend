"use client";

import { useState } from "react";
import { Phone, Clock, RotateCw, CheckCircle2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type FollowUpStatus = "pending" | "retrying" | "completed";

interface FollowUp {
  id: string;
  name: string;
  phone: string;
  reason: string;
  retryCount: number;
  nextAttempt: string;
  status: FollowUpStatus;
}

const MOCK_QUEUE: FollowUp[] = [
  { id: "f_1", name: "Ravi Verma", phone: "+91 9988776655", reason: "No Answer", retryCount: 1, nextAttempt: "in 15 mins", status: "pending" },
  { id: "f_2", name: "Simran Kaur", phone: "+91 8877665544", reason: "Call Back Later", retryCount: 0, nextAttempt: "Tomorrow, 10:00 AM", status: "pending" },
  { id: "f_3", name: "Vikram Singh", phone: "+91 7766554433", reason: "Network Error", retryCount: 2, nextAttempt: "in 5 mins", status: "pending" },
  { id: "f_4", name: "Anjali Gupta", phone: "+91 6655443322", reason: "Busy", retryCount: 1, nextAttempt: "in 30 mins", status: "pending" },
];

export default function FollowUpsPage() {
  const [queue, setQueue] = useState<FollowUp[]>(MOCK_QUEUE);
  const [search, setSearch] = useState("");

  const handleManualRetry = (id: string) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: "retrying" } : q));
    
    // Simulate retry success
    setTimeout(() => {
      setQueue(prev => prev.map(q => q.id === id ? { ...q, status: "completed" } : q));
    }, 2000);
  };

  const filteredQueue = queue.filter(q => q.name.toLowerCase().includes(search.toLowerCase()) || q.phone.includes(search));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Follow-up Queue</h1>
          <p className="text-sm text-muted-foreground">Automatically retry failed calls, no-answers, or scheduled callbacks.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-card border border-border px-4 py-2 rounded-xl text-center">
            <p className="text-xs text-muted-foreground uppercase">Pending</p>
            <p className="text-xl font-bold">{queue.filter(q => q.status === "pending").length}</p>
          </div>
          <div className="bg-card border border-border px-4 py-2 rounded-xl text-center">
            <p className="text-xs text-muted-foreground uppercase">Completed</p>
            <p className="text-xl font-bold text-[var(--success-500)]">{queue.filter(q => q.status === "completed").length}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input 
            placeholder="Search queue..." 
            className="pl-9 bg-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0 bg-card">
          <Filter size={16} />
        </Button>
      </div>

      {/* Queue Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground text-xs uppercase border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Reason</th>
              <th className="px-6 py-4 font-medium text-center">Retry Count</th>
              <th className="px-6 py-4 font-medium">Next Attempt</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredQueue.map((item) => (
              <tr key={item.id} className={`transition-colors ${item.status === 'completed' ? 'bg-[var(--success-500)]/5 opacity-60' : 'hover:bg-muted/30'}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.status === 'completed' ? 'bg-[var(--success-500)]/20 text-[var(--success-500)]' : 'bg-primary/10 text-primary'}`}>
                      {item.status === 'completed' ? <CheckCircle2 size={16} /> : <Phone size={16} />}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{item.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className={`font-medium ${
                    item.reason === 'No Answer' ? 'bg-[var(--warning-500)]/10 text-[var(--warning-500)] border-[var(--warning-500)]/20' :
                    item.reason === 'Call Back Later' ? 'bg-primary/10 text-primary border-primary/20' :
                    'bg-[var(--danger-500)]/10 text-[var(--danger-500)] border-[var(--danger-500)]/20'
                  }`}>
                    {item.reason}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-center font-medium">
                  {item.retryCount} / 3
                </td>
                <td className="px-6 py-4">
                  {item.status === "completed" ? (
                    <span className="text-[var(--success-500)] font-medium">Resolved</span>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={14} /> {item.nextAttempt}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {item.status === "pending" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 rounded-lg"
                      onClick={() => handleManualRetry(item.id)}
                    >
                      <RotateCw size={14} /> Retry Now
                    </Button>
                  )}
                  {item.status === "retrying" && (
                    <Button variant="outline" size="sm" className="gap-2 rounded-lg" disabled>
                      <RotateCw size={14} className="animate-spin" /> Calling...
                    </Button>
                  )}
                  {item.status === "completed" && (
                    <Button variant="ghost" size="sm" className="gap-2 rounded-lg text-[var(--success-500)] hover:text-[var(--success-500)] hover:bg-[var(--success-500)]/10" disabled>
                      Done
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {filteredQueue.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  Queue is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
