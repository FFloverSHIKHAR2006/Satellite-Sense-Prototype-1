import React from "react";
import { Eye, EyeOff, Layers, Sliders, X } from "lucide-react";
import { useWorkstation } from "@/context/WorkstationContext";
import { cn } from "@/lib/utils";

interface LayersPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({ isOpen, onClose }) => {
  const { layers, setLayers, analysisResult } = useWorkstation();

  if (!isOpen) return null;

  const hasPatches =
    analysisResult?.patch_evidence && analysisResult.patch_evidence.length > 0;

  return (
    <div className="absolute top-12 left-12 z-20 w-64 bg-surface-raised border border-border-contrast rounded-xs shadow-xl p-3 flex flex-col gap-3 font-sans select-none">
      <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-content-primary">
          <Layers className="w-3.5 h-3.5 text-accent" />
          <span>Raster & Vector Overlays</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-xs hover:bg-surface-hover text-content-muted hover:text-content-primary"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Layer 1: Base Satellite Image */}
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setLayers((prev) => ({
                  ...prev,
                  imageVisible: !prev.imageVisible,
                }))
              }
              className="text-content-secondary hover:text-accent"
              title="Toggle visibility"
            >
              {layers.imageVisible ? (
                <Eye className="w-3.5 h-3.5 text-accent" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-content-muted" />
              )}
            </button>
            <span className="font-mono text-content-primary font-medium">
              Base Satellite Raster
            </span>
          </div>
          <span className="font-mono text-[11px] tabular-nums text-content-muted">
            {layers.imageOpacity}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={layers.imageOpacity}
          onChange={(e) =>
            setLayers((prev) => ({
              ...prev,
              imageOpacity: Number(e.target.value),
            }))
          }
          className="h-1 bg-surface rounded-xs accent-accent cursor-pointer"
        />
      </div>

      {/* Layer 2: Evidence Bounding Boxes */}
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setLayers((prev) => ({
                  ...prev,
                  boxesVisible: !prev.boxesVisible,
                }))
              }
              className="text-content-secondary hover:text-accent"
              title="Toggle visibility"
            >
              {layers.boxesVisible ? (
                <Eye className="w-3.5 h-3.5 text-accent" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-content-muted" />
              )}
            </button>
            <span className="font-mono text-content-primary font-medium">
              Grounded Bounding Boxes
            </span>
          </div>
          <span className="font-mono text-[11px] tabular-nums text-content-muted">
            {layers.boxesOpacity}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={layers.boxesOpacity}
          onChange={(e) =>
            setLayers((prev) => ({
              ...prev,
              boxesOpacity: Number(e.target.value),
            }))
          }
          className="h-1 bg-surface rounded-xs accent-accent cursor-pointer"
        />
      </div>

      {/* Layer 3: Multi-Scale Patch Grid */}
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              disabled={!hasPatches}
              onClick={() =>
                setLayers((prev) => ({
                  ...prev,
                  patchesVisible: !prev.patchesVisible,
                }))
              }
              className="text-content-secondary hover:text-accent disabled:opacity-40"
              title="Toggle patch grid"
            >
              {layers.patchesVisible ? (
                <Eye className="w-3.5 h-3.5 text-accent" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-content-muted" />
              )}
            </button>
            <span
              className={cn(
                "font-mono font-medium",
                hasPatches ? "text-content-primary" : "text-content-muted"
              )}
            >
              Multi-Scale Patch Grid
            </span>
          </div>
          <span className="font-mono text-[11px] tabular-nums text-content-muted">
            {hasPatches ? `${layers.patchesOpacity}%` : "No Patches"}
          </span>
        </div>
        {hasPatches && (
          <input
            type="range"
            min={0}
            max={100}
            value={layers.patchesOpacity}
            onChange={(e) =>
              setLayers((prev) => ({
                ...prev,
                patchesOpacity: Number(e.target.value),
              }))
            }
            className="h-1 bg-surface rounded-xs accent-accent cursor-pointer"
          />
        )}
      </div>

      {/* High-Contrast Halo Toggle */}
      <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs">
        <span className="text-content-secondary font-mono text-[11px]">
          Vector High-Contrast Halo
        </span>
        <button
          onClick={() =>
            setLayers((prev) => ({
              ...prev,
              halosVisible: !prev.halosVisible,
            }))
          }
          className={cn(
            "px-2 py-0.5 rounded-xs text-[11px] font-mono border transition-colors",
            layers.halosVisible
              ? "bg-accent/20 border-accent/60 text-accent font-medium"
              : "bg-surface border-border-subtle text-content-muted"
          )}
        >
          {layers.halosVisible ? "Enabled" : "Disabled"}
        </button>
      </div>
    </div>
  );
};
