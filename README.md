# DilectIQ Frontend

DilectIQ is a multi-tenant AI voice-calling agent platform built for the Indian market, supporting Hindi, Hinglish, and English. This repository contains the Next.js frontend application.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables (Design Tokens)
- **UI Components**: shadcn/ui + lucide-react
- **State Management**: Zustand (UI state), TanStack Query (Data fetching & caching)
- **Forms & Validation**: react-hook-form + zod
- **Charts & Data Viz**: Recharts
- **Animations**: Framer Motion & native CSS animations

## 🛠 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd dilectiq-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   `requirements.txt` is a plain-text reference list of the npm runtime and development dependencies. It is not pip-compatible; use `package.json` and `package-lock.json` with npm to install dependencies.

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory based on the following template:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   
   # Toggle this to 'true' to use local mock data instead of real API calls
   NEXT_PUBLIC_USE_MOCKS=true
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Folder Structure

```text
dilectiq-app/
├── app/                      # Next.js App Router root
│   ├── (auth)/               # Authentication routes (Login, Signup, Forgot Password)
│   ├── (dashboard)/          # Authenticated dashboard routes
│   │   ├── agents/           # Agent templates, creation, and management
│   │   ├── analytics/        # Platform-wide metrics and charts
│   │   ├── billing/          # Usage and invoices
│   │   ├── calling/          # Individual calls, bulk campaigns, leads, and follow-ups
│   │   ├── integrations/     # CRM and Tool connections
│   │   ├── numbers/          # Phone number management
│   │   ├── overview/         # Main dashboard view
│   │   ├── settings/         # User prefs, API keys, and Compliance (DNC)
│   │   └── support/          # Ticketing and help docs
│   ├── (marketing)/          # Public landing page
│   ├── globals.css           # Core styling, design tokens, and utilities
│   └── layout.tsx            # Root layout
├── components/               # React components
│   ├── layout/               # Shell, Sidebar, TopBar, Command Palette
│   └── ui/                   # Reusable UI primitives (shadcn)
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities and services
│   ├── api/                  # API clients, schemas, and TanStack Query services
│   │   ├── schemas.ts        # Zod validation schemas
│   │   └── services.ts       # Typed API fetchers (mockable)
│   └── utils.ts              # Helper functions (e.g., tailwind class merging)
└── stores/                   # Zustand state stores
```

## 🎨 Design Tokens & Theming

The application uses a custom "Warm Dark & Teal" theme defined strictly through CSS variables in `app/globals.css`. 

### Key Colors
- **Backgrounds**: Deep, warm blacks (`#0A0A0A`) with layered charcoal surfaces (`#1C1917`, `#2A2622`).
- **Primary Accent**: Calm, muted teal (`#2F8F7D`) used for active states, primary buttons, and live indicators.
- **Text**: Soft creams (`#EDEBE8`) and warm grays (`#A8A29E`) to reduce eye strain.
- **Semantics**: Integrated with Tailwind's utility classes mapped to CSS variables (e.g., `text-[var(--danger-500)]`).

### Modifying the Theme
To adjust the design system, edit the `:root` and `.light` / `.dark` blocks in `app/globals.css`. The application leverages `next-themes` for robust dark/light mode switching.

### UI Signatures
- **Border Radius**: Generous 16px (`1rem`) border radii across cards and buttons for a modern feel.
- **Animations**: Purposeful micro-animations like the `.pulse-dot` (live indicator) and `.animate-waveform` (simulating active voice calls).
- **Accessibility**: Includes focus rings (`:focus-visible`), a `skip-to-content` link, and respects `@media (prefers-reduced-motion)`.

## 🔗 Backend Requirements

For details on the exact API endpoints expected by this frontend, refer to `BACKEND_GAPS.md` located in the project root. This file outlines missing routes, required query parameters, and expected JSON response shapes.
