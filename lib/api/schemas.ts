import { z } from "zod";

// ── Health ────────────────────────────────────────────────
export const HealthSchema = z.object({
  status: z.enum(["ok", "degraded", "down"]),
  agents_loaded: z.number(),
  active_calls: z.number(),
  credentials: z.object({
    twilio: z.boolean(),
    sarvam: z.boolean(),
    groq: z.boolean(),
  }),
});

// ── Agent ─────────────────────────────────────────────────
const DirectionSchema = z.enum(["inbound", "outbound", "both"]);
const LanguageSchema = z.enum(["hindi", "english", "hinglish"]);

export const AgentSchema = z.object({
  agent_id: z.string(),
  display_name: z.string(),
  direction: DirectionSchema,
  llm_model: z.string(),
  voice_id: z.string(),
  language: LanguageSchema,
  consent_required: z.boolean(),
  max_call_duration_seconds: z.number(),
});

export const EscalationRuleSchema = z.object({
  trigger: z.string(),
  action: z.string(),
});

export const RetryPolicySchema = z.object({
  max_attempts: z.number(),
  delay_seconds: z.number(),
  backoff: z.enum(["linear", "exponential"]),
});

export const ToolSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.string(),
});

export const AgentDetailSchema = AgentSchema.extend({
  escalation_rules: z.array(EscalationRuleSchema),
  retry_policy: RetryPolicySchema,
  tools: z.array(ToolSchema),
  system_prompt_preview: z.string(),
});

export const AgentsResponseSchema = z.object({
  count: z.number(),
  agents: z.array(AgentSchema),
});

// ── Call ──────────────────────────────────────────────────
export const StartCallRequestSchema = z.object({
  phone_number: z
    .string()
    .regex(/^\+[1-9]\d{7,14}$/, "Must be valid E.164 format (e.g. +919876543210)"),
  context_payload: z.record(z.string(), z.string()),
});

export const StartCallResponseSchema = z.object({
  status: z.string(),
  call_id: z.string(),
  agent_id: z.string(),
  target: z.string(),
  twilio_sid: z.string(),
});

export const CallStatusSchema = z.object({
  call_id: z.string(),
  agent_id: z.string(),
  direction: DirectionSchema,
  status: z.enum([
    "initiated",
    "ringing",
    "in-progress",
    "completed",
    "failed",
    "no-answer",
    "busy",
  ]),
  duration_seconds: z.number(),
  turn_count: z.number(),
  cache_hits: z.number(),
  cache_misses: z.number(),
  escalated: z.boolean(),
});

// ── Knowledge ─────────────────────────────────────────────
export const IngestKnowledgeSchema = z.object({
  content: z.string().min(1, "Content is required"),
  source: z.string().min(1, "Source is required"),
  chunk_size: z.number().optional(),
  overlap: z.number().optional(),
});

export const SeedQAPairSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const SeedQASchema = z.object({
  pairs: z.array(SeedQAPairSchema).min(1, "At least one Q&A pair required"),
});

// ── Consent / DNC ─────────────────────────────────────────
export const DNCEntrySchema = z.object({
  phone_number: z.string(),
  added_at: z.string(),
  reason: z.string().optional(),
});

export const ConsentAuditEntrySchema = z.object({
  id: z.string(),
  phone_number: z.string(),
  event: z.string(),
  timestamp: z.string(),
  agent_id: z.string().optional(),
  call_id: z.string().optional(),
});

export const FrequencyEntrySchema = z.object({
  phone_number: z.string(),
  call_count_24h: z.number(),
  last_called_at: z.string(),
  within_cap: z.boolean(),
});
