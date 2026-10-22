/**
 * SatelliteSense Production Frontend Workstation Types
 * Maps strictly to FastAPI backend response schemas and grounded evidence structures.
 */

export interface SampleItem {
  id: string;
  class: string;
  filename: string;
  relative_path: string;
  url: string;
}

export interface PredictionItem {
  label: string;
  confidence: number;
}

export interface QualityReport {
  mean_brightness?: number;
  std_brightness?: number;
  cloud_occlusion_estimate?: number;
  dynamic_range_ratio?: number;
}

export interface PatchEvidence {
  patch_id: number;
  bbox: [number, number, number, number]; // [x, y, width, height] in original pixel coordinates
  scale: number;
  center_norm: [number, number];
  top_predictions: PredictionItem[];
  primary_evidence: string;
  evidence_confidence: number;
}

export interface ClaimItem {
  claim_id: number;
  statement: string;
  category: string;
  confidence: number;
  evidence_type: string;
  quality_status?: "high" | "moderate" | "low";
  evidence_regions?: number[]; // mapped patch_ids
}

export interface SingleAnalysisResponse {
  success: boolean;
  telemetry: {
    latency_ms: number;
    device: string;
    mode: string;
    backbone: string;
    checkpoint_loaded: boolean;
  };
  preview_data_url: string;
  analysis: {
    caption: string;
    claims: ClaimItem[];
    scene_predictions: PredictionItem[];
    quality_report: QualityReport;
    patch_evidence: PatchEvidence[];
    mode: string;
    baseline_comparison?: {
      baseline_top1_label: string | null;
      baseline_top1_confidence: number | null;
      confidence_delta: number;
    };
  };
}

/**
 * Section 5A: Multi-Caption Evidence Review Model
 * Separates real model output candidates from sample preview fixtures.
 */
export interface CaptionCandidate {
  candidate_id: number;
  source: "domain_adapted" | "baseline" | "prototype_fixture";
  model_label: string;
  caption_text: string;
  confidence?: number;
  is_calibrated: boolean;
  status: "verified" | "uncertain" | "unsupported" | "uncalibrated";
  evidence_patch_ids?: number[];
  evidence_regions?: {
    patch_id: number;
    bbox: [number, number, number, number];
    label: string;
  }[];
  raw_similarity?: number;
}

export interface CaptionReviewRow {
  image_id: string;
  image_src: string;
  filename: string;
  resolution_px: string;
  sensor?: string;
  gsd_m?: string;
  acquisition_date?: string;
  candidates: CaptionCandidate[];
  is_fixture_data: boolean;
}

export interface SceneGraphNode {
  id: string;
  label: string;
  type: "landcover" | "feature" | "water" | "structure";
  bbox?: [number, number, number, number];
  patch_id?: number;
}

export interface SceneGraphEdge {
  source: string;
  target: string;
  relation: "adjacent_to" | "contains" | "intersects" | "surrounds" | "borders";
  confidence?: number;
}

export interface SceneGraphData {
  nodes: SceneGraphNode[];
  edges: SceneGraphEdge[];
}

export interface TemporalChangeRecord {
  id: string;
  timestamp: string;
  scene_id: string;
  observed_change: string;
  possible_interpretation: string;
  inferred_cause: {
    text: string;
    verified: boolean;
    justification: string;
  };
  confidence?: number;
  region_bbox?: [number, number, number, number];
}

export interface LayerState {
  imageVisible: boolean;
  imageOpacity: number;
  boxesVisible: boolean;
  boxesOpacity: number;
  halosVisible: boolean;
  patchesVisible: boolean;
  patchesOpacity: number;
  heatmapVisible: boolean;
}
