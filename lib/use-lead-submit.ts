"use client";

import { useCallback, useState } from "react";
import type { LeadPayload } from "./schemas";

export type SubmitStatus = "idle" | "loading" | "success" | "error";
export type SubmitError = "rate_limit" | "other";

export function useLeadSubmit() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<SubmitError | null>(null);

  const submit = useCallback(async (payload: LeadPayload): Promise<boolean> => {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error === "rate_limit" ? "rate_limit" : "other");
        setStatus("error");
        return false;
      }
      setStatus("success");
      return true;
    } catch {
      setError("other");
      setStatus("error");
      return false;
    }
  }, []);

  const reset = useCallback(() => setStatus("idle"), []);

  return { status, error, submit, reset };
}
