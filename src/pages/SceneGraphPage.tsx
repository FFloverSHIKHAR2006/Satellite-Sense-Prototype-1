import React, { useState } from "react";
import { SceneGraphInspector } from "@/components/scene-graph/SceneGraphInspector";
import {
  GitBranch,
  Layers,
  Table,
  Network,
  Columns,
  Eye,
  Crosshair,
  Sliders,
  Sparkles,
} from "lucide-react";
import { useWorkstation } from "@/context/WorkstationContext";
import { cn } from "@/lib/utils";

export const SceneGraphPage: React.FC = () => {
  const {
    imageSrc,
    imageFilename,
    analysisResult,
    selectedPatch,
    setSelectedPatch,
    zoomToBbox,
    sensorMetadata,
  } = useWorkstation();

  const [layoutMode, setLayoutMode] = useState<"split" | "graph-only">("split");
  const [activeHop, setActiveHop] = useState<"1-hop" | "2-hop" | "topological">("2-hop");
  const [selectedEntityFilter, setSelectedEntityFilter] = useState<string>("ALL");

  const patches = analysisResult?.patch_evidence || [];

  return (
    <div className="flex-1 flex flex-col h-full bg-workstation overflow-hidden select-none">
      {/* Top Utility Context Bar (Stitch Design Specification) */}
      <div className="w-full bg-panel border-b border-border-subtle px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs flex-none">
        <div className="flex items-center flex-wrap gap-3">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-surface border border-border-subtle rounded-xs p-0.5">
            <button
              onClick={() => setLayoutMode("split")}
              className={cn(
                "px-2.5 py-1 rounded-xs font-mono text-[11px] font-medium transition-colors flex items-center gap-1.5",
                layoutMode === "split"
                  ? "bg-accent/20 text-accent border border-accent/40"
                  : "text-content-secondary hover:text-content-primary"
              )}
            >
              <Columns className="w-3 h-3" />
              <span>Split Canvas + Graph</span>
            </button>
            <button
              onClick={() => setLayoutMode("graph-only")}
              className={cn(
                "px-2.5 py-1 rounded-xs font-mono text-[11px] font-medium transition-colors flex items-center gap-1.5",
                layoutMode === "graph-only"
                  ? "bg-accent/20 text-accent border border-accent/40"
                  : "text-content-secondary hover:text-content-primary"
              )}
            >
              <Network className="w-3 h-3" />
              <span>Graph Only</span>
            </button>
          </div>

          <div className="h-4 w-px bg-border-subtle hidden sm:block" />

          {/* Entity Filter Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[10px] uppercase text-content-muted">Entities:</span>
            {["ALL", "INFRASTRUCTURE", "VEGETATION", "RESIDENTIAL", "FACILITIES"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedEntityFilter(cat)}
                className={cn(
                  "px-2 py-0.5 rounded-xs font-mono text-[10px] transition-colors",
                  selectedEntityFilter === cat
                    ? "bg-accent/20 text-accent border border-accent/40 font-semibold"
                    : "bg-surface text-content-secondary hover:text-content-primary border border-border-subtle"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hop Depth & Density Telemetry */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-surface border border-border-subtle px-2 py-0.5 rounded-xs font-mono text-[11px]">
            <span className="text-content-muted">HOP:</span>
            {(["1-hop", "2-hop", "topological"] as const).map((hop) => (
              <button
                key={hop}
                onClick={() => setActiveHop(hop)}
                className={cn(
                  "px-1.5 py-0.2 rounded-xs uppercase text-[10px] transition-colors",
                  activeHop === hop
                    ? "bg-accent text-slate-950 font-bold"
                    : "text-content-secondary hover:text-content-primary"
                )}
              >
                {hop === "topological" ? "TOPO" : hop}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] bg-surface px-2.5 py-1 rounded-xs border border-border-subtle">
            <span className="text-content-muted">DENSITY:</span>
            <span className="text-accent font-bold tabular-numbers">0.428 (SPARSE)</span>
            <span className="text-border-contrast">|</span>
            <span className="text-content-muted">NODES:</span>
            <span className="text-content-primary tabular-numbers">{patches.length || 5}</span>
            <span className="text-content-muted">EDGES:</span>
            <span className="text-content-primary tabular-numbers">
              {Math.max(1, patches.length - 1)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Dual Area */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-0 overflow-hidden">
        {/* Left: High-Resolution Satellite Viewport with Directed Spatial Relation Vectors */}
        {layoutMode === "split" && (
          <div className="xl:col-span-6 bg-canvas border-r border-border-subtle flex flex-col relative overflow-hidden group">
            {/* Viewport Overlay Bar */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
              <div className="bg-panel/90 border border-border-contrast px-2.5 py-1 rounded-xs backdrop-blur-sm pointer-events-auto flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="font-mono text-xs text-content-primary font-medium">
                  {imageFilename}
                </span>
                <span className="font-mono text-[10px] text-accent bg-surface-raised px-1 py-0.2 rounded-xs border border-border-subtle">
                  {sensorMetadata?.sensor || "WV-3 0.31m"}
                </span>
              </div>

              <div className="bg-panel/90 border border-border-contrast px-2 py-1 rounded-xs backdrop-blur-sm font-mono text-[10px] text-content-secondary pointer-events-auto">
                RELATION VECTORS: ACTIVE
              </div>
            </div>

            {/* Satellite Image + Spatial Vector Overlay */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-canvas">
              {imageSrc ? (
                <div className="relative max-w-full max-h-full aspect-square">
                  <img
                    src={imageSrc}
                    alt="Scene Graph Satellite Raster"
                    className="w-full h-full object-contain filter brightness-95 contrast-105"
                  />

                  {/* Directed Spatial Relation Vectors SVG */}
                  <svg
                    viewBox="0 0 1024 1024"
                    className="absolute inset-0 w-full h-full pointer-events-auto"
                  >
                    <defs>
                      <marker
                        id="arrow-cyan"
                        markerWidth="8"
                        markerHeight="8"
                        refX="6"
                        refY="4"
                        orient="auto"
                      >
                        <path d="M 0 0 L 8 4 L 0 8 z" fill="#38BDF8" />
                      </marker>
                      <marker
                        id="arrow-purple"
                        markerWidth="8"
                        markerHeight="8"
                        refX="6"
                        refY="4"
                        orient="auto"
                      >
                        <path d="M 0 0 L 8 4 L 0 8 z" fill="#C084FC" />
                      </marker>
                    </defs>

                    {/* Render relation vectors between consecutive patches */}
                    {patches.length >= 2 &&
                      patches.slice(0, -1).map((patch, idx) => {
                        const nextPatch = patches[idx + 1];
                        const x1 = patch.bbox[0] + patch.bbox[2] / 2;
                        const y1 = patch.bbox[1] + patch.bbox[3] / 2;
                        const x2 = nextPatch.bbox[0] + nextPatch.bbox[2] / 2;
                        const y2 = nextPatch.bbox[1] + nextPatch.bbox[3] / 2;
                        const midX = (x1 + x2) / 2;
                        const midY = (y1 + y2) / 2;

                        return (
                          <g key={`edge-${patch.patch_id}-${nextPatch.patch_id}`}>
                            {/* Line */}
                            <line
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="#38BDF8"
                              strokeWidth={3}
                              strokeDasharray="6 4"
                              markerEnd="url(#arrow-cyan)"
                              className="opacity-80"
                            />
                            {/* Relation Tag */}
                            <rect
                              x={midX - 45}
                              y={midY - 12}
                              width={90}
                              height={24}
                              fill="#0C1017"
                              stroke="#38BDF8"
                              strokeWidth={1}
                              rx={2}
                              className="opacity-90"
                            />
                            <text
                              x={midX}
                              y={midY + 4}
                              fill="#38BDF8"
                              fontSize={11}
                              fontFamily="monospace"
                              textAnchor="middle"
                              className="font-mono font-bold select-none"
                            >
                              adjacent_to
                            </text>
                          </g>
                        );
                      })}

                    {/* Bounding boxes of detected entities */}
                    {patches.map((patch) => {
                      const [bx, by, bw, bh] = patch.bbox;
                      const isSelected = selectedPatch?.patch_id === patch.patch_id;

                      return (
                        <g
                          key={patch.patch_id}
                          onClick={() => {
                            setSelectedPatch(patch);
                            zoomToBbox(patch.bbox);
                          }}
                          className="cursor-pointer"
                        >
                          <rect
                            x={bx}
                            y={by}
                            width={bw}
                            height={bh}
                            fill={isSelected ? "rgba(56, 189, 248, 0.2)" : "rgba(56, 189, 248, 0.08)"}
                            stroke={isSelected ? "#38BDF8" : "#0284C7"}
                            strokeWidth={isSelected ? 3 : 2}
                          />
                          {/* Corner Reticles */}
                          <line x1={bx} y1={by} x2={bx + 12} y2={by} stroke="#FFFFFF" strokeWidth={2} />
                          <line x1={bx} y1={by} x2={bx} y2={by + 12} stroke="#FFFFFF" strokeWidth={2} />
                          <line x1={bx + bw} y1={by} x2={bx + bw - 12} y2={by} stroke="#FFFFFF" strokeWidth={2} />
                          <line x1={bx + bw} y1={by} x2={bx + bw} y2={by + 12} stroke="#FFFFFF" strokeWidth={2} />
                          {/* Label */}
                          <rect
                            x={bx}
                            y={by - 22}
                            width={Math.max(80, patch.primary_evidence.length * 8 + 16)}
                            height={22}
                            fill="#0C1017"
                            stroke="#38BDF8"
                            strokeWidth={1}
                            rx={2}
                          />
                          <text
                            x={bx + 6}
                            y={by - 7}
                            fill="#F1F5F9"
                            fontSize={12}
                            fontFamily="monospace"
                            fontWeight={600}
                            className="font-mono"
                          >
                            {patch.primary_evidence}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              ) : (
                <div className="text-content-muted font-mono text-xs">No raster loaded.</div>
              )}
            </div>
          </div>
        )}

        {/* Right (or Full): Scene Graph Inspector & Relational Tables */}
        <div
          className={cn(
            "h-full overflow-hidden bg-panel flex flex-col",
            layoutMode === "split" ? "xl:col-span-6" : "xl:col-span-12"
          )}
        >
          <SceneGraphInspector />
        </div>
      </div>
    </div>
  );
};
