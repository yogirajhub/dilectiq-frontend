"use client";

import { useState } from "react";
import { Play, Pause, Square, Plus, Search, BarChart3, Users, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { getAgents } from "@/lib/api/services";

type CampaignStatus = "draft" | "running" | "paused" | "completed";

interface Campaign {
  id: string;
  name: string;
  agentName: string;
  listName: string;
  status: CampaignStatus;
  progress: number;
  total: number;
  completed: number;
  successRate: number;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: "cmp_1", name: "Diwali Promo Outreach", agentName: "Sales SDR", listName: "Festive Leads 2024", status: "running", progress: 65, total: 1000, completed: 650, successRate: 24 },
  { id: "cmp_2", name: "Overdue EMI Follow-up", agentName: "Recovery Bot", listName: "Defaulters Oct", status: "paused", progress: 30, total: 500, completed: 150, successRate: 8 },
  { id: "cmp_3", name: "NPS Survey Q3", agentName: "Survey Agent", listName: "Active Users Q3", status: "completed", progress: 100, total: 2000, completed: 2000, successRate: 42 },
];

export default function CampaignsPage() {
  const [view, setView] = useState<"list" | "create">("list");
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const { data: agentsData } = useQuery({ queryKey: ["agents"], queryFn: getAgents });

  const toggleStatus = (id: string, newStatus: CampaignStatus) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const [newCampaign, setNewCampaign] = useState({ name: "", agentId: "", listId: "" });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const agent = agentsData?.agents.find(a => a.agent_id === newCampaign.agentId)?.display_name || "Agent";
    const campaign: Campaign = {
      id: `cmp_${Date.now()}`,
      name: newCampaign.name,
      agentName: agent,
      listName: "Selected List",
      status: "draft",
      progress: 0,
      total: 100,
      completed: 0,
      successRate: 0,
    };
    setCampaigns([campaign, ...campaigns]);
    setView("list");
  };

  return (
    <div className="space-y-8 pb-12 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-sm text-muted-foreground">Orchestrate bulk calling campaigns and monitor live performance.</p>
        </div>
        {view === "list" && (
          <Button onClick={() => setView("create")} className="gap-2 rounded-xl">
            <Plus size={16} /> New Campaign
          </Button>
        )}
      </div>

      {view === "create" && (
        <div className="bg-card border border-border p-6 sm:p-8 rounded-3xl max-w-2xl animate-in fade-in zoom-in-95">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Create New Campaign</h2>
            <Button variant="ghost" size="icon" onClick={() => setView("list")}><X size={20} /></Button>
          </div>
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="space-y-2">
              <Label>Campaign Name</Label>
              <Input required value={newCampaign.name} onChange={e => setNewCampaign({...newCampaign, name: e.target.value})} placeholder="e.g. Q4 Outreach" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label>Select Agent</Label>
              <select required value={newCampaign.agentId} onChange={e => setNewCampaign({...newCampaign, agentId: e.target.value})} className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm">
                <option value="">-- Choose Agent --</option>
                {agentsData?.agents.map(a => <option key={a.agent_id} value={a.agent_id}>{a.display_name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Select Contact List</Label>
              <select required value={newCampaign.listId} onChange={e => setNewCampaign({...newCampaign, listId: e.target.value})} className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm">
                <option value="">-- Choose List --</option>
                <option value="list1">Web Signups (1,200 leads)</option>
                <option value="list2">Defaulters (450 leads)</option>
              </select>
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setView("list")}>Cancel</Button>
              <Button type="submit">Create Campaign</Button>
            </div>
          </form>
        </div>
      )}

      {view === "list" && (
        <div className="space-y-4">
          <div className="relative w-full sm:w-80 mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input placeholder="Search campaigns..." className="pl-9 bg-card" />
          </div>

          <div className="grid gap-4">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="bg-card border border-border p-6 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-primary/50 transition-colors">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg cursor-pointer hover:text-primary transition-colors" onClick={() => setSelectedCampaign(campaign)}>{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Users size={14} /> {campaign.listName} • <BarChart3 size={14} className="ml-2" /> {campaign.agentName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 lg:hidden">
                      {campaign.status === "running" && <Button size="icon" variant="outline" className="h-8 w-8 text-[var(--warning-500)] border-[var(--warning-500)]/30" onClick={() => toggleStatus(campaign.id, "paused")}><Pause size={14} /></Button>}
                      {campaign.status === "paused" && <Button size="icon" variant="outline" className="h-8 w-8 text-[var(--success-500)] border-[var(--success-500)]/30" onClick={() => toggleStatus(campaign.id, "running")}><Play size={14} fill="currentColor" /></Button>}
                      {(campaign.status === "running" || campaign.status === "paused") && <Button size="icon" variant="outline" className="h-8 w-8 text-[var(--danger-500)] border-[var(--danger-500)]/30" onClick={() => toggleStatus(campaign.id, "completed")}><Square size={14} fill="currentColor" /></Button>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress ({campaign.progress}%)</span>
                      <span>{campaign.completed} / {campaign.total} calls</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          campaign.status === 'running' ? 'bg-primary' : 
                          campaign.status === 'completed' ? 'bg-[var(--success-500)]' : 'bg-muted-foreground'
                        }`} 
                        style={{ width: `${campaign.progress}%` }} 
                      />
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status</p>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      campaign.status === 'running' ? 'bg-primary/10 text-primary border-primary/20' :
                      campaign.status === 'completed' ? 'bg-[var(--success-500)]/10 text-[var(--success-500)] border-[var(--success-500)]/20' :
                      campaign.status === 'paused' ? 'bg-[var(--warning-500)]/10 text-[var(--warning-500)] border-[var(--warning-500)]/20' :
                      'bg-muted text-muted-foreground border-border'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${campaign.status === 'running' ? 'animate-pulse bg-current' : 'bg-current'}`} />
                      <span className="capitalize">{campaign.status}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Success</p>
                    <p className="text-lg font-bold">{campaign.successRate}%</p>
                  </div>

                  <div className="flex items-center gap-2 pl-4 border-l border-border">
                    {campaign.status === "running" && <Button size="icon" variant="outline" className="h-9 w-9 text-[var(--warning-500)] border-[var(--warning-500)]/30 hover:bg-[var(--warning-500)]/10 hover:text-[var(--warning-500)]" onClick={() => toggleStatus(campaign.id, "paused")}><Pause size={16} fill="currentColor" /></Button>}
                    {campaign.status === "paused" && <Button size="icon" variant="outline" className="h-9 w-9 text-[var(--success-500)] border-[var(--success-500)]/30 hover:bg-[var(--success-500)]/10 hover:text-[var(--success-500)]" onClick={() => toggleStatus(campaign.id, "running")}><Play size={16} fill="currentColor" /></Button>}
                    {(campaign.status === "running" || campaign.status === "paused") && <Button size="icon" variant="outline" className="h-9 w-9 text-[var(--danger-500)] border-[var(--danger-500)]/30 hover:bg-[var(--danger-500)]/10 hover:text-[var(--danger-500)]" onClick={() => toggleStatus(campaign.id, "completed")}><Square size={14} fill="currentColor" /></Button>}
                    {campaign.status === "draft" && <Button size="sm" onClick={() => toggleStatus(campaign.id, "running")}>Start</Button>}
                    <Button variant="ghost" size="icon" className="h-9 w-9 ml-2" onClick={() => setSelectedCampaign(campaign)}>
                      <ChevronRight size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Side Drawer for Campaign Details */}
      {selectedCampaign && (
        <>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-in fade-in" onClick={() => setSelectedCampaign(null)} />
          <div className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-card border-l border-border shadow-2xl z-50 p-6 flex flex-col animate-in slide-in-from-right">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold">{selectedCampaign.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedCampaign.status}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedCampaign(null)}><X size={20} /></Button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground uppercase">Agent</p>
                  <p className="font-semibold">{selectedCampaign.agentName}</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground uppercase">List</p>
                  <p className="font-semibold">{selectedCampaign.listName}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b border-border pb-2">Results Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Successful Outcomes</span>
                    <span className="font-medium text-[var(--success-500)]">{Math.floor(selectedCampaign.completed * (selectedCampaign.successRate / 100))}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Voicemail / No Answer</span>
                    <span className="font-medium">124</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Escalated</span>
                    <span className="font-medium text-[var(--warning-500)]">18</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Failed / Invalid Number</span>
                    <span className="font-medium text-[var(--danger-500)]">5</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline">Export Full Report (CSV)</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
