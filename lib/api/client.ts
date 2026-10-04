import { z } from "zod";
import type { APIError } from "@/lib/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

// ── Custom API error class ─────────────────────────────────
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ── Base fetch wrapper ─────────────────────────────────────
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    let errorBody: Partial<APIError> = {};
    try {
      errorBody = (await res.json()) as Partial<APIError>;
    } catch {
      // ignore JSON parse error
    }
    throw new ApiError(
      res.status,
      errorBody.message ?? `HTTP ${res.status}: ${res.statusText}`,
      errorBody.code
    );
  }

  return res.json() as Promise<T>;
}

// ── Zod-validated fetch ────────────────────────────────────
export async function apiFetchValidated<T>(
  path: string,
  schema: z.ZodType<T>,
  options?: RequestInit
): Promise<T> {
  const data = await apiFetch<unknown>(path, options);
  return schema.parse(data);
}

// ── Export config flags ────────────────────────────────────
export { USE_MOCKS, API_BASE };
