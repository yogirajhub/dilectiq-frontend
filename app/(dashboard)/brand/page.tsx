import type { Metadata } from "next";
import { DilectIQIconA, DilectIQIconB, DilectIQWordmarkC } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Brand Logos",
};

export default function BrandPage() {
  return (
    <div className="space-y-12 max-w-4xl p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Brand Logo Options</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Review the new teal/warm dark logo options. Option A is currently active across the app.
        </p>
      </div>

      <div className="space-y-12">
        {/* Option A */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Option A: Sound-wave &quot;D&quot; Tile</h2>
          <p className="text-sm text-muted-foreground">Minimal mark: 3 rounded vertical sound bars whose heights form a soft &quot;D&quot; silhouette in a dark tile.</p>
          <div className="flex items-end gap-8 p-8 rounded-2xl bg-card border border-border">
            <div className="space-y-2 text-center"><DilectIQIconA size={64} /><p className="text-xs text-muted-foreground">64px</p></div>
            <div className="space-y-2 text-center"><DilectIQIconA size={32} /><p className="text-xs text-muted-foreground">32px</p></div>
            <div className="space-y-2 text-center"><DilectIQIconA size={16} /><p className="text-xs text-muted-foreground">16px</p></div>
            <div className="space-y-2 text-center"><DilectIQIconA size={32} monochrome /><p className="text-xs text-muted-foreground">Mono</p></div>
          </div>
        </section>

        {/* Option B */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Option B: Speech Bubble Waveform</h2>
          <p className="text-sm text-muted-foreground">Same tile, mark is a speech bubble outline with a tiny waveform inside.</p>
          <div className="flex items-end gap-8 p-8 rounded-2xl bg-card border border-border">
            <div className="space-y-2 text-center"><DilectIQIconB size={64} /><p className="text-xs text-muted-foreground">64px</p></div>
            <div className="space-y-2 text-center"><DilectIQIconB size={32} /><p className="text-xs text-muted-foreground">32px</p></div>
            <div className="space-y-2 text-center"><DilectIQIconB size={16} /><p className="text-xs text-muted-foreground">16px</p></div>
            <div className="space-y-2 text-center"><DilectIQIconB size={32} monochrome /><p className="text-xs text-muted-foreground">Mono</p></div>
          </div>
        </section>

        {/* Option C */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Option C: Pure Wordmark</h2>
          <p className="text-sm text-muted-foreground">Clean geometric sans where &quot;IQ&quot; is heavier and the Q has a sound-wave notch. No icon.</p>
          <div className="flex flex-col gap-8 p-8 rounded-2xl bg-card border border-border">
            <div className="space-y-2"><DilectIQWordmarkC height={64} /><p className="text-xs text-muted-foreground">64px</p></div>
            <div className="space-y-2"><DilectIQWordmarkC height={32} /><p className="text-xs text-muted-foreground">32px</p></div>
            <div className="space-y-2"><DilectIQWordmarkC height={16} /><p className="text-xs text-muted-foreground">16px</p></div>
            <div className="space-y-2"><DilectIQWordmarkC height={32} monochrome /><p className="text-xs text-muted-foreground">Mono</p></div>
          </div>
        </section>
      </div>
    </div>
  );
}
