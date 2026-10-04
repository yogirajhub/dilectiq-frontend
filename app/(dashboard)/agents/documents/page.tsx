"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ingestKnowledge, seedQA } from "@/lib/api/services";
import { BookOpen, FileText, Upload, Plus, Trash2, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TrainingDocumentsPage() {
  const [activeTab, setActiveTab] = useState<"ingest" | "seed">("ingest");
  const agentId = "agent_emi_001"; // In a real app, this might be selected from a dropdown

  // --- Ingest State ---
  const [ingestText, setIngestText] = useState("");
  const [ingestSource, setIngestSource] = useState("");
  
  const ingestMutation = useMutation({
    mutationFn: () => ingestKnowledge(agentId, { content: ingestText, source: ingestSource }),
    onSuccess: () => {
      setIngestText("");
      setIngestSource("");
      alert("Knowledge ingested successfully!");
    }
  });

  // --- Seed QA State ---
  const [qaPairs, setQaPairs] = useState([{ question: "", answer: "" }]);
  
  const seedMutation = useMutation({
    mutationFn: () => seedQA(agentId, { pairs: qaPairs.filter(p => p.question && p.answer) }),
    onSuccess: () => {
      setQaPairs([{ question: "", answer: "" }]);
      alert("Q&A Seeded successfully!");
    }
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <BookOpen size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Training Documents</h1>
          <p className="text-sm text-muted-foreground">Upload text or seed Q&A to build your agent&apos;s knowledge base.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-muted/50 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("ingest")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "ingest" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText size={16} /> Ingest Text
        </button>
        <button
          onClick={() => setActiveTab("seed")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "seed" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageSquare size={16} /> Seed Q&A
        </button>
      </div>

      {/* Forms */}
      <div className="max-w-3xl">
        {activeTab === "ingest" && (
          <div className="bg-card border border-border p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Source Name</Label>
                <Input 
                  placeholder="e.g. Return Policy 2024" 
                  value={ingestSource}
                  onChange={e => setIngestSource(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Raw Text Content</Label>
                <textarea 
                  className="w-full min-h-[200px] p-4 rounded-xl border border-input bg-transparent text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Paste your document text here..."
                  value={ingestText}
                  onChange={e => setIngestText(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              className="w-full gap-2 rounded-xl h-11" 
              disabled={ingestMutation.isPending || !ingestText || !ingestSource}
              onClick={() => ingestMutation.mutate()}
            >
              {ingestMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              Ingest Document
            </Button>
            
            {ingestMutation.isSuccess && (
              <div className="flex items-center gap-2 text-[var(--success-500)] text-sm justify-center bg-[var(--success-500)]/10 p-3 rounded-lg border border-[var(--success-500)]/20">
                <CheckCircle2 size={16} /> Successfully chunked and embedded document.
              </div>
            )}
          </div>
        )}

        {activeTab === "seed" && (
          <div className="bg-card border border-border p-6 sm:p-8 rounded-3xl space-y-6">
            <p className="text-sm text-muted-foreground">Add strict question-answer pairs that the agent should prioritize over general knowledge.</p>
            
            <div className="space-y-4">
              {qaPairs.map((pair, index) => (
                <div key={index} className="flex gap-4 items-start p-5 border border-border rounded-xl bg-muted/20 relative group">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label>Question</Label>
                      <Input 
                        value={pair.question} 
                        onChange={e => {
                          const newPairs = [...qaPairs];
                          if (newPairs[index]) {
                            newPairs[index].question = e.target.value;
                            setQaPairs(newPairs);
                          }
                        }} 
                        className="h-11 bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Answer</Label>
                      <textarea 
                        value={pair.answer}
                        onChange={e => {
                          const newPairs = [...qaPairs];
                          if (newPairs[index]) {
                            newPairs[index].answer = e.target.value;
                            setQaPairs(newPairs);
                          }
                        }} 
                        className="w-full h-[80px] p-3 rounded-xl border border-input bg-background text-sm"
                      />
                    </div>
                  </div>
                  {qaPairs.length > 1 && (
                    <button 
                      onClick={() => {
                        const newPairs = [...qaPairs];
                        newPairs.splice(index, 1);
                        setQaPairs(newPairs);
                      }} 
                      className="text-muted-foreground hover:text-destructive p-2 shrink-0 bg-background rounded-lg border border-border"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => setQaPairs([...qaPairs, { question: "", answer: "" }])} 
                className="w-full gap-2 border-dashed h-11 rounded-xl"
              >
                <Plus size={16} /> Add Another Pair
              </Button>
            </div>

            <Button 
              className="w-full gap-2 rounded-xl h-11" 
              disabled={seedMutation.isPending || !qaPairs[0]?.question}
              onClick={() => seedMutation.mutate()}
            >
              {seedMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              Seed Q&A Pairs
            </Button>
            
            {seedMutation.isSuccess && (
              <div className="flex items-center gap-2 text-[var(--success-500)] text-sm justify-center bg-[var(--success-500)]/10 p-3 rounded-lg border border-[var(--success-500)]/20">
                <CheckCircle2 size={16} /> Successfully seeded Q&A pairs.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
