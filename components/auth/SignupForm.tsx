"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { loginAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm({ compact = false }: { compact?: boolean }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-center text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor={compact ? "dialog-firstName" : "firstName"}>First name</Label>
          <Input
            id={compact ? "dialog-firstName" : "firstName"}
            name="firstName"
            autoComplete="given-name"
            required
            className="h-11"
            placeholder="Aarav"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={compact ? "dialog-lastName" : "lastName"}>Last name</Label>
          <Input
            id={compact ? "dialog-lastName" : "lastName"}
            name="lastName"
            autoComplete="family-name"
            required
            className="h-11"
            placeholder="Sharma"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={compact ? "dialog-signup-email" : "signup-email"}>Work email</Label>
        <Input
          id={compact ? "dialog-signup-email" : "signup-email"}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={compact ? "dialog-signup-password" : "signup-password"}>Password</Label>
        <Input
          id={compact ? "dialog-signup-password" : "signup-password"}
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="h-11"
        />
      </div>

      <Button type="submit" className="h-11 w-full rounded-xl" disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create your account
      </Button>

      {!compact && (
        <>
          <p className="px-3 text-center text-xs leading-relaxed text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline underline-offset-2 hover:text-primary">Terms of Service</Link>
            {" "}and{" "}
            <Link href="#" className="underline underline-offset-2 hover:text-primary">Privacy Policy</Link>.
          </p>
          <p className="border-t border-border pt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </>
      )}
    </form>
  );
}
