import type {
  HealthResponse,
  AgentsResponse,
  AgentDetail,
  CallStatus_Response,
} from "@/lib/types";

// ── Health mock ────────────────────────────────────────────
export function mockHealth(): HealthResponse {
  return {
    status: "ok",
    agents_loaded: 9,
    active_calls: 3,
    credentials: {
      twilio: true,
      sarvam: true,
      groq: true,
    },
  };
}

// ── Agents mock ────────────────────────────────────────────
const AGENTS_DATA = [
  {
    agent_id: "agent_emi_001",
    display_name: "EMI Reminder Agent",
    direction: "outbound" as const,
    llm_model: "llama-3.1-70b",
    voice_id: "sarvam_hindi_female_01",
    language: "hinglish" as const,
    consent_required: true,
    max_call_duration_seconds: 180,
  },
  {
    agent_id: "agent_fraud_001",
    display_name: "Fraud Alert Agent",
    direction: "outbound" as const,
    llm_model: "llama-3.1-70b",
    voice_id: "sarvam_hindi_male_01",
    language: "hindi" as const,
    consent_required: true,
    max_call_duration_seconds: 120,
  },
  {
    agent_id: "agent_support_001",
    display_name: "Customer Support Bot",
    direction: "inbound" as const,
    llm_model: "llama-3.1-8b",
    voice_id: "sarvam_english_female_01",
    language: "english" as const,
    consent_required: false,
    max_call_duration_seconds: 600,
  },
  {
    agent_id: "agent_appt_001",
    display_name: "Appointment Scheduler",
    direction: "both" as const,
    llm_model: "llama-3.1-70b",
    voice_id: "sarvam_hinglish_female_01",
    language: "hinglish" as const,
    consent_required: false,
    max_call_duration_seconds: 300,
  },
  {
    agent_id: "agent_survey_001",
    display_name: "Survey & Feedback Agent",
    direction: "outbound" as const,
    llm_model: "llama-3.1-8b",
    voice_id: "sarvam_hindi_female_02",
    language: "hindi" as const,
    consent_required: true,
    max_call_duration_seconds: 240,
  },
  {
    agent_id: "agent_sales_001",
    display_name: "Sales Outreach Agent",
    direction: "outbound" as const,
    llm_model: "llama-3.1-70b",
    voice_id: "sarvam_hinglish_male_01",
    language: "hinglish" as const,
    consent_required: true,
    max_call_duration_seconds: 360,
  },
  {
    agent_id: "agent_renewal_001",
    display_name: "Policy Renewal Agent",
    direction: "outbound" as const,
    llm_model: "llama-3.1-70b",
    voice_id: "sarvam_hindi_male_02",
    language: "hinglish" as const,
    consent_required: true,
    max_call_duration_seconds: 300,
  },
  {
    agent_id: "agent_collections_001",
    display_name: "Collections Agent",
    direction: "outbound" as const,
    llm_model: "llama-3.1-70b",
    voice_id: "sarvam_hindi_male_01",
    language: "hindi" as const,
    consent_required: true,
    max_call_duration_seconds: 240,
  },
  {
    agent_id: "agent_welcome_001",
    display_name: "Welcome & Onboarding Agent",
    direction: "inbound" as const,
    llm_model: "llama-3.1-8b",
    voice_id: "sarvam_english_male_01",
    language: "english" as const,
    consent_required: false,
    max_call_duration_seconds: 480,
  },
];

export function mockAgents(): AgentsResponse {
  return {
    count: AGENTS_DATA.length,
    agents: AGENTS_DATA,
  };
}

export function mockAgentDetail(agentId: string): AgentDetail {
  const base = AGENTS_DATA.find((a) => a.agent_id === agentId) ?? AGENTS_DATA[0]!;
  return {
    ...base,
    escalation_rules: [
      { trigger: "customer_angry", action: "transfer_human" },
      { trigger: "unknown_query", action: "transfer_human" },
      { trigger: "legal_mention", action: "end_call" },
    ],
    retry_policy: {
      max_attempts: 3,
      delay_seconds: 1800,
      backoff: "exponential",
    },
    tools: [
      { name: "check_emi_status", description: "Check EMI payment status for customer", type: "api" },
      { name: "send_sms", description: "Send confirmation SMS to customer", type: "notification" },
    ],
    system_prompt_preview: `You are a professional ${base.display_name} for DilectIQ. Always introduce yourself clearly and verify the customer identity before discussing sensitive information. Maintain a helpful, empathetic tone throughout the call.`,
  };
}

// ── Call status mock (progress simulation) ─────────────────
const CALL_PROGRESSIONS: CallStatus_Response["status"][] = [
  "initiated",
  "ringing",
  "in-progress",
  "in-progress",
  "in-progress",
  "completed",
];

const _callStates = new Map<string, number>();

export function mockCallStatus(callId: string): CallStatus_Response {
  const idx = _callStates.get(callId) ?? 0;
  _callStates.set(callId, Math.min(idx + 1, CALL_PROGRESSIONS.length - 1));

  const status = CALL_PROGRESSIONS[idx] ?? "initiated";
  const duration = status === "completed" ? 87 : idx * 12;
  const turnCount = Math.floor(duration / 10);

  return {
    call_id: callId,
    agent_id: "agent_emi_001",
    direction: "outbound",
    status,
    duration_seconds: duration,
    turn_count: turnCount,
    cache_hits: Math.floor(turnCount * 0.7),
    cache_misses: Math.ceil(turnCount * 0.3),
    escalated: false,
  };
}
