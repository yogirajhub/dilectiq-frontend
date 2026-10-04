import { SVGProps } from "react";

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
  height?: number;
  monochrome?: boolean;
}

// ── Option A: Sound-wave "D" in a tile ─────────────────────────────────
export function DilectIQIconA({ size = 36, monochrome = false, ...props }: LogoProps) {
  const fg = monochrome ? "currentColor" : "#2F8F7D";
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DilectIQ Icon Option A"
      role="img"
      {...props}
    >
      <rect width="36" height="36" rx="9" fill={monochrome ? "transparent" : "#1C1917"} />
      {/* Sound bars forming a 'D' */}
      <rect x="10" y="8" width="4" height="20" rx="2" fill={fg} />
      <rect x="16" y="10" width="4" height="16" rx="2" fill={fg} />
      <rect x="22" y="13" width="4" height="10" rx="2" fill={fg} />
    </svg>
  );
}

// ── Option B: Speech Bubble with Waveform ────────────────────────────────
export function DilectIQIconB({ size = 36, monochrome = false, ...props }: LogoProps) {
  const fg = monochrome ? "currentColor" : "#2F8F7D";
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DilectIQ Icon Option B"
      role="img"
      {...props}
    >
      <rect width="36" height="36" rx="9" fill={monochrome ? "transparent" : "#1C1917"} />
      <path
        d="M10 12C10 9.79086 11.7909 8 14 8H22C24.2091 8 26 9.79086 26 12V20C26 22.2091 24.2091 24 22 24H16L10 28V12Z"
        stroke={fg}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tiny waveform inside */}
      <rect x="14" y="14" width="2" height="6" rx="1" fill={fg} />
      <rect x="17" y="12" width="2" height="8" rx="1" fill={fg} />
      <rect x="20" y="14" width="2" height="6" rx="1" fill={fg} />
    </svg>
  );
}

// ── Option C: Pure Wordmark ─────────────────────────────────────────────
export function DilectIQWordmarkC({ height = 24, monochrome = false, ...props }: LogoProps) {
  const fg = monochrome ? "currentColor" : "#2F8F7D";
  // We'll scale the SVG based on height, maintaining aspect ratio. Width approx 130 for height 24.
  const width = (height / 24) * 130;
  
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 130 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DilectIQ Wordmark Option C"
      role="img"
      {...props}
    >
      <text
        x="0"
        y="18"
        fontFamily="system-ui, sans-serif"
        fontSize="20"
        fontWeight="500"
        letterSpacing="-0.02em"
        fill={monochrome ? "currentColor" : "#EDEBE8"}
      >
        Dilect
      </text>
      <text
        x="55"
        y="18"
        fontFamily="system-ui, sans-serif"
        fontSize="20"
        fontWeight="800"
        letterSpacing="-0.02em"
        fill={fg}
      >
        IQ
      </text>
      {/* Small sound-wave notch in Q */}
      <path d="M72 15 C75 16, 75 18, 77 22" stroke={fg} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ── Default Exports (Using Option A + C for now as requested) ─────────────
export function DilectIQIcon(props: LogoProps) {
  return <DilectIQIconA {...props} />;
}

export function DilectIQWordmark(props: LogoProps) {
  // A lockup of Option A icon + Option C text
  const height = props.height || 28;
  const iconSize = height;
  
  return (
    <div className="flex items-center gap-2" style={{ color: props.monochrome ? "currentColor" : "inherit" }}>
      <DilectIQIconA size={iconSize} monochrome={props.monochrome} />
      <DilectIQWordmarkC height={height * 0.85} monochrome={props.monochrome} />
    </div>
  );
}

export function DilectIQWordmarkMono(props: LogoProps) {
  return <DilectIQWordmark {...props} monochrome />;
}
