"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="relative space-y-6 overflow-hidden rounded-2xl border border-border/80 bg-card/95 p-7 shadow-xl shadow-black/10 sm:p-9">
      
      {!submitted ? (
        <>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Account recovery</p>
            <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required className="h-11" />
            </div>
            
            <Button type="submit" className="w-full h-11 text-base rounded-xl mt-2">
              Send reset link
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center space-y-6 py-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="text-primary" size={32} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent a password reset link to your email address.
            </p>
          </div>
        </div>
      )}

      <div className="text-center pt-2">
        <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </div>
    </div>
  );
}
