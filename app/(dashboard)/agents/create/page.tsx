"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, ArrowRight, ArrowLeft, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateAgentPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "New Sales Agent",
    language: "hinglish",
    voiceId: "sarvam_hinglish_female_01",
    prompt: "You are a helpful sales assistant...",
    qaPairs: [{ q: "What is pricing?", a: "It is 3 INR per minute." }]
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const addQAPair = () => setFormData({ ...formData, qaPairs: [...formData.qaPairs, { q: "", a: "" }] });
  const updateQA = (index: number, key: 'q' | 'a', value: string) => {
    const newPairs = [...formData.qaPairs];
    if (newPairs[index]) {
      newPairs[index][key] = value;
      setFormData({ ...formData, qaPairs: newPairs });
    }
  };
  const removeQA = (index: number) => {
    const newPairs = [...formData.qaPairs];
    newPairs.splice(index, 1);
    setFormData({ ...formData, qaPairs: newPairs });
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-20 h-20 bg-[var(--success-500)]/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="text-[var(--success-500)]" size={40} />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Agent Trained Successfully</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            {formData.name} is now ready to take calls. The knowledge base is synced and the prompt is locked.
          </p>
        </div>
        <div className="flex gap-4 pt-4">
          <Link href="/agents/my">
            <Button variant="outline" className="h-12 px-6 rounded-xl">View My Agents</Button>
          </Link>
          <Link href="/overview">
            <Button className="h-12 px-6 rounded-xl">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-12">
      {/* Main Form Area */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-primary/10">
            <Bot size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Train New Agent</h1>
            <p className="text-sm text-muted-foreground">Step {step} of 3</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-lg font-semibold border-b border-border pb-2">Basics & Voice</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Agent Name</Label>
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="h-11"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <select 
                      className="w-full h-11 px-3 rounded-md border border-input bg-transparent text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                      value={formData.language}
                      onChange={e => setFormData({ ...formData, language: e.target.value })}
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="hinglish">Hinglish</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Voice Identity</Label>
                    <select 
                      className="w-full h-11 px-3 rounded-md border border-input bg-transparent text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                      value={formData.voiceId}
                      onChange={e => setFormData({ ...formData, voiceId: e.target.value })}
                    >
                      <option value="sarvam_hinglish_female_01">Female 01 (Hinglish)</option>
                      <option value="sarvam_hindi_male_01">Male 01 (Hindi)</option>
                      <option value="sarvam_english_female_02">Female 02 (English)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-lg font-semibold border-b border-border pb-2">Persona & Prompt</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>System Prompt</Label>
                  <textarea 
                    value={formData.prompt}
                    onChange={e => setFormData({ ...formData, prompt: e.target.value })}
                    className="w-full min-h-[200px] p-3 rounded-md border border-input bg-transparent text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="You are a helpful assistant..."
                  />
                  <p className="text-xs text-muted-foreground">Define how the agent should behave, the tone it should use, and what it should do if it gets stuck.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-lg font-semibold border-b border-border pb-2">Seed Knowledge (Q&A)</h2>
              <p className="text-sm text-muted-foreground">Add specific facts or FAQs the agent should strictly follow.</p>
              
              <div className="space-y-4">
                {formData.qaPairs.map((pair, index) => (
                  <div key={index} className="flex gap-4 items-start p-4 border border-border rounded-xl bg-muted/20 relative group">
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <Label>Question</Label>
                        <Input value={pair.q} onChange={e => updateQA(index, 'q', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Answer</Label>
                        <textarea 
                          value={pair.a}
                          onChange={e => updateQA(index, 'a', e.target.value)}
                          className="w-full h-[60px] p-2 rounded-md border border-input bg-transparent text-sm"
                        />
                      </div>
                    </div>
                    {formData.qaPairs.length > 1 && (
                      <button onClick={() => removeQA(index)} className="text-muted-foreground hover:text-destructive p-2 shrink-0">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                
                <Button variant="outline" type="button" onClick={addQAPair} className="w-full gap-2 border-dashed">
                  <Plus size={16} /> Add Q&A Pair
                </Button>
              </div>
            </div>
          )}

          {/* Form Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
            <Button variant="ghost" onClick={handlePrev} disabled={step === 1} className="gap-2">
              <ArrowLeft size={16} /> Back
            </Button>
            {step < 3 ? (
              <Button onClick={handleNext} className="gap-2 rounded-xl px-6">
                Next <ArrowRight size={16} />
              </Button>
            ) : (
              <Button onClick={submitForm} disabled={isSubmitting} className="gap-2 rounded-xl px-6">
                {isSubmitting ? "Training..." : "Finish & Train"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Live Summary Sidebar */}
      <div className="w-full lg:w-[320px] shrink-0 space-y-6">
        <div className="sticky top-24 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Live Configuration</h3>
          
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Name</p>
              <p className="text-sm font-medium">{formData.name || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Language</p>
              <p className="text-sm font-medium capitalize">{formData.language}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Voice</p>
              <p className="text-sm font-medium truncate">{formData.voiceId}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Prompt Length</p>
              <p className="text-sm font-medium">{formData.prompt.length} chars</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Knowledge Pairs</p>
              <p className="text-sm font-medium">{formData.qaPairs.length} loaded</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
