"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAgent } from "@/lib/api/services";
import { Bot, Phone, Settings, BookOpen, Activity, Play, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AgentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState<"overview" | "config" | "knowledge" | "calls">("overview");

  const { data: agent, isLoading } = useQuery({
    queryKey: ["agent", id],
    queryFn: () => getAgent(id),
  });

  if (isLoading) {
    return <div className="p-12 text-center text-muted-foreground animate-pulse">Loading agent details...</div>;
  }

  if (!agent) {
    return <div className="p-12 text-center text-destructive">Agent not found.</div>;
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-4">
          <Link href="/agents/my" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} /> Back to My Agents
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Bot size={32} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{agent.display_name}</h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span className="font-mono">{agent.agent_id}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="capitalize">{agent.direction}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="capitalize">{agent.language}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="flex items-center gap-1.5 text-[var(--success-500)]">
                  <span className="pulse-dot w-2 h-2" /> Ready
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Settings size={16} /> Edit
          </Button>
          <Button className="gap-2">
            <Play size={16} /> Test Call
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border">
        {[
          { id: "overview", label: "Overview", icon: Activity },
          { id: "config", label: "Configuration", icon: Settings },
          { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
          { id: "calls", label: "Call Logs", icon: Phone },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "overview" | "config" | "knowledge" | "calls")}
            className={`flex items-center gap-2 pb-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id 
                ? "border-primary text-primary" 
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="pt-4">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-card border border-border p-6 rounded-3xl space-y-4">
                <h3 className="font-semibold">System Prompt Preview</h3>
                <div className="p-4 bg-muted/30 rounded-xl text-sm font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {agent.system_prompt_preview}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border p-6 rounded-3xl space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Latency</p>
                  <p className="text-3xl font-bold">450ms</p>
                </div>
                <div className="bg-card border border-border p-6 rounded-3xl space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Calls</p>
                  <p className="text-3xl font-bold">12,408</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card border border-border p-6 rounded-3xl space-y-4">
                <h3 className="font-semibold">Active Tools</h3>
                <div className="space-y-3">
                  {agent.tools.map((tool, i) => (
                    <div key={i} className="p-3 bg-muted/20 border border-border rounded-xl">
                      <p className="font-medium text-sm">{tool.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
                    </div>
                  ))}
                  {agent.tools.length === 0 && <p className="text-sm text-muted-foreground">No tools configured.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "config" && (
          <div className="bg-card border border-border p-8 rounded-3xl max-w-3xl space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">LLM Model</p>
                <p className="font-medium">{agent.llm_model}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Voice ID</p>
                <p className="font-medium">{agent.voice_id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Max Duration</p>
                <p className="font-medium">{agent.max_call_duration_seconds} seconds</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Consent Required</p>
                <p className="font-medium">{agent.consent_required ? "Yes" : "No"}</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="font-semibold">Escalation Rules</h3>
              {agent.escalation_rules.map((rule, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-muted/20 border border-border rounded-xl">
                  <div className="flex-1 text-sm"><span className="text-muted-foreground">If:</span> {rule.trigger}</div>
                  <ArrowRight size={16} className="text-muted-foreground" />
                  <div className="flex-1 text-sm"><span className="text-muted-foreground">Then:</span> {rule.action}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "knowledge" && (
          <div className="bg-card border border-border p-12 rounded-3xl text-center space-y-4">
            <BookOpen size={48} className="mx-auto text-muted-foreground/30" />
            <h3 className="text-lg font-semibold">Knowledge Base</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Manage the documents and Q&A pairs this agent uses to answer questions.
            </p>
            <Link href="/agents/documents" className="inline-block pt-4">
              <Button>Manage Documents</Button>
            </Link>
          </div>
        )}

        {activeTab === "calls" && (
          <div className="bg-card border border-border p-12 rounded-3xl text-center space-y-4">
            <Phone size={48} className="mx-auto text-muted-foreground/30" />
            <h3 className="text-lg font-semibold">Call History</h3>
            <p className="text-sm text-muted-foreground">Detailed logs of all calls made by this agent will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
