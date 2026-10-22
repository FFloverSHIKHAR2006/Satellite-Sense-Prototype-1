import React from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Layers,
  ChevronRight,
  Maximize2,
  RefreshCw,
} from "lucide-react";
import { useWorkstation } from "@/context/WorkstationContext";
import { ClaimItem } from "@/types/workstation";
import { cn } from "@/lib/utils";

export const AnalysisPanel: React.FC = () => {
  const {
    analysisResult,
    isAnalyzing,
    analysisError,
    selectedClaimId,
    setSelectedClaimId,
    setHoveredRegionId,
    zoomToBbox,
    setSelectedPatch,
    runAnalysisOnCurrentImage,
    modelMode,
  } = useWorkstation();

  const getStatusIcon = (status?: string, confidence?: number) => {
    if (status === "high" || (confidence && confidence > 0.65)) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Verified</span>
        </span>
      );
    }
    if (status === "moderate" || (confidence && confidence > 0.35)) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Partially Supported</span>
        </span>
      );
    }
    if (status === "low") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-rose-400">
          <XCircle className="w-3.5 h-3.5" />
          <span>Unsupported</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-content-muted">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>Not Evaluated</span>
      </span>
    );
  };

  const handleClaimSelect = (claim: ClaimItem) => {
    setSelectedClaimId(claim.claim_id);

    // If there is associated patch evidence, find and zoom to it
    if (analysisResult?.patch_evidence) {
      const match =
        analysisResult.patch_evidence.find((p) => p.patch_id === claim.claim_id) ||
        analysisResult.patch_evidence[0];
      if (match) {
        setSelectedPatch(match);
        zoomToBbox(match.bbox);
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-panel overflow-hidden border-b border-border-subtle select-none">
      {/* Header */}
      <div className="flex-none h-9 px-3 bg-surface border-b border-border-subtle flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-medium text-content-primary uppercase text-[11px] tracking-wider">
            Vision-Language Caption & Claims
          </span>
          <span className="rounded-xs bg-surface-raised px-1.5 py-0.2 font-mono text-[10px] text-accent border border-border-subtle">
            {modelMode === "domain_adapted" ? "Domain Adapter" : "Baseline"}
          </span>
        </div>

        <button
          onClick={() => runAnalysisOnCurrentImage()}
          disabled={isAnalyzing}
          className="flex items-center gap-1 px-2 py-0.5 rounded-xs text-[11px] font-mono text-content-secondary hover:text-content-primary hover:bg-surface-raised border border-border-subtle disabled:opacity-50 transition-colors"
          title="Rerun vision-language inference"
        >
          <RefreshCw className={cn("w-3 h-3", isAnalyzing && "animate-spin text-accent")} />
          <span>{isAnalyzing ? "Analyzing..." : "Re-run"}</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
        {analysisError && (
          <div className="p-2.5 rounded-xs bg-rose-950/30 border border-rose-800/60 text-xs text-rose-300">
            <strong>Inference Note:</strong> {analysisError}
          </div>
        )}

        {/* Synthesized Caption Block */}
        <div className="bg-surface rounded-xs p-3 border border-border-subtle">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-content-muted mb-1">
            Scene Description
          </span>
          <p className="text-sm font-sans text-content-primary leading-relaxed">
            {analysisResult?.caption ||
              "Load a satellite scene to view natural descriptions and grounded image features."}
          </p>
        </div>

        {/* Atomic Claims - Dense List Rows */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between pb-1.5 border-b border-border-subtle mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-content-muted">
              Identified Features & Evidence ({analysisResult?.claims?.length || 0})
            </span>
            <span className="text-[10px] font-mono text-content-muted">
              Hover row to view region on image
            </span>
          </div>

          <div className="flex flex-col divide-y divide-border-subtle/70">
            {analysisResult?.claims && analysisResult.claims.length > 0 ? (
              analysisResult.claims.map((claim) => {
                const isSelected = selectedClaimId === claim.claim_id;

                return (
                  <div
                    key={claim.claim_id}
                    onClick={() => handleClaimSelect(claim)}
                    onMouseEnter={() => setHoveredRegionId(String(claim.claim_id))}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    className={cn(
                      "py-2 px-2.5 rounded-xs cursor-pointer transition-colors flex flex-col gap-1",
                      isSelected
                        ? "bg-surface-raised border-l-2 border-accent"
                        : "hover:bg-surface-hover/70 border-l-2 border-transparent"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-accent">
                          #{claim.claim_id}
                        </span>
                        <span className="font-mono text-xs text-content-secondary truncate max-w-[140px]">
                          {claim.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusIcon(claim.quality_status, claim.confidence)}
                        <span className="font-mono text-xs tabular-nums text-content-primary bg-surface px-1 py-0.5 rounded-xs border border-border-subtle">
                          {(claim.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-content-primary leading-snug">
                      {claim.statement}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-content-muted pt-0.5">
                      <span>Type: {claim.evidence_type}</span>
                      <span className="inline-flex items-center gap-0.5 text-accent hover:underline">
                        <span>Inspect Region</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-4 text-center text-xs text-content-muted font-mono">
                No claims evaluated yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
