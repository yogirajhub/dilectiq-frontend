"use client";

import { useState } from "react";
import { Search, MapPin, PhoneIncoming, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const SEARCH_RESULTS = [
  { phone: "+91 99887 76655", type: "Local", location: "Maharashtra, India", price: "₹250/mo" },
  { phone: "+91 99887 76656", type: "Local", location: "Maharashtra, India", price: "₹250/mo" },
  { phone: "+91 80 1234 5678", type: "Toll-Free", location: "India", price: "₹800/mo" },
];

export default function BuyNumberPage() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1000);
  };

  const handleBuy = (phone: string) => {
    setBuyingId(phone);
    setTimeout(() => {
      setBuyingId(null);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-16 h-16 bg-[var(--success-500)]/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="text-[var(--success-500)]" size={32} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Number Purchased Successfully</h2>
        <p className="text-muted-foreground">The number has been added to your account and is ready for routing.</p>
        <Button onClick={() => router.push("/numbers/my")} className="mt-4 rounded-xl px-8 h-11">
          View My Numbers
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Buy New Number</h1>
        <p className="text-sm text-muted-foreground">Search and provision local or toll-free numbers instantly.</p>
      </div>

      <div className="bg-card border border-border p-6 rounded-3xl max-w-2xl">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Country</Label>
              <select className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm">
                <option value="IN">India (+91)</option>
                <option value="US">United States (+1)</option>
                <option value="GB">United Kingdom (+44)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <select className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm">
                <option value="local">Local</option>
                <option value="toll-free">Toll-Free</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>
          </div>
          
          <Button type="submit" className="w-full h-11 rounded-xl gap-2" disabled={isSearching}>
            {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Search Available Numbers
          </Button>
        </form>
      </div>

      {hasSearched && (
        <div className="space-y-4 max-w-2xl animate-in fade-in slide-in-from-bottom-4">
          <h3 className="font-semibold text-lg">Available Numbers</h3>
          <div className="grid gap-4">
            {SEARCH_RESULTS.map((res) => (
              <div key={res.phone} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <PhoneIncoming size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold font-mono text-foreground">{res.phone}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {res.location}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{res.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{res.price}</span>
                  <Button 
                    onClick={() => handleBuy(res.phone)} 
                    disabled={buyingId === res.phone}
                    className="rounded-xl px-6"
                  >
                    {buyingId === res.phone ? <Loader2 size={16} className="animate-spin" /> : "Buy"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
