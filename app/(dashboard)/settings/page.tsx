"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, Plus, CheckCircle2, User, Bell, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { addToDNC, checkDNC } from "@/lib/api/services";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "api" | "compliance">("compliance");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // DNC State
  const [dncPhone, setDncPhone] = useState("");
  const [dncReason, setDncReason] = useState("");
  const [checkPhone, setCheckPhone] = useState("");
  const [checkResult, setCheckResult] = useState<{ on_dnc: boolean; reason?: string } | null>(null);

  // Mock Audit Log for UI
  const [auditLog, setAuditLog] = useState([
    { phone: "+91 8877665544", action: "Added to DNC", reason: "Customer requested via call", date: "Oct 2, 2024" },
    { phone: "+91 9988776655", action: "Checked DNC", reason: "-", date: "Oct 1, 2024" },
  ]);

  const addDncMutation = useMutation({
    mutationFn: () => addToDNC(dncPhone, dncReason),
    onSuccess: () => {
      setAuditLog([{ phone: dncPhone, action: "Added to DNC", reason: dncReason, date: "Just now" }, ...auditLog]);
      setDncPhone("");
      setDncReason("");
      alert("Successfully added to DNC list.");
    },
    onError: (err: Error) => alert(`Failed to add DNC: ${err.message}`)
  });

  const checkDncMutation = useMutation({
    mutationFn: () => checkDNC(checkPhone),
    onSuccess: (data) => {
      setCheckResult(data);
      setAuditLog([{ phone: checkPhone, action: "Checked DNC", reason: "-", date: "Just now" }, ...auditLog]);
    },
    onError: (err: Error) => alert(`Failed to check DNC: ${err.message}`)
  });

  if (isLoading) {
    return (
      <div className="space-y-8 pb-12">
        <div className="h-12 w-1/3 bg-card/50 rounded-lg animate-pulse" />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 space-y-2">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-12 bg-card/50 rounded-xl animate-pulse" />)}
          </div>
          <div className="flex-1 h-[600px] bg-card/50 rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account, API keys, and compliance protocols.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-1">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "api", label: "API Keys", icon: Key },
            { id: "compliance", label: "Compliance & DNC", icon: ShieldAlert },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "profile" | "notifications" | "api" | "compliance")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                activeTab === tab.id 
                  ? "bg-card border border-border text-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent"
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === "compliance" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-card border border-border p-6 rounded-3xl space-y-6">
                <div>
                  <h2 className="text-lg font-semibold flex items-center gap-2"><ShieldAlert size={18} className="text-[var(--warning-500)]" /> Do Not Call (DNC) Registry</h2>
                  <p className="text-sm text-muted-foreground mt-1">Numbers added here will be automatically blocked across all campaigns and agents.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-border">
                  {/* Add DNC */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm">Add to DNC</h3>
                    <div className="space-y-3">
                      <Input 
                        placeholder="Phone (e.g. +919876543210)" 
                        value={dncPhone} 
                        onChange={e => setDncPhone(e.target.value)} 
                        className="bg-background h-11"
                      />
                      <Input 
                        placeholder="Reason (Optional)" 
                        value={dncReason} 
                        onChange={e => setDncReason(e.target.value)} 
                        className="bg-background h-11"
                      />
                      <Button 
                        onClick={() => addDncMutation.mutate()} 
                        disabled={addDncMutation.isPending || !dncPhone}
                        className="w-full gap-2 rounded-xl"
                      >
                        <Plus size={16} /> Add to Blocklist
                      </Button>
                    </div>
                  </div>

                  {/* Check DNC */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm">Check Number Status</h3>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Phone Number" 
                          value={checkPhone} 
                          onChange={e => setCheckPhone(e.target.value)} 
                          className="bg-background h-11"
                        />
                        <Button 
                          variant="secondary"
                          onClick={() => checkDncMutation.mutate()} 
                          disabled={checkDncMutation.isPending || !checkPhone}
                          className="h-11 rounded-xl"
                        >
                          Check
                        </Button>
                      </div>
                      
                      {checkResult && (
                        <div className={`p-4 rounded-xl border ${checkResult.on_dnc ? 'bg-[var(--danger-500)]/10 border-[var(--danger-500)]/20 text-[var(--danger-500)]' : 'bg-[var(--success-500)]/10 border-[var(--success-500)]/20 text-[var(--success-500)]'}`}>
                          <div className="flex items-center gap-2 font-semibold">
                            {checkResult.on_dnc ? <ShieldAlert size={16} /> : <CheckCircle2 size={16} />}
                            {checkResult.on_dnc ? "Number is Blocked (DNC)" : "Number is Clear"}
                          </div>
                          {checkResult.reason && <p className="text-sm mt-1 opacity-80">Reason: {checkResult.reason}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="font-semibold text-lg">Compliance Audit Log</h2>
                </div>
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Action</th>
                      <th className="px-6 py-4 font-medium">Phone Number</th>
                      <th className="px-6 py-4 font-medium">Reason/Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {auditLog.map((log, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-muted-foreground">{log.date}</td>
                        <td className="px-6 py-4 font-medium">{log.action}</td>
                        <td className="px-6 py-4 font-mono">{log.phone}</td>
                        <td className="px-6 py-4 text-muted-foreground">{log.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab !== "compliance" && (
            <div className="bg-card border border-border p-12 rounded-3xl text-center space-y-4">
              <h2 className="text-xl font-semibold capitalize">{activeTab} Settings</h2>
              <p className="text-muted-foreground">This section is available in the next milestone.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
