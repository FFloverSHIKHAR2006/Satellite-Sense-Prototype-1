import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Upload,
  ArrowRight,
  Info,
  Maximize2,
  Eye,
  SlidersHorizontal,
  FileText,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useWorkstation } from "@/context/WorkstationContext";
import {
  CaptionCandidate,
} from "@/types/workstation";
import { SAMPLE_CAPTION_REVIEW_FIXTURES } from "@/data/captionReviewFixtures";
import { cn } from "@/lib/utils";

export const CaptionReviewPage: React.FC = () => {
  const {
    openImageInWorkstation,
    loadUserImage,
  } = useWorkstation();

  const [selectedCandidate, setSelectedCandidate] = useState<{
    rowId: string;
    candidateId: number;
  }>({
    rowId: SAMPLE_CAPTION_REVIEW_FIXTURES[0].image_id,
    candidateId: 1,
  });

  const [hoveredRegion, setHoveredRegion] = useState<{
    rowId: string;
    patchId: number;
  } | null>(null);

  // View mode: 'general' (clean text as in reference screenshot) vs 'detailed' (shows confidence/status badges)
  const [viewMode, setViewMode] = useState<"general" | "detailed">("general");
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  const handleSpeak = (text: string) => {
    if (!window.speechSynthesis) return;
    if (speakingText === text) {
      window.speechSynthesis.cancel();
      setSpeakingText(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingText(null);
    utterance.onerror = () => setSpeakingText(null);
    setSpeakingText(text);
    window.speechSynthesis.speak(utterance);
  };

  const getStatusBadge = (status: CaptionCandidate["status"]) => {
    switch (status) {
      case "verified":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[11px] font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-800/60">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Verified
          </span>
        );
      case "uncertain":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[11px] font-medium bg-amber-950/40 text-amber-400 border border-amber-800/60">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            Partially Supported
          </span>
        );
      case "unsupported":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[11px] font-medium bg-rose-950/40 text-rose-400 border border-rose-800/60">
            <XCircle className="w-3 h-3 text-rose-400" />
            Unsupported
          </span>
        );
      case "uncalibrated":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[11px] font-medium bg-surface-raised text-content-muted border border-border-subtle">
            <HelpCircle className="w-3 h-3 text-content-muted" />
            Not Evaluated
          </span>
        );
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadUserImage(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-workstation">
      {/* Top Bar with Mode Toggle & Upload */}
      <div className="flex-none bg-panel border-b border-border-subtle px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-content-secondary">
          <Info className="w-4 h-4 text-accent shrink-0" />
          <span className="text-content-primary font-medium">
            SatelliteSense Caption Review: Natural general language descriptions paired with overhead imagery.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* General Text vs Detailed Telemetry Switcher */}
          <div className="flex items-center bg-surface border border-border-subtle rounded-xs p-0.5">
            <button
              onClick={() => setViewMode("general")}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-xs font-mono text-[11px] transition-colors",
                viewMode === "general"
                  ? "bg-accent/20 text-accent font-medium border border-accent/40"
                  : "text-content-secondary hover:text-content-primary"
              )}
              title="Clean general text matching reference screenshot"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>General Text View</span>
            </button>
            <button
              onClick={() => setViewMode("detailed")}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-xs font-mono text-[11px] transition-colors",
                viewMode === "detailed"
                  ? "bg-accent/20 text-accent font-medium border border-accent/40"
                  : "text-content-secondary hover:text-content-primary"
              )}
              title="Inspect technical confidence and region metrics"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Evidence & Metrics</span>
            </button>
          </div>

          <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-xs bg-surface-raised hover:bg-surface-hover border border-border-subtle px-2.5 py-1 text-content-primary text-xs transition-colors">
            <Upload className="w-3 h-3 text-accent" />
            <span>Upload Image</span>
            <input
              type="file"
              accept="image/*,.tif,.tiff"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Vertically Scrollable Sequence of Image-Analysis Rows */}
      <div className="flex-1 overflow-y-auto divide-y divide-border-subtle">
        {SAMPLE_CAPTION_REVIEW_FIXTURES.map((row) => {
          const isRowSelected = selectedCandidate.rowId === row.image_id;
          const activeCandidate = row.candidates.find(
            (c) =>
              isRowSelected && c.candidate_id === selectedCandidate.candidateId
          ) || row.candidates[0];

          return (
            <div
              key={row.image_id}
              className="p-4 lg:p-6 flex flex-col lg:flex-row gap-6 hover:bg-surface/20 transition-colors"
            >
              {/* Left Column: Satellite Image Preview (40% desktop) */}
              <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 flex flex-col gap-2.5">
                <div className="relative aspect-square w-full bg-canvas border border-border-subtle overflow-hidden rounded-xs group">
                  <img
                    src={row.image_src}
                    alt={row.filename}
                    className="w-full h-full object-cover"
                  />

                  {/* SVG Overlay of Grounded Regions for Active Candidate */}
                  {activeCandidate?.evidence_regions && (
                    <svg
                      viewBox="0 0 1024 1024"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                    >
                      {activeCandidate.evidence_regions.map((reg) => {
                        const [rx, ry, rw, rh] = reg.bbox;
                        const isHovered =
                          hoveredRegion?.rowId === row.image_id &&
                          hoveredRegion?.patchId === reg.patch_id;

                        return (
                          <g key={reg.patch_id}>
                            <rect
                              x={rx}
                              y={ry}
                              width={rw}
                              height={rh}
                              fill={isHovered ? "rgba(56, 189, 248, 0.25)" : "rgba(56, 189, 248, 0.1)"}
                              stroke="#000000"
                              strokeWidth={6}
                            />
                            <rect
                              x={rx}
                              y={ry}
                              width={rw}
                              height={rh}
                              fill="none"
                              stroke={isHovered ? "#38BDF8" : "#0284C7"}
                              strokeWidth={3}
                            />
                            {/* Stitch Precision Corner Reticles */}
                            <line x1={rx} y1={ry} x2={rx + 16} y2={ry} stroke="#FFFFFF" strokeWidth={3} />
                            <line x1={rx} y1={ry} x2={rx} y2={ry + 16} stroke="#FFFFFF" strokeWidth={3} />
                            <line x1={rx + rw} y1={ry} x2={rx + rw - 16} y2={ry} stroke="#FFFFFF" strokeWidth={3} />
                            <line x1={rx + rw} y1={ry} x2={rx + rw} y2={ry + 16} stroke="#FFFFFF" strokeWidth={3} />
                            <line x1={rx} y1={ry + rh} x2={rx + 16} y2={ry + rh} stroke="#FFFFFF" strokeWidth={3} />
                            <line x1={rx} y1={ry + rh} x2={rx} y2={ry + rh - 16} stroke="#FFFFFF" strokeWidth={3} />
                            <line x1={rx + rw} y1={ry + rh} x2={rx + rw - 16} y2={ry + rh} stroke="#FFFFFF" strokeWidth={3} />
                            <line x1={rx + rw} y1={ry + rh} x2={rx + rw} y2={ry + rh - 16} stroke="#FFFFFF" strokeWidth={3} />
                            {/* Grounding Label Tag with dark backing */}
                            <rect
                              x={rx}
                              y={Math.max(4, ry - 30)}
                              width={Math.max(120, reg.label.length * 10 + 20)}
                              height={28}
                              fill="#0C1017"
                              stroke="#38BDF8"
                              strokeWidth={1.5}
                              rx={3}
                            />
                            <text
                              x={rx + 8}
                              y={Math.max(4, ry - 30) + 19}
                              fill="#38BDF8"
                              fontSize={14}
                              fontFamily="monospace"
                              fontWeight={700}
                              className="font-mono select-none"
                            >
                              {`[C${reg.patch_id}] ${reg.label}`}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  )}

                  <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5">
                    <span className="rounded-xs bg-panel/90 border border-border-subtle px-2 py-0.5 font-mono text-[11px] text-content-primary">
                      {row.resolution_px}
                    </span>
                    {row.sensor && (
                      <span className="rounded-xs bg-panel/90 border border-border-subtle px-2 py-0.5 font-mono text-[11px] text-content-secondary">
                        {row.sensor}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      openImageInWorkstation(row.image_src, row.filename, {
                        caption: activeCandidate.caption_text,
                        claims: row.candidates.map((c) => ({
                          claim_id: c.candidate_id,
                          statement: c.caption_text,
                          category: `Feature #${c.candidate_id}`,
                          confidence: c.confidence || 0.88,
                          evidence_type: "visual_grounding",
                          quality_status: c.status === "verified" ? "high" : "moderate",
                        })),
                        patch_evidence: (activeCandidate.evidence_regions || row.candidates[0].evidence_regions || []).map((r) => ({
                          patch_id: r.patch_id,
                          bbox: r.bbox,
                          scale: 1.0,
                          center_norm: [0.5, 0.5],
                          top_predictions: [{ label: r.label, confidence: 0.9 }],
                          primary_evidence: r.label,
                          evidence_confidence: 0.9,
                        })),
                      })
                    }
                    className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1.5 rounded-xs bg-panel/95 hover:bg-surface-raised border border-border-contrast px-2.5 py-1 text-[11px] text-accent font-medium transition-colors"
                    title="Open this image in the 3-region workstation"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Open in Workstation</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-content-muted flex justify-between px-1">
                  <span>Scene: {row.filename}</span>
                  <span>GSD: {row.gsd_m}</span>
                </div>
              </div>

              {/* Right Column: General Text Numbered Captions (Matching Screenshot) */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-border-subtle mb-3">
                    <span className="text-xs font-mono font-medium uppercase tracking-wider text-content-muted">
                      Numbered Scene Descriptions ({row.candidates.length})
                    </span>
                    <span className="text-[11px] text-content-muted font-mono">
                      Click any description to highlight its area
                    </span>
                  </div>

                  {/* Descriptions List */}
                  <div className="flex flex-col gap-2">
                    {row.candidates.map((candidate) => {
                      const isSelected =
                        isRowSelected &&
                        selectedCandidate.candidateId === candidate.candidate_id;

                      return (
                        <div
                          key={candidate.candidate_id}
                          onClick={() =>
                            setSelectedCandidate({
                              rowId: row.image_id,
                              candidateId: candidate.candidate_id,
                            })
                          }
                          className={cn(
                            "py-2 px-3 rounded-xs cursor-pointer transition-all border",
                            isSelected
                              ? "bg-surface-raised border-accent/70 shadow-sm"
                              : "bg-surface/40 hover:bg-surface-hover/80 border-transparent hover:border-border-subtle"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            {/* Numbered Prefix (e.g. 1., 2., 3.) */}
                            <span className={cn(
                              "font-sans font-semibold text-sm shrink-0",
                              isSelected ? "text-accent" : "text-content-secondary"
                            )}>
                              {candidate.candidate_id}.
                            </span>

                            {/* General Text Caption + Audio button */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <p className={cn(
                                  "text-sm leading-relaxed font-sans flex-1",
                                  isSelected ? "text-content-primary font-medium" : "text-content-primary"
                                )}>
                                  {candidate.caption_text}
                                </p>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSpeak(candidate.caption_text);
                                  }}
                                  className="shrink-0 p-1 rounded-xs text-content-muted hover:text-accent hover:bg-surface transition-colors"
                                  title="Listen to caption audio"
                                  aria-label="Play audio"
                                >
                                  {speakingText === candidate.caption_text ? (
                                    <VolumeX className="w-3.5 h-3.5 text-accent animate-pulse" />
                                  ) : (
                                    <Volume2 className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>

                              {/* Detailed mode metadata tags if enabled */}
                              {viewMode === "detailed" && (
                                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs font-mono">
                                  {getStatusBadge(candidate.status)}
                                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-surface border border-border-subtle">
                                    <span className="text-content-muted text-[10px]">CONF:</span>
                                    <span className="text-accent font-bold tabular-numbers">
                                      {(candidate.confidence! * 100).toFixed(0)}%
                                    </span>
                                    <div className="w-12 h-1.5 bg-surface-raised rounded-full overflow-hidden ml-1">
                                      <div
                                        className="bg-accent h-full"
                                        style={{ width: `${(candidate.confidence || 0.85) * 100}%` }}
                                      />
                                    </div>
                                  </div>
                                  {candidate.evidence_regions && (
                                    <div className="flex items-center gap-1">
                                      {candidate.evidence_regions.map((reg) => (
                                        <button
                                          key={reg.patch_id}
                                          onMouseEnter={() =>
                                            setHoveredRegion({
                                              rowId: row.image_id,
                                              patchId: reg.patch_id,
                                            })
                                          }
                                          onMouseLeave={() => setHoveredRegion(null)}
                                          className="px-1.5 py-0.5 rounded-xs bg-surface border border-accent/40 text-[10px] text-accent hover:bg-accent/20 font-mono"
                                        >
                                          {`[C${reg.patch_id}] ${reg.label}`}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Inspect Action Footer */}
                <div className="pt-3 mt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-content-secondary">
                  <span>
                    Selected: Description #{selectedCandidate.candidateId} in Scene {row.filename}
                  </span>
                  <button
                    onClick={() =>
                      openImageInWorkstation(row.image_src, row.filename, {
                        caption: activeCandidate.caption_text,
                        claims: row.candidates.map((c) => ({
                          claim_id: c.candidate_id,
                          statement: c.caption_text,
                          category: `Feature #${c.candidate_id}`,
                          confidence: c.confidence || 0.88,
                          evidence_type: "visual_grounding",
                          quality_status: c.status === "verified" ? "high" : "moderate",
                        })),
                        patch_evidence: (activeCandidate.evidence_regions || []).map((r) => ({
                          patch_id: r.patch_id,
                          bbox: r.bbox,
                          scale: 1.0,
                          center_norm: [0.5, 0.5],
                          top_predictions: [{ label: r.label, confidence: 0.9 }],
                          primary_evidence: r.label,
                          evidence_confidence: 0.9,
                        })),
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover font-medium underline-offset-4 hover:underline"
                  >
                    <span>Inspect this scene in Workstation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
