"use client";

import { useQuery } from "@tanstack/react-query";
import { getAgents } from "@/lib/api/services";
import { Bot, ArrowRight, Activity, ArrowUpRight, CopyPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AgentsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Bot size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Agent Templates</h1>
            <p className="text-sm text-muted-foreground">Pick a template to clone and start training your AI.</p>
          </div>
        </div>
        <Link href="/agents/my">
          <Button variant="outline" className="gap-2">
            My Agents <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="h-[200px] rounded-3xl border border-border bg-card/50 animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-center text-destructive">
          Failed to load agent templates. Please try again.
        </div>
      ) : data?.agents?.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
          No templates found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data?.agents.slice(0, 9).map((agent, index) => (
            <div 
              key={agent.agent_id} 
              className="relative rounded-3xl border border-border bg-card p-6 overflow-hidden group hover:border-primary/50 transition-colors flex flex-col"
            >
              {/* Number watermark */}
              <div className="absolute -top-4 -right-2 text-6xl font-black text-muted/30 group-hover:text-primary/10 transition-colors pointer-events-none z-0">
                0{index + 1}
              </div>
              
              <div className="relative z-10 flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-foreground leading-tight">{agent.display_name}</h3>
                  <div className="p-2 bg-muted rounded-full">
                    <Activity size={16} className="text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Model</span>
                    <span className="font-medium">{agent.llm_model}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Voice ID</span>
                    <span className="font-medium max-w-[120px] truncate">{agent.voice_id}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Language</span>
                    <span className="font-medium capitalize">{agent.language}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Direction</span>
                    <span className="font-medium capitalize">{agent.direction}</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-border flex gap-3">
                <Link href={`/agents/create?template=${agent.agent_id}`} className="flex-1">
                  <Button className="w-full gap-2 rounded-xl h-10" variant="secondary">
                    <CopyPlus size={16} /> Clone
                  </Button>
                </Link>
                <Link href={`/agents/${agent.agent_id}`}>
                  <Button className="w-10 p-0 rounded-xl h-10" variant="outline">
                    <ArrowUpRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
