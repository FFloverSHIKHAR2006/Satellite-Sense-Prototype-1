import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ImageComparisonSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  sliderPos?: number;
  onSliderPosChange?: (pos: number) => void;
  scale?: number;
  pan?: { x: number; y: number };
  beforeOverlay?: React.ReactNode;
  afterOverlay?: React.ReactNode;
}

export const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({
  beforeSrc,
  afterSrc,
  beforeLabel = "Time T0 (Before)",
  afterLabel = "Time T1 (After)",
  className,
  sliderPos: controlledPos,
  onSliderPosChange,
  scale = 1,
  pan = { x: 0, y: 0 },
  beforeOverlay,
  afterOverlay,
}) => {
  const [internalPos, setInternalPos] = useState(50);
  const position = controlledPos !== undefined ? controlledPos : internalPos;

  const setPos = useCallback(
    (newPos: number) => {
      const clamped = Math.max(0, Math.min(100, newPos));
      if (controlledPos === undefined) {
        setInternalPos(clamped);
      }
      onSliderPosChange?.(clamped);
    },
    [controlledPos, onSliderPosChange]
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if capture already lost
    }
  };

  const updatePositionFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setPos(pct);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos(position - (e.shiftKey ? 10 : 2));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos(position + (e.shiftKey ? 10 : 2));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full select-none overflow-hidden bg-canvas border border-border-subtle",
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      tabIndex={0}
      role="slider"
      aria-label="Image comparison split slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onKeyDown={handleKeyDown}
    >
      {/* Before Image (Left side) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-75 relative"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          <div className="relative max-h-full max-w-full flex items-center justify-center">
            <img
              src={beforeSrc}
              alt="Temporal T0 Observation"
              className="max-h-full max-w-full object-contain pointer-events-none"
            />
            {beforeOverlay && (
              <div className="absolute inset-0 pointer-events-auto">
                {beforeOverlay}
              </div>
            )}
          </div>
        </div>
        {beforeLabel && (
          <span className="absolute top-2 left-2 z-10 rounded-xs bg-panel/90 border border-border-subtle px-2 py-0.5 text-[11px] font-mono text-content-secondary tracking-wide">
            {beforeLabel}
          </span>
        )}
      </div>

      {/* After Image (Right side) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-75 relative"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          <div className="relative max-h-full max-w-full flex items-center justify-center">
            <img
              src={afterSrc}
              alt="Temporal T1 Observation"
              className="max-h-full max-w-full object-contain pointer-events-none"
            />
            {afterOverlay && (
              <div className="absolute inset-0 pointer-events-auto">
                {afterOverlay}
              </div>
            )}
          </div>
        </div>
        {afterLabel && (
          <span className="absolute top-2 right-2 z-10 rounded-xs bg-panel/90 border border-border-subtle px-2 py-0.5 text-[11px] font-mono text-content-secondary tracking-wide">
            {afterLabel}
          </span>
        )}
      </div>

      {/* Split Divider Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-[2px] bg-accent -translate-x-1/2 cursor-ew-resize hover:bg-accent-hover focus:outline-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-4 items-center justify-center rounded-xs border border-border-contrast bg-surface-raised shadow-none">
          <div className="flex flex-col gap-0.5">
            <span className="h-2 w-0.5 bg-content-muted" />
            <span className="h-2 w-0.5 bg-content-muted" />
          </div>
        </div>
      </div>
    </div>
  );
};
