import { apiFetch, apiFetchValidated, USE_MOCKS } from "@/lib/api/client";
import {
  HealthSchema,
  AgentsResponseSchema,
  AgentDetailSchema,
  StartCallResponseSchema,
  CallStatusSchema,
} from "@/lib/api/schemas";
import type {
  HealthResponse,
  AgentsResponse,
  AgentDetail,
  StartCallRequest,
  StartCallResponse,
  CallStatus_Response,
  IngestKnowledgeRequest,
  SeedQARequest,
} from "@/lib/types";
import { mockHealth, mockAgents, mockAgentDetail, mockCallStatus } from "@/lib/mocks/agents";

// ── Health ─────────────────────────────────────────────────
export async function getHealth(): Promise<HealthResponse> {
  if (USE_MOCKS) return mockHealth();
  return apiFetchValidated("/health", HealthSchema);
}

// ── Agents ─────────────────────────────────────────────────
export async function getAgents(): Promise<AgentsResponse> {
  if (USE_MOCKS) return mockAgents();
  return apiFetchValidated("/agents", AgentsResponseSchema);
}

export async function getAgent(agentId: string): Promise<AgentDetail> {
  if (USE_MOCKS) return mockAgentDetail(agentId);
  return apiFetchValidated(`/agents/${agentId}`, AgentDetailSchema);
}

// ── Calls ──────────────────────────────────────────────────
export async function startCall(
  agentId: string,
  body: StartCallRequest
): Promise<StartCallResponse> {
  if (USE_MOCKS) {
    return {
      status: "initiated",
      call_id: `call_${crypto.randomUUID().slice(0, 8)}`,
      agent_id: agentId,
      target: body.phone_number,
      twilio_sid: `CA${Math.random().toString(36).slice(2, 18)}`,
    };
  }
  return apiFetchValidated(
    `/agents/${agentId}/call`,
    StartCallResponseSchema,
    { method: "POST", body: JSON.stringify(body) }
  );
}

export async function getCallStatus(callId: string): Promise<CallStatus_Response> {
  if (USE_MOCKS) return mockCallStatus(callId);
  return apiFetchValidated(`/calls/${callId}/status`, CallStatusSchema);
}

// ── Knowledge ─────────────────────────────────────────────
export async function ingestKnowledge(
  agentId: string,
  body: IngestKnowledgeRequest
): Promise<{ status: string; chunks: number }> {
  if (USE_MOCKS) {
    await new Promise((r) => setTimeout(r, 800));
    return { status: "ingested", chunks: Math.floor(body.content.length / 300) + 1 };
  }
  return apiFetch(`/agents/${agentId}/knowledge/ingest`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function seedQA(
  agentId: string,
  body: SeedQARequest
): Promise<{ status: string; seeded: number }> {
  if (USE_MOCKS) {
    await new Promise((r) => setTimeout(r, 600));
    return { status: "seeded", seeded: body.pairs.length };
  }
  return apiFetch(`/agents/${agentId}/knowledge/seed-qa`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ── Consent / DNC ─────────────────────────────────────────
export async function addToDNC(phone: string, reason?: string): Promise<{ status: string }> {
  if (USE_MOCKS) return { status: "added" };
  return apiFetch("/consent/dnc/add", {
    method: "POST",
    body: JSON.stringify({ phone_number: phone, reason }),
  });
}

export async function removeFromDNC(phone: string): Promise<{ status: string }> {
  if (USE_MOCKS) return { status: "removed" };
  return apiFetch(`/consent/dnc/remove?phone_number=${encodeURIComponent(phone)}`, {
    method: "DELETE",
  });
}

export async function checkDNC(phone: string): Promise<{ on_dnc: boolean }> {
  if (USE_MOCKS) return { on_dnc: phone.endsWith("0000") };
  return apiFetch(`/consent/dnc/check?phone_number=${encodeURIComponent(phone)}`);
}

export async function getConsentAudit(): Promise<{ entries: unknown[] }> {
  if (USE_MOCKS) return { entries: [] };
  return apiFetch("/consent/audit");
}

export async function getFrequency(phone: string): Promise<{ entries: unknown[] }> {
  if (USE_MOCKS) return { entries: [] };
  return apiFetch(`/consent/frequency?phone_number=${encodeURIComponent(phone)}`);
}
