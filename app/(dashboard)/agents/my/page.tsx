"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAgents } from "@/lib/api/services";
import { LayoutGrid, List, Plus, Search, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MyAgentsPage() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  const filteredAgents = data?.agents.filter(a => a.display_name.toLowerCase().includes(search.toLowerCase())) || [];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Agents</h1>
          <p className="text-sm text-muted-foreground">Manage and monitor your deployed agents.</p>
        </div>
        <Link href="/agents">
          <Button className="gap-2 rounded-xl">
            <Plus size={16} /> New Agent
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input 
            placeholder="Search agents..." 
            className="pl-9 bg-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 bg-card border border-border p-1 rounded-lg">
          <button 
            className={`p-2 rounded-md transition-colors ${view === 'grid' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setView("grid")}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            className={`p-2 rounded-md transition-colors ${view === 'table' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setView("table")}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1,2,3].map(i => <div key={i} className="h-48 bg-card/50 rounded-3xl border border-border" />)}
        </div>
      ) : filteredAgents.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-3xl">
          <p className="text-muted-foreground">No agents found.</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map(agent => (
            <Link key={agent.agent_id} href={`/agents/${agent.agent_id}`}>
              <div className="p-6 bg-card border border-border rounded-3xl hover:border-primary/50 transition-all space-y-4 group">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{agent.display_name}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{agent.agent_id}</p>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground p-1">
                    <MoreVertical size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Model</p>
                    <p className="text-sm font-medium truncate">{agent.llm_model}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Language</p>
                    <p className="text-sm font-medium capitalize">{agent.language}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--success-500)]" />
                      <span className="text-sm font-medium">Ready</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Direction</p>
                    <p className="text-sm font-medium capitalize">{agent.direction}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Model</th>
                <th className="px-6 py-4 font-medium">Language</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAgents.map(agent => (
                <tr key={agent.agent_id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/agents/${agent.agent_id}`} className="font-semibold text-foreground hover:text-primary">
                      {agent.display_name}
                    </Link>
                    <div className="text-xs text-muted-foreground font-mono">{agent.agent_id}</div>
                  </td>
                  <td className="px-6 py-4 font-medium">{agent.llm_model}</td>
                  <td className="px-6 py-4 capitalize">{agent.language}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--success-500)]" />
                      <span>Ready</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/agents/${agent.agent_id}`}>
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
