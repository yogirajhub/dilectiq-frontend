"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle2, AlertTriangle, Search, Filter, MoreVertical, CheckSquare, Settings2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data for already uploaded leads
const MOCK_LEADS = [
  { id: 1, name: "Raj Sharma", phone: "+91 9876543210", status: "Ready", dnc: false, source: "Web Signup" },
  { id: 2, name: "Priya Patel", phone: "+91 8765432109", status: "DNC Blocked", dnc: true, source: "List A" },
  { id: 3, name: "Amit Kumar", phone: "+91 7654321098", status: "Ready", dnc: false, source: "List A" },
  { id: 4, name: "Sneha Reddy", phone: "+91 6543210987", status: "Ready", dnc: false, source: "Web Signup" },
];

export default function LeadsPage() {
  const [uploadStep, setUploadStep] = useState<"idle" | "mapping" | "validating" | "complete">("idle");
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Dummy file upload state
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setUploadStep("mapping");
    }
  };

  const handleCompleteMapping = () => {
    setUploadStep("validating");
    
    // Simulate DNC checking & validation
    setTimeout(() => {
      setLeads([
        { id: 5, name: "New Lead 1", phone: "+91 9988776655", status: "Ready", dnc: false, source: "Upload" },
        { id: 6, name: "New Lead 2", phone: "+91 0000000000", status: "DNC Blocked", dnc: true, source: "Upload" },
        ...leads,
      ]);
      setUploadStep("complete");
      setTimeout(() => setUploadStep("idle"), 2000);
    }, 2000);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === leads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(leads.map(l => l.id)));
    }
  };

  const toggleSelect = (id: number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads Database</h1>
          <p className="text-sm text-muted-foreground">Upload, scrub, and manage your contact lists before running campaigns.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Settings2 size={16} /> Manage Fields
          </Button>
          <div className="relative overflow-hidden inline-block">
            <Button className="gap-2">
              <Upload size={16} /> Upload CSV/XLSX
            </Button>
            <input 
              type="file" 
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {uploadStep !== "idle" && (
        <div className="bg-card border border-border p-6 rounded-3xl max-w-2xl animate-in slide-in-from-top-4">
          <h2 className="text-lg font-semibold mb-4">File Upload Progress</h2>
          
          {uploadStep === "mapping" && (
            <div className="space-y-6">
              <div className="p-4 bg-muted/30 rounded-xl border border-border space-y-4">
                <p className="text-sm text-muted-foreground">Map your CSV columns to DilectIQ fields.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs">CSV Column: Name</Label>
                    <select className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm">
                      <option>Full Name</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">CSV Column: Phone</Label>
                    <select className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm">
                      <option>Phone Number (E.164)</option>
                    </select>
                  </div>
                </div>
              </div>
              <Button className="w-full" onClick={handleCompleteMapping}>Confirm Mapping</Button>
            </div>
          )}

          {uploadStep === "validating" && (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <FileText className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Validating & Scrubbing</h3>
                <p className="text-sm text-muted-foreground">Checking E.164 formats and verifying against national DND registry...</p>
              </div>
            </div>
          )}

          {uploadStep === "complete" && (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-[var(--success-500)]/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="text-[var(--success-500)]" size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Upload Complete</h3>
                <p className="text-sm text-muted-foreground">1 lead imported successfully, 1 blocked by DNC.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder="Search leads..." 
              className="pl-9 bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 bg-card">
            <Filter size={16} />
          </Button>
        </div>
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-3 animate-in fade-in">
            <span className="text-sm text-muted-foreground">{selectedIds.size} selected</span>
            <Button variant="outline" size="sm" className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive">
              <Trash2 size={14} /> Delete
            </Button>
          </div>
        )}
      </div>

      {/* Leads Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground text-xs uppercase border-b border-border">
            <tr>
              <th className="px-6 py-4 w-12">
                <button onClick={toggleSelectAll} className="text-muted-foreground hover:text-foreground">
                  <CheckSquare size={16} className={selectedIds.size === leads.length ? "text-primary" : ""} />
                </button>
              </th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Phone Number</th>
              <th className="px-6 py-4 font-medium">Source</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search)).map((lead) => (
              <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <button onClick={() => toggleSelect(lead.id)} className="text-muted-foreground hover:text-foreground">
                    <CheckSquare size={16} className={selectedIds.has(lead.id) ? "text-primary" : ""} />
                  </button>
                </td>
                <td className="px-6 py-4 font-medium">{lead.name}</td>
                <td className="px-6 py-4 font-mono">{lead.phone}</td>
                <td className="px-6 py-4 text-muted-foreground">{lead.source}</td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    lead.dnc 
                      ? 'bg-[var(--danger-500)]/10 text-[var(--danger-500)] border-[var(--danger-500)]/20' 
                      : 'bg-[var(--success-500)]/10 text-[var(--success-500)] border-[var(--success-500)]/20'
                  }`}>
                    {lead.dnc ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                    {lead.status}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg">
                    <MoreVertical size={16} />
                  </Button>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
