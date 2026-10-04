"use client";

import Link from "next/link";
import { DilectIQWordmark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Industries", href: "/#industry" },
  { label: "Case studies", href: "/case-studies" },
  { label: "About", href: "/about" },
];

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-[72px] sm:h-20">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <DilectIQWordmark height={28} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" size="sm">Sign up</Button>
          </Link>
          <Link href="/demo">
            <Button size="sm" className="gap-2">
              Book a demo
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-sm text-muted-foreground hover:text-foreground py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t border-border">
            <Link href="/login">
              <Button variant="outline" className="w-full" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full" size="sm">
                Sign up
              </Button>
            </Link>
            <Link href="/demo">
              <Button className="w-full gap-2" size="sm">
                Book a demo
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
