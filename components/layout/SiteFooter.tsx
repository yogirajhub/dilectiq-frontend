"use client";

import Link from "next/link";
import { DilectIQWordmark } from "@/components/brand/logo";

export function SiteFooter() {
  return (
    <footer className="relative flex min-h-[680px] w-full flex-col overflow-hidden bg-[var(--footer-bg)] pt-16 pb-14 text-[var(--foreground)] sm:pt-20 lg:min-h-[700px]">
      <div className="relative z-10 mx-auto w-full max-w-[1490px] px-6 pt-8 sm:px-8 sm:pt-10 lg:px-12 lg:pt-12">
        <div className="grid grid-cols-1 gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:pb-16">
          
          {/* Left Block: Logo, Description, Socials */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-6">
            <DilectIQWordmark height={30} monochrome />
            <p className="max-w-[590px] text-sm leading-relaxed text-muted-foreground">
              Deploy AI voice agents that talk like your best caller. Qualify leads, recover payments and support customers in Hindi, English and Hinglish, with full visibility into every call.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Right Block: Link Columns */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-2 sm:grid-cols-3 lg:col-span-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wide text-white">Product</h3>
              <ul className="space-y-3.5">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Voice AI Agents</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Call Analytics and QA</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Bulk Campaigns</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Security</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wide text-white">Industry</h3>
              <ul className="space-y-3.5">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">BFSI and Collections</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Real Estate</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Healthcare</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">E-commerce</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wide text-white">Company</h3>
              <ul className="space-y-3.5">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blogs</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex h-[58%] select-none items-end justify-center overflow-hidden px-2 sm:h-[62%] sm:px-6">
        <span
          className="block whitespace-nowrap text-center text-[clamp(5rem,23vw,25rem)] font-black leading-[0.82] tracking-[-0.075em] text-[color:var(--footer-watermark)]"
          style={{
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 48%, transparent 100%)",
            maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 48%, transparent 100%)",
          }}
        >
          DilectIQ
        </span>
      </div>

      <p className="absolute inset-x-0 bottom-4 z-20 px-4 text-center text-xs text-muted-foreground/80">
        &copy; {new Date().getFullYear()} DilectIQ. All rights reserved.
      </p>
    </footer>
  );
}
