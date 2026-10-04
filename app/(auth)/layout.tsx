import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <MarketingHeader />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12 sm:px-8 sm:py-16">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
        <div className="relative z-10 w-full max-w-md">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
