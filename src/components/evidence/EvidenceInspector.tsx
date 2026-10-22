import React, { useRef, useEffect, useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Layers,
  Crop,
  ShieldCheck,
  AlertCircle,
  Maximize2,
} from "lucide-react";
import { useWorkstation } from "@/context/WorkstationContext";
import { cn } from "@/lib/utils";

export const EvidenceInspector: React.FC = () => {
  const {
    imageSrc,
    selectedPatch,
    selectedClaimId,
    analysisResult,
    zoomToBbox,
  } = useWorkstation();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [cropFailed, setCropFailed] = useState(false);

  const activeClaim = analysisResult?.claims?.find(
    (c) => c.claim_id === selectedClaimId
  );

  // Render high-precision sub-image cropped preview onto canvas
  useEffect(() => {
    if (!selectedPatch || !imageSrc) return;

    setCropFailed(false);
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const [bx, by, bw, bh] = selectedPatch.bbox;
      canvas.width = 160;
      canvas.height = 160;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, bx, by, bw, bh, 0, 0, canvas.width, canvas.height);

      // Draw subtle cyan crop border inside preview
      ctx.strokeStyle = "#38BDF8";
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    };

    img.onerror = () => {
      setCropFailed(true);
    };
  }, [selectedPatch, imageSrc]);

  return (
    <div className="h-full flex flex-col bg-panel p-3 overflow-y-auto select-none text-xs font-sans gap-3">
      {/* Evidence Banner */}
      <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-content-primary uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-accent" />
          <span>Feature Evidence Verification</span>
        </div>
        {selectedPatch && (
          <span className="font-mono text-[11px] text-accent">
            Region #{selectedPatch.patch_id}
          </span>
        )}
      </div>

      {selectedPatch ? (
        <div className="flex flex-col gap-3">
          {/* Cropped Region Preview + Coordinates */}
          <div className="flex gap-3 items-start bg-surface rounded-xs p-2.5 border border-border-subtle">
            <div className="relative w-28 h-28 bg-canvas border border-border-subtle shrink-0 rounded-xs overflow-hidden flex items-center justify-center">
              {!cropFailed ? (
                <canvas
                  ref={previewCanvasRef}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[10px] text-content-muted font-mono text-center px-1">
                  Crop unavailable
                </span>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-between h-28 py-0.5">
              <div>
                <span className="block font-mono text-[11px] text-content-muted uppercase">
                  Identified Feature
                </span>
                <span className="font-mono text-xs font-bold text-accent">
                  {selectedPatch.primary_evidence}
                </span>
              </div>

              <div className="font-mono text-[11px] text-content-secondary flex flex-col gap-0.5">
                <div className="flex justify-between">
                  <span className="text-content-muted">Confidence:</span>
                  <span className="text-content-primary tabular-nums">
                    {(selectedPatch.evidence_confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-muted">Scale:</span>
                  <span className="text-content-primary tabular-nums">
                    {selectedPatch.scale}x
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-muted">BBox:</span>
                  <span className="text-content-primary tabular-nums">
                    [{selectedPatch.bbox.join(", ")}]
                  </span>
                </div>
              </div>

              <button
                onClick={() => zoomToBbox(selectedPatch.bbox)}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-accent hover:text-accent-hover"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Zoom to Region</span>
              </button>
            </div>
          </div>

          {/* Associated Claim Statement */}
          {activeClaim && (
            <div className="bg-surface rounded-xs p-2.5 border border-border-subtle flex flex-col gap-1">
              <span className="font-mono text-[11px] text-content-muted uppercase tracking-wider">
                Correlated Claim Statement
              </span>
              <p className="text-xs text-content-primary font-medium leading-relaxed">
                "{activeClaim.statement}"
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] font-mono">
                <span className="text-content-muted">Status:</span>
                <span className="text-emerald-400 font-semibold">
                  Verified with Spatial Grounding
                </span>
              </div>
            </div>
          )}

          {/* Predictions Distribution for this Patch */}
          <div className="flex flex-col">
            <span className="font-mono text-[11px] text-content-muted uppercase tracking-wider mb-1.5">
              Candidate Hypotheses for Region
            </span>
            <div className="flex flex-col divide-y divide-border-subtle border border-border-subtle rounded-xs overflow-hidden">
              {selectedPatch.top_predictions.map((pred, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1.5 bg-surface flex items-center justify-between text-xs font-mono"
                >
                  <span className="text-content-secondary">{pred.label}</span>
                  <span className="text-content-primary tabular-nums font-medium">
                    {(pred.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 flex flex-col items-center justify-center text-center text-content-muted gap-2">
          <AlertCircle className="w-6 h-6 text-content-muted" />
          <p className="font-mono text-xs">No region currently selected.</p>
          <span className="text-[11px] text-content-muted max-w-xs">
            Click any bounding box on the canvas or a claim row above to inspect its spatial grounding and cropped sub-region.
          </span>
        </div>
      )}
    </div>
  );
};
