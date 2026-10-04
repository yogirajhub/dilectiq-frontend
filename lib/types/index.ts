// ── Core API Types ──────────────────────────────────────────
export type Direction = "inbound" | "outbound" | "both";
export type Language  = "hindi" | "english" | "hinglish";
export type CallStatus =
  | "initiated"
  | "ringing"
  | "in-progress"
  | "completed"
  | "failed"
  | "no-answer"
  | "busy";

// ── Health ──────────────────────────────────────────────────
export interface HealthResponse {
  status: "ok" | "degraded" | "down";
  agents_loaded: number;
  active_calls: number;
  credentials: {
    twilio: boolean;
    sarvam: boolean;
    groq: boolean;
  };
}

// ── Agent ──────────────────────────────────────────────────
export interface Agent {
  agent_id: string;
  display_name: string;
  direction: Direction;
  llm_model: string;
  voice_id: string;
  language: Language;
  consent_required: boolean;
  max_call_duration_seconds: number;
}

export interface AgentDetail extends Agent {
  escalation_rules: EscalationRule[];
  retry_policy: RetryPolicy;
  tools: Tool[];
  system_prompt_preview: string;
}

export interface EscalationRule {
  trigger: string;
  action: string;
}

export interface RetryPolicy {
  max_attempts: number;
  delay_seconds: number;
  backoff: "linear" | "exponential";
}

export interface Tool {
  name: string;
  description: string;
  type: string;
}

export interface AgentsResponse {
  count: number;
  agents: Agent[];
}

// ── Call ──────────────────────────────────────────────────
export interface StartCallRequest {
  phone_number: string;
  context_payload: Record<string, string>;
}

export interface StartCallResponse {
  status: string;
  call_id: string;
  agent_id: string;
  target: string;
  twilio_sid: string;
}

export interface CallStatus_Response {
  call_id: string;
  agent_id: string;
  direction: Direction;
  status: CallStatus;
  duration_seconds: number;
  turn_count: number;
  cache_hits: number;
  cache_misses: number;
  escalated: boolean;
}

// ── Knowledge ─────────────────────────────────────────────
export interface IngestKnowledgeRequest {
  content: string;
  source: string;
  chunk_size?: number;
  overlap?: number;
}

export interface SeedQARequest {
  pairs: Array<{ question: string; answer: string }>;
}

// ── Consent / DNC ─────────────────────────────────────────
export interface DNCEntry {
  phone_number: string;
  added_at: string;
  reason?: string;
}

export interface ConsentAuditEntry {
  id: string;
  phone_number: string;
  event: string;
  timestamp: string;
  agent_id?: string;
  call_id?: string;
}

export interface FrequencyEntry {
  phone_number: string;
  call_count_24h: number;
  last_called_at: string;
  within_cap: boolean;
}

// ── Mock-only types (frontend extensions) ─────────────────
export type AgentTemplate = {
  id: string;
  name: string;
  icon: string;
  direction: Direction;
  useCase: string;
  description: string;
  industry: string;
  color: string;
};

export type MyAgent = Agent & {
  status: "active" | "paused" | "draft";
  calls_handled: number;
  created_at: string;
  updated_at: string;
  template_id?: string;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  tags: string[];
  status: "pending" | "called" | "failed" | "dnc";
  campaign_id?: string;
  added_at: string;
  extra: Record<string, string>;
};

export type Campaign = {
  id: string;
  name: string;
  agent_id: string;
  number_id: string;
  lead_count: number;
  completed: number;
  status: "draft" | "running" | "paused" | "completed" | "stopped";
  schedule_start: string;
  calling_window_start: string;
  calling_window_end: string;
  retry_attempts: number;
  daily_cap: number;
  created_at: string;
};

export type PhoneNumber = {
  id: string;
  number: string;
  country: string;
  type: "local" | "toll-free" | "mobile";
  assigned_agent_id?: string;
  direction: Direction;
  status: "active" | "released";
  monthly_cost: number;
  purchased_at: string;
};

export type Ticket = {
  id: string;
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  created_at: string;
  updated_at: string;
  messages: TicketMessage[];
};

export type TicketMessage = {
  id: string;
  sender: "user" | "admin";
  content: string;
  created_at: string;
};

export type InvoiceRecord = {
  id: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed";
  issued_at: string;
  period: string;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member" | "viewer";
  avatar?: string;
  joined_at: string;
};

// ── API Error ─────────────────────────────────────────────
export interface APIError {
  status: number;
  message: string;
  code?: string;
}
