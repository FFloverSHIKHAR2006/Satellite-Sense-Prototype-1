import {
  SampleItem,
  SingleAnalysisResponse,
} from "@/types/workstation";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export class SatelliteSenseApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "SatelliteSenseApiError";
    this.status = status;
  }
}

export async function fetchHealthCheck() {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    if (!res.ok) throw new SatelliteSenseApiError(`Health check failed (${res.status})`, res.status);
    return await res.json();
  } catch (err: any) {
    if (err instanceof SatelliteSenseApiError) throw err;
    throw new SatelliteSenseApiError(
      "Backend service is unreachable at localhost:8000. Verify the FastAPI daemon is active.",
      0
    );
  }
}

export async function fetchSampleCatalog(): Promise<SampleItem[]> {
  try {
    const res = await fetch(`${API_BASE}/api/samples`);
    if (!res.ok) throw new SatelliteSenseApiError(`Sample catalog fetch failed (${res.status})`, res.status);
    const data = await res.json();
    return data.samples || [];
  } catch (err: any) {
    console.warn("[API] Could not fetch samples from live backend:", err.message);
    return [];
  }
}

export async function analyzeSingleImage(options: {
  file?: File | null;
  sampleId?: string | null;
  extractPatches?: boolean;
  mode?: "domain_adapted" | "baseline";
}): Promise<SingleAnalysisResponse> {
  const formData = new FormData();
  if (options.file) {
    formData.append("file", options.file);
  } else if (options.sampleId) {
    formData.append("sample_id", options.sampleId);
  } else {
    throw new SatelliteSenseApiError("Specify either an image file or sample_id to analyze.", 400);
  }

  formData.append("extract_patches", String(options.extractPatches ?? true));
  formData.append("mode", options.mode || "domain_adapted");

  try {
    const res = await fetch(`${API_BASE}/api/analyze/single`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      let detail = `Analysis request failed with status ${res.status}`;
      try {
        const errorData = await res.json();
        if (errorData.detail) detail = errorData.detail;
      } catch {
        // Fall back to status text
      }
      throw new SatelliteSenseApiError(detail, res.status);
    }

    return await res.json();
  } catch (err: any) {
    if (err instanceof SatelliteSenseApiError) throw err;
    throw new SatelliteSenseApiError(
      `Network communication error: ${err.message}. Ensure backend is running.`,
      0
    );
  }
}

export async function runEvaluationBaseline() {
  const res = await fetch(`${API_BASE}/api/evaluate`, { method: "POST" });
  if (!res.ok) throw new SatelliteSenseApiError("Baseline evaluation failed", res.status);
  return await res.json();
}

export async function runEvaluationWeek2() {
  const res = await fetch(`${API_BASE}/api/evaluate/week2`, { method: "POST" });
  if (!res.ok) throw new SatelliteSenseApiError("Week 2 evaluation failed", res.status);
  return await res.json();
}
