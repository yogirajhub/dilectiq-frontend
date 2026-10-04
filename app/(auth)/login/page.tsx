"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      // simulate network delay
      await new Promise(r => setTimeout(r, 600));
      const res = await loginAction(formData);
      if (res?.error) {
        setError(res.error);
      }
    });
  }

  return (
    <div className="relative space-y-6 overflow-hidden rounded-2xl border border-border/80 bg-card/95 p-7 shadow-xl shadow-black/10 sm:p-9">
      
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Welcome back</p>
        <h1 className="text-2xl font-semibold tracking-tight">Sign in to your workspace</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">Pick up where your team left off.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg text-center">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="m@example.com" 
            required 
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            required 
            className="h-11"
          />
        </div>
        
        <Button type="submit" className="w-full h-11 text-base rounded-xl" disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign In
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground pt-2">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline font-medium">
          Sign up
        </Link>
      </div>
    </div>
  );
}
