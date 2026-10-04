"use client";

import { useState } from "react";
import { ArrowRight, Check, Headset, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const inputClassName = "h-11 rounded-lg border-border bg-background";

export default function DemoPage() {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmationOpen(true);
    event.currentTarget.reset();
  }

  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <div className="space-y-7 lg:pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <Headset size={14} />
            A real conversation with our team
          </div>
          <div className="space-y-4">
            <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Let&apos;s find the right voice workflow for your team.
            </h1>
            <p className="max-w-lg text-base leading-7 text-muted-foreground">
              Tell us a little about your business and what you&apos;re looking to improve. We&apos;ll reach out to understand your needs and walk you through DilectIQ.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary"><Check size={14} /></span>
              See a use case relevant to your business
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary"><Check size={14} /></span>
              Get answers from a member of our team
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary"><Check size={14} /></span>
              No commitment—just a useful conversation
            </li>
          </ul>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck size={15} className="text-primary" />
            Your details are only used to respond to your request.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/10 sm:p-8">
          <div className="mb-6 space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">Request a demo</h2>
            <p className="text-sm text-muted-foreground">Share your details and we&apos;ll be in touch.</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="demo-name">Name</Label>
              <Input id="demo-name" name="name" autoComplete="name" placeholder="Your full name" required className={inputClassName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-company">Company name</Label>
              <Input id="demo-company" name="company" autoComplete="organization" placeholder="Your company" required className={inputClassName} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="demo-email">Work email</Label>
                <Input id="demo-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required className={inputClassName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-phone">Phone number</Label>
                <Input id="demo-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" required className={inputClassName} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-purpose">What would you like to discuss?</Label>
              <select
                id="demo-purpose"
                name="purpose"
                required
                defaultValue=""
                className="flex h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
              >
                <option value="" disabled>Select a topic</option>
                <option value="lead-follow-up">Lead follow-up and qualification</option>
                <option value="customer-support">Customer support</option>
                <option value="payment-reminders">Payment reminders and collections</option>
                <option value="platform-overview">Platform overview</option>
                <option value="other">Something else</option>
              </select>
            </div>
            <Button type="submit" className="mt-2 h-11 w-full gap-2 rounded-xl">
              Request a call
              <ArrowRight size={16} />
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              We&apos;ll only contact you about this request.
            </p>
          </form>
        </div>
      </section>

      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="rounded-2xl border-border bg-card p-7 sm:max-w-sm">
          <DialogHeader className="items-center text-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check size={22} />
            </div>
            <DialogTitle className="text-xl">Thanks for reaching out</DialogTitle>
            <DialogDescription className="pt-1 leading-relaxed">
              Our team will contact you soon to learn more about what you need.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
