"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAgents, startCall, getCallStatus } from "@/lib/api/services";
import { PhoneCall, Plus, Trash2, Phone, AlertTriangle, Loader2, Play, CheckCircle2, FileText, Zap, Clock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function IndividualCallPage() {
  const [callState, setCallState] = useState<"setup" | "live" | "report">("setup");
  const [activeCallId, setActiveCallId] = useState<string | null>(null);

  // --- Form State ---
  const [agentId, setAgentId] = useState("");
  const [phone, setPhone] = useState("+91");
  const [phoneError, setPhoneError] = useState("");
  const [context, setContext] = useState([{ key: "customer_name", value: "Raj" }]);

  const { data: agentsData } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  const callMutation = useMutation({
    mutationFn: () => {
      const payload: Record<string, string> = {};
      context.forEach(c => {
        if (c.key) payload[c.key] = c.value;
      });
      return startCall(agentId, { phone_number: phone, context_payload: payload });
    },
    onSuccess: (data) => {
      setActiveCallId(data.call_id);
      setCallState("live");
    },
    onError: (error: Error) => {
      let msg = "Unknown error";
      if (error.message.includes("400")) msg = "Bad Request (400) - Invalid parameters.";
      else if (error.message.includes("403")) msg = "Forbidden (403) - Check credentials.";
      else if (error.message.includes("404")) msg = "Not Found (404) - Agent doesn't exist.";
      else if (error.message.includes("502")) msg = "Bad Gateway (502) - Service is down.";
      else msg = error.message;
      alert(`Failed to start call: ${msg}`);
    }
  });

  const handleStartCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
      setPhoneError("Invalid E.164 format (e.g. +919876543210)");
      return;
    }
    setPhoneError("");
    if (!agentId) {
      alert("Please select an agent");
      return;
    }
    callMutation.mutate();
  };

  // --- Live Polling ---
  const { data: statusData } = useQuery({
    queryKey: ["callStatus", activeCallId],
    queryFn: () => getCallStatus(activeCallId!),
    enabled: !!activeCallId && callState === "live",
    refetchInterval: (query) => {
      const state = query.state.data;
      if (state?.status === "completed" || state?.status === "failed" || state?.status === "no-answer" || state?.status === "busy") {
        return false;
      }
      return 2000; // poll every 2s
    },
  });

  // Watch for completion to transition to report
  useEffect(() => {
    if (statusData && ["completed", "failed", "no-answer", "busy"].includes(statusData.status)) {
      const timer = setTimeout(() => setCallState("report"), 1500); // Small delay to show final status
      return () => clearTimeout(timer);
    }
  }, [statusData]);

  // Format timer
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <PhoneCall size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Individual Call</h1>
          <p className="text-sm text-muted-foreground">Trigger a single ad-hoc call to test an agent or reach a customer.</p>
        </div>
      </div>

      {callState === "setup" && (
        <div className="bg-card border border-border p-6 sm:p-8 rounded-3xl max-w-3xl space-y-8">
          <form onSubmit={handleStartCall} className="space-y-8">
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">1. Select Agent & Target</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Agent</Label>
                  <select 
                    className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm"
                    value={agentId}
                    onChange={e => setAgentId(e.target.value)}
                    required
                  >
                    <option value="">-- Select an Agent --</option>
                    {agentsData?.agents.map(a => (
                      <option key={a.agent_id} value={a.agent_id}>{a.display_name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Phone Number (E.164)</Label>
                  <Input 
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+919876543210"
                    className={`h-11 ${phoneError ? "border-destructive" : ""}`}
                    required
                  />
                  {phoneError && <p className="text-xs text-destructive">{phoneError}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">2. Context Variables (Payload)</h2>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setContext([...context, { key: "", value: "" }])}
                  className="gap-2"
                >
                  <Plus size={14} /> Add Field
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Pass variables like name, amount, or booking ID into the agent&apos;s prompt.</p>
              
              <div className="space-y-3 bg-muted/20 p-4 rounded-xl border border-border">
                {context.map((ctx, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Input 
                      placeholder="Key (e.g. amount)" 
                      value={ctx.key}
                      onChange={e => {
                        const n = [...context];
                        if (n[idx]) {
                          n[idx].key = e.target.value;
                          setContext(n);
                        }
                      }}
                      className="bg-background"
                    />
                    <Input 
                      placeholder="Value (e.g. 5000)" 
                      value={ctx.value}
                      onChange={e => {
                        const n = [...context];
                        if (n[idx]) {
                          n[idx].value = e.target.value;
                          setContext(n);
                        }
                      }}
                      className="bg-background"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const n = [...context];
                        n.splice(idx, 1);
                        setContext(n);
                      }}
                      className="text-muted-foreground hover:text-destructive px-2"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                {context.length === 0 && <p className="text-sm text-muted-foreground text-center py-2">No context variables added.</p>}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-base gap-2"
              disabled={callMutation.isPending}
            >
              {callMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
              Start Call
            </Button>
          </form>
        </div>
      )}

      {callState === "live" && (
        <div className="bg-card border border-border p-8 rounded-3xl max-w-3xl mx-auto space-y-12 animate-in fade-in zoom-in-95 relative overflow-hidden">
          {/* Subtle pulse background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="text-center space-y-4 relative z-10">
            <h2 className="text-3xl font-bold tracking-tight">Active Call</h2>
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              <span className="pulse-dot" /> {statusData?.status || "Connecting..."}
            </div>
          </div>

          {/* Waveform */}
          <div className="flex justify-center items-end gap-1 h-24 relative z-10">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 rounded-full bg-primary/60 transition-all duration-100 ${statusData?.status === 'in-progress' ? 'animate-waveform' : 'h-2'}`}
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  height: statusData?.status === 'in-progress' ? undefined : '8px'
                }} 
              />
            ))}
          </div>

          {/* Live Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
            <div className="bg-muted/50 p-4 rounded-2xl text-center space-y-1 border border-border">
              <Clock size={16} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Duration</p>
              <p className="text-xl font-bold font-mono">{formatTime(statusData?.duration_seconds || 0)}</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-2xl text-center space-y-1 border border-border">
              <Phone size={16} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Turns</p>
              <p className="text-xl font-bold">{statusData?.turn_count || 0}</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-2xl text-center space-y-1 border border-border">
              <Zap size={16} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Cache Hits</p>
              <p className="text-xl font-bold text-[var(--success-500)]">{statusData?.cache_hits || 0}</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-2xl text-center space-y-1 border border-border">
              <AlertTriangle size={16} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Escalated</p>
              <p className={`text-xl font-bold ${statusData?.escalated ? "text-[var(--warning-500)]" : "text-muted-foreground"}`}>
                {statusData?.escalated ? "Yes" : "No"}
              </p>
            </div>
          </div>
          
          <div className="text-center relative z-10">
            <Button variant="destructive" className="rounded-xl px-8" onClick={() => setCallState("report")}>
              End Call (Simulation)
            </Button>
          </div>
        </div>
      )}

      {callState === "report" && (
        <div className="space-y-6 max-w-4xl animate-in slide-in-from-bottom-8">
          <div className="bg-card border border-border p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                statusData?.status === 'completed' ? 'bg-[var(--success-500)]/20 text-[var(--success-500)]' : 'bg-[var(--danger-500)]/20 text-[var(--danger-500)]'
              }`}>
                {statusData?.status === 'completed' ? <CheckCircle2 size={32} /> : <AlertTriangle size={32} />}
              </div>
              <div>
                <h2 className="text-2xl font-bold">Call {statusData?.status === 'completed' ? 'Completed' : 'Ended'}</h2>
                <p className="text-muted-foreground">ID: <span className="font-mono">{statusData?.call_id}</span></p>
              </div>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Duration</p>
                <p className="text-2xl font-bold">{formatTime(statusData?.duration_seconds || 0)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Cost</p>
                <p className="text-2xl font-bold">₹{((statusData?.duration_seconds || 0) / 60 * 3).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-card border border-border p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-border">
                <FileText size={20} className="text-primary" />
                <h3 className="font-semibold text-lg">Transcript</h3>
              </div>
              <div className="space-y-4">
                {/* Mock transcript for the report */}
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm">
                    Namaste, kya main Raj se baat kar rahi hoon?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm">
                    Haan boliye, kaun?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm">
                    Main DilectIQ se bol rahi hoon.
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border p-6 rounded-3xl space-y-4">
                <h3 className="font-semibold pb-2 border-b border-border">Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Avg Latency</span>
                    <span className="font-medium text-[var(--success-500)]">420ms</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Turns</span>
                    <span className="font-medium">{statusData?.turn_count}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Cache Hits</span>
                    <span className="font-medium">{statusData?.cache_hits}</span>
                  </div>
                </div>
              </div>

              {statusData?.escalated && (
                <div className="bg-[var(--warning-500)]/10 border border-[var(--warning-500)]/30 p-6 rounded-3xl space-y-2">
                  <div className="flex items-center gap-2 text-[var(--warning-500)] font-semibold">
                    <ShieldAlert size={18} /> Escalation Triggered
                  </div>
                  <p className="text-sm text-[var(--warning-500)]/80">Call was flagged for human intervention during turn 4.</p>
                </div>
              )}

              <Button 
                variant="outline" 
                className="w-full rounded-xl"
                onClick={() => {
                  setCallState("setup");
                  setActiveCallId(null);
                }}
              >
                Make Another Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
