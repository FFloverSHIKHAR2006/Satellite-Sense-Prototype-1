import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Hand,
  Maximize2,
  RotateCcw,
  Layers as LayersIcon,
  Crosshair,
  ZoomIn,
  ZoomOut,
  Upload,
} from "lucide-react";
import { useWorkstation } from "@/context/WorkstationContext";
import { LayersPanel } from "./LayersPanel";
import { cn } from "@/lib/utils";

type ActiveTool = "pan" | "inspect";

export const CanvasViewer: React.FC = () => {
  const {
    imageSrc,
    imageDimensions,
    zoom,
    setZoom,
    pan,
    setPan,
    cursorPos,
    setCursorPos,
    resetViewport,
    zoomToFit,
    layers,
    analysisResult,
    selectedClaimId,
    setSelectedClaimId,
    hoveredRegionId,
    setHoveredRegionId,
    selectedPatch,
    setSelectedPatch,
    loadUserImage,
    isAnalyzing,
  } = useWorkstation();

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTool, setActiveTool] = useState<ActiveTool>("pan");
  const [isLayersOpen, setIsLayersOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Native wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    setZoom((prev) => Math.min(10.0, Math.max(0.2, prev * zoomFactor)));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // Only primary button
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    }

    // Compute pixel coordinates relative to original 512x512 image
    if (containerRef.current && imageDimensions) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2 + pan.x;
      const centerY = rect.height / 2 + pan.y;

      const displayW = imageDimensions.width * zoom;
      const displayH = imageDimensions.height * zoom;

      const imgLeft = centerX - displayW / 2;
      const imgTop = centerY - displayH / 2;

      const rawX = (e.clientX - rect.left - imgLeft) / zoom;
      const rawY = (e.clientY - rect.top - imgTop) / zoom;

      if (rawX >= 0 && rawX <= imageDimensions.width && rawY >= 0 && rawY <= imageDimensions.height) {
        setCursorPos({ x: rawX, y: rawY });
      } else {
        setCursorPos(null);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  // Keyboard hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key.toLowerCase() === "h") {
        setActiveTool("pan");
      } else if (e.key.toLowerCase() === "b") {
        setActiveTool("inspect");
      } else if (e.key.toLowerCase() === "f") {
        zoomToFit();
      } else if (e.key.toLowerCase() === "r") {
        resetViewport();
      } else if (e.key.toLowerCase() === "l") {
        setIsLayersOpen((prev) => !prev);
      } else if (e.key === "+" || e.key === "=") {
        setZoom((prev) => Math.min(10.0, prev * 1.2));
      } else if (e.key === "-" || e.key === "_") {
        setZoom((prev) => Math.max(0.2, prev * 0.8));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resetViewport, zoomToFit, setZoom]);

  const patchList = analysisResult?.patch_evidence || [];

  return (
    <div className="relative flex-1 h-full flex flex-col bg-canvas overflow-hidden select-none">
      {/* Vertical Tool Strip (Left Edge) */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 bg-surface-raised/95 border border-border-contrast rounded-xs p-1 shadow-md">
        <button
          onClick={() => setActiveTool("pan")}
          className={cn(
            "p-1.5 rounded-xs transition-colors",
            activeTool === "pan"
              ? "bg-accent/20 text-accent border border-accent/40"
              : "text-content-secondary hover:text-content-primary hover:bg-surface-hover"
          )}
          title="Pan Viewport (H)"
          aria-label="Pan tool"
        >
          <Hand className="w-4 h-4" />
        </button>

        <button
          onClick={() => setActiveTool("inspect")}
          className={cn(
            "p-1.5 rounded-xs transition-colors",
            activeTool === "inspect"
              ? "bg-accent/20 text-accent border border-accent/40"
              : "text-content-secondary hover:text-content-primary hover:bg-surface-hover"
          )}
          title="Inspect Regions (B)"
          aria-label="Inspect regions"
        >
          <Crosshair className="w-4 h-4" />
        </button>

        <div className="h-[1px] bg-border-subtle my-0.5" />

        <button
          onClick={() => setIsLayersOpen((prev) => !prev)}
          className={cn(
            "p-1.5 rounded-xs transition-colors",
            isLayersOpen
              ? "bg-accent/20 text-accent border border-accent/40"
              : "text-content-secondary hover:text-content-primary hover:bg-surface-hover"
          )}
          title="Layers & Overlays (L)"
          aria-label="Layers panel"
        >
          <LayersIcon className="w-4 h-4" />
        </button>

        <button
          onClick={zoomToFit}
          className="p-1.5 rounded-xs text-content-secondary hover:text-content-primary hover:bg-surface-hover transition-colors"
          title="Fit to View (F)"
          aria-label="Fit to view"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <button
          onClick={resetViewport}
          className="p-1.5 rounded-xs text-content-secondary hover:text-content-primary hover:bg-surface-hover transition-colors"
          title="Reset Viewport (R)"
          aria-label="Reset viewport"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Layers Panel Drawer Popover */}
      <LayersPanel isOpen={isLayersOpen} onClose={() => setIsLayersOpen(false)} />

      {/* Main Viewport Container */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={cn(
          "flex-1 relative overflow-hidden flex items-center justify-center cursor-crosshair touch-none",
          isDragging ? "cursor-grabbing" : activeTool === "pan" ? "cursor-grab" : "cursor-crosshair"
        )}
      >
        {imageSrc ? (
          <div
            className="absolute transition-transform duration-75"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
              width: imageDimensions?.width || 512,
              height: imageDimensions?.height || 512,
            }}
          >
            {/* Satellite Raster Image Layer */}
            {layers.imageVisible && (
              <img
                src={imageSrc}
                alt="Satellite Analysis Scene"
                className="w-full h-full object-contain pointer-events-none select-none"
                style={{ opacity: layers.imageOpacity / 100 }}
              />
            )}

            {/* High-Contrast SVG Vector Overlays */}
            <svg
              viewBox={`0 0 ${imageDimensions?.width || 512} ${imageDimensions?.height || 512}`}
              className="absolute inset-0 w-full h-full overflow-visible pointer-events-auto"
            >
              <defs>
                <filter id="vector-halo-filter" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.95" />
                  <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.8" />
                </filter>
              </defs>

              {layers.boxesVisible &&
                patchList.map((patch) => {
                  const [px, py, pw, ph] = patch.bbox;
                  const isSelected = selectedPatch?.patch_id === patch.patch_id;
                  const isHovered = hoveredRegionId === String(patch.patch_id);

                  return (
                    <g
                      key={patch.patch_id}
                      className="cursor-pointer transition-opacity"
                      style={{ opacity: layers.boxesOpacity / 100 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPatch(patch);
                        setSelectedClaimId(patch.patch_id);
                      }}
                      onMouseEnter={() => setHoveredRegionId(String(patch.patch_id))}
                      onMouseLeave={() => setHoveredRegionId(null)}
                    >
                      {/* Dark Outer Halo Stroke */}
                      <rect
                        x={px}
                        y={py}
                        width={pw}
                        height={ph}
                        fill={
                          isSelected || isHovered
                            ? "rgba(56, 189, 248, 0.22)"
                            : "rgba(56, 189, 248, 0.05)"
                        }
                        stroke="#000000"
                        strokeWidth={layers.halosVisible ? 4 : 0}
                        filter={layers.halosVisible ? "url(#vector-halo-filter)" : undefined}
                      />

                      {/* Foreground Precision Stroke */}
                      <rect
                        x={px}
                        y={py}
                        width={pw}
                        height={ph}
                        fill="none"
                        stroke={isSelected ? "#38BDF8" : isHovered ? "#7DD3FC" : "#0284C7"}
                        strokeWidth={isSelected ? 2.5 : 1.75}
                        strokeDasharray={isSelected ? undefined : "4 2"}
                      />

                      {/* Corner Reticles */}
                      <line x1={px} y1={py} x2={px + 10} y2={py} stroke="#FFFFFF" strokeWidth={2} />
                      <line x1={px} y1={py} x2={px} y2={py + 10} stroke="#FFFFFF" strokeWidth={2} />
                      <line x1={px + pw} y1={py} x2={px + pw - 10} y2={py} stroke="#FFFFFF" strokeWidth={2} />
                      <line x1={px + pw} y1={py} x2={px + pw} y2={py + 10} stroke="#FFFFFF" strokeWidth={2} />
                      <line x1={px} y1={py + ph} x2={px + 10} y2={py + ph} stroke="#FFFFFF" strokeWidth={2} />
                      <line x1={px} y1={py + ph} x2={px} y2={py + ph - 10} stroke="#FFFFFF" strokeWidth={2} />
                      <line x1={px + pw} y1={py + ph} x2={px + pw - 10} y2={py + ph} stroke="#FFFFFF" strokeWidth={2} />
                      <line x1={px + pw} y1={py + ph} x2={px + pw} y2={py + ph - 10} stroke="#FFFFFF" strokeWidth={2} />

                      {/* Patch Label Badge */}
                      <g transform={`translate(${px + 2}, ${py + ((imageDimensions?.width || 512) >= 1000 ? 22 : 14)})`}>
                        <rect
                          x={-2}
                          y={(imageDimensions?.width || 512) >= 1000 ? -18 : -11}
                          width={(imageDimensions?.width || 512) >= 1000 ? 120 : 65}
                          height={(imageDimensions?.width || 512) >= 1000 ? 24 : 14}
                          fill="#0C1017"
                          fillOpacity={0.92}
                          stroke="#313F59"
                          strokeWidth={1.5}
                          rx={2}
                        />
                        <text
                          x={4}
                          y={0}
                          fill={isSelected ? "#38BDF8" : "#E2E8F0"}
                          fontSize={(imageDimensions?.width || 512) >= 1000 ? 13 : 9.5}
                          fontFamily="monospace"
                          fontWeight={600}
                          className="font-mono select-none"
                        >
                          Reg #{patch.patch_id} ({(patch.evidence_confidence * 100).toFixed(0)}%)
                        </text>
                      </g>
                    </g>
                  );
                })}
            </svg>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm">
            <div className="w-12 h-12 rounded-xs bg-surface-raised border border-border-subtle flex items-center justify-center mb-3 text-content-muted">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-medium text-content-primary mb-1">
              No satellite image loaded
            </h3>
            <p className="text-xs text-content-muted mb-4">
              Drop an image file or choose a verified scene from the catalog.
            </p>
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-xs bg-surface-raised hover:bg-surface-hover border border-border-contrast text-xs text-content-primary font-mono transition-colors">
              <span>Choose File</span>
              <input
                type="file"
                accept="image/*,.tif,.tiff"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) loadUserImage(file);
                }}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {/* Canvas Status Readout Bar (Bottom of Canvas) */}
      <footer className="h-7 flex-none bg-panel border-t border-border-subtle px-3 flex items-center justify-between text-[11px] font-mono select-none z-10">
        <div className="flex items-center gap-4 text-content-secondary">
          <div className="flex items-center gap-1.5">
            <span className="text-content-muted">PIX:</span>
            <span className="tabular-nums text-content-primary">
              {cursorPos ? `X: ${cursorPos.x.toFixed(1)} px  Y: ${cursorPos.y.toFixed(1)} px` : "Out of bounds"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 border-l border-border-subtle pl-4">
            <span className="text-content-muted">ZOOM:</span>
            <span className="tabular-nums text-accent font-medium">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {imageDimensions && (
            <div className="hidden sm:flex items-center gap-1.5 border-l border-border-subtle pl-4">
              <span className="text-content-muted">SOURCE:</span>
              <span className="tabular-nums text-content-primary">
                {imageDimensions.width}×{imageDimensions.height} px
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-content-muted">
          <span>Active: {activeTool === "pan" ? "Pan (H)" : "Inspect (B)"}</span>
          {selectedPatch && (
            <span className="text-accent border-l border-border-subtle pl-3">
              Patch #{selectedPatch.patch_id} selected
            </span>
          )}
        </div>
      </footer>
    </div>
  );
};
