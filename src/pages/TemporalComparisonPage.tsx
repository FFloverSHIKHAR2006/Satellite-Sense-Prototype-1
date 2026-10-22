import React, { useState } from "react";
import { ImageComparisonSlider } from "@/components/temporal/ImageComparisonSlider";
import {
  ShieldAlert,
  RotateCcw,
  Sliders,
  Columns,
  Rows,
  Copy,
  Check,
  Sparkles,
  Layers,
  Crosshair,
  CheckCircle2,
  Info,
  Building2,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChangeRegion {
  id: string;
  name: string;
  tag: string;
  category: "new_construction" | "canopy_loss" | "pre_existing";
  bbox: { x: number; y: number; w: number; h: number }; // percentage 0-100
  details: string;
}

export interface TemporalScene {
  id: string;
  title: string;
  caption: string;
  t1Src: string;
  t2Src: string;
  t1Date: string;
  t2Date: string;
  t1Label: string;
  t2Label: string;
  location: string;
  resolution: string;
  sensor: string;
  observedChange: string;
  possibleInterpretation: string;
  inferredCause: string;
  confidence: number;
  changedAreaEstimate: string;
  landcoverTransition: string;
  verificationSource: string;
  auditSummary: {
    question: string;
    baselineCount: string;
    newChangesCount: string;
    totalInFrame: string;
    explanation: string;
  };
  changes: ChangeRegion[];
}

export const TEMPORAL_SCENES: TemporalScene[] = [
  {
    id: "suburban_houses",
    title: "1. Bareland 4 Houses",
    caption: "four houses are built on both sides of the road on the bareland",
    t1Src: "/images/bareland_houses_benchmark_t1.png",
    t2Src: "/images/bareland_houses_benchmark_t2.png",
    t1Date: "2020-04-10",
    t2Date: "2022-11-18",
    t1Label: "T1: 2020-04-10 (Bareland & 5 Existing Homes)",
    t2Label: "T2: 2022-11-18 (4 Houses Built on Bareland)",
    location: "LEVIR-CC Benchmark Pair #02 (Suburban Parcel)",
    resolution: "0.5 m / pixel GSD",
    sensor: "High-Resolution Aerial Orthophoto (RGB)",
    observedChange: "four houses are built on both sides of the road on the bareland",
    possibleInterpretation:
      "Four new residential single-family homes constructed on previously empty subdivided bareland parcels across both sides of the curving access road.",
    inferredCause:
      "Suburban residential infill completing planned parcel subdivision along the roadway corridor.",
    confidence: 0.94,
    changedAreaEstimate: "4 new residential structures (~1,850 m² total footprint with driveways)",
    landcoverTransition: "Bare Land → 4 Residential Houses",
    verificationSource: "LEVIR-CC Benchmark Reference Ground Truth",
    auditSummary: {
      question: 'Why multiple houses appear in T2 vs "four houses built":',
      baselineCount: "5 pre-existing homes (East side of road)",
      newChangesCount: "4 newly built houses on bareland (2 South + 2 North)",
      totalInFrame: "9 total residential structures in T2 frame",
      explanation:
        "T2 shows multiple houses (9 in total across the neighborhood), but 5 were already present in T1. The temporal difference consists of exactly 4 new houses constructed on vacant bareland: 2 on the South side and 2 on the North side across the road.",
    },
    changes: [
      {
        id: "house-1",
        name: "New House 1 (South Lot A)",
        tag: "+ New Build",
        category: "new_construction",
        bbox: { x: 15, y: 44, w: 17, h: 25 },
        details: "Asphalt shingle roof + driveway paved on vacant south bareland parcel",
      },
      {
        id: "house-2",
        name: "New House 2 (South Lot B)",
        tag: "+ New Build",
        category: "new_construction",
        bbox: { x: 31, y: 45, w: 17, h: 26 },
        details: "Adjacent new residential construction on vacant south bareland parcel",
      },
      {
        id: "house-3",
        name: "New House 3 (North Lot C)",
        tag: "+ New Build",
        category: "new_construction",
        bbox: { x: 7, y: 11, w: 17, h: 23 },
        details: "North side new construction across the road on bareland parcel",
      },
      {
        id: "house-4",
        name: "New House 4 (North Lot D)",
        tag: "+ New Build",
        category: "new_construction",
        bbox: { x: 24, y: 12, w: 17, h: 22 },
        details: "North side new construction across the road on bareland parcel",
      },
      {
        id: "existing-houses",
        name: "Pre-existing Baseline (5 homes)",
        tag: "Unchanged Baseline",
        category: "pre_existing",
        bbox: { x: 52, y: 35, w: 44, h: 58 },
        details: "5 residential homes already established in T1 along east road corridor",
      },
    ],
  },
  {
    id: "forest_clearing",
    title: "2. Forest Path Clearing",
    caption: "a path appears in the forest and some trees are removed",
    t1Src: "/images/forest_benchmark_t1.png",
    t2Src: "/images/forest_benchmark_t2.png",
    t1Date: "2021-08-14",
    t2Date: "2023-09-22",
    t1Label: "T1: 2021-08-14 (Dense Canopy)",
    t2Label: "T2: 2023-09-22 (Cleared Path Corridor)",
    location: "LEVIR-CC Benchmark Pair #01 (Temperate Woodland)",
    resolution: "0.5 m / pixel GSD",
    sensor: "High-Resolution Aerial Orthophoto (RGB)",
    observedChange: "a path appears in the forest and some trees are removed",
    possibleInterpretation:
      "A new unpaved track or service road has been cleared through continuous tree canopy, removing mature trees along the corridor.",
    inferredCause:
      "Access route cleared for forestry management, trail access, or firebreak transit.",
    confidence: 0.94,
    changedAreaEstimate: "~3,400 m² tree canopy removed along corridor",
    landcoverTransition: "Dense Forest → Cleared Path / Dirt Road",
    verificationSource: "LEVIR-CC Benchmark Reference Ground Truth",
    auditSummary: {
      question: "Corridor Analysis: Continuous Forest vs Cleared Roadway:",
      baselineCount: "0 through roads / continuous woodland canopy",
      newChangesCount: "1 unpaved road corridor + tree canopy clearing",
      totalInFrame: "Woodland canopy bisected by new dirt road",
      explanation:
        "T1 shows dense continuous tree cover. T2 shows a wide unpaved access corridor traversing through the woodland with canopy removed.",
    },
    changes: [
      {
        id: "path-1",
        name: "Cleared Access Road",
        tag: "+ New Road",
        category: "new_construction",
        bbox: { x: 28, y: 16, w: 58, h: 64 },
        details: "Unpaved dirt roadway cleared through the woodland corridor",
      },
      {
        id: "trees-1",
        name: "Removed Tree Canopy",
        tag: "- Canopy Loss",
        category: "canopy_loss",
        bbox: { x: 36, y: 22, w: 46, h: 48 },
        details: "Mature tree cover removed to establish corridor clearance",
      },
    ],
  },
  {
    id: "bareland_culdesac",
    title: "3. Cul-de-Sac Subdivision",
    caption: "houses are built along the cul-de-sac on the bareland",
    t1Src: "/images/bareland_culdesac_t1.png",
    t2Src: "/images/bareland_culdesac_t2.png",
    t1Date: "2019-06-15",
    t2Date: "2021-10-30",
    t1Label: "T1: 2019-06-15 (Raw Graded Soil)",
    t2Label: "T2: 2021-10-30 (Paved Cul-de-Sac & Houses)",
    location: "LEVIR-CC Benchmark Pair #03 (Cul-de-Sac Parcel)",
    resolution: "0.5 m / pixel GSD",
    sensor: "High-Resolution Aerial Orthophoto (RGB)",
    observedChange: "houses are built along the cul-de-sac on the bareland",
    possibleInterpretation:
      "Paved turnaround and residential structures constructed on previously vacant land.",
    inferredCause: "Suburban residential street extension.",
    confidence: 0.91,
    changedAreaEstimate: "Cul-de-sac turnaround + adjacent structures",
    landcoverTransition: "Bare Land → Paved Road & Housing",
    verificationSource: "LEVIR-CC Benchmark Reference Ground Truth",
    auditSummary: {
      question: "Subdivision Infill: Raw Ground vs Paved Turnaround:",
      baselineCount: "0 paved surfaces / raw dirt turnaround in T1",
      newChangesCount: "Paved cul-de-sac and houses built",
      totalInFrame: "Subdivided residential cul-de-sac",
      explanation:
        "T1 shows raw graded subsoil with an unpaved turnaround. T2 shows paved asphalt road and residential building construction.",
    },
    changes: [
      {
        id: "culdesac-road",
        name: "Paved Cul-de-Sac",
        tag: "+ Paved Road",
        category: "new_construction",
        bbox: { x: 20, y: 40, w: 60, h: 45 },
        details: "Paved asphalt roadway and turnaround loop",
      },
      {
        id: "culdesac-homes",
        name: "Residential Structures",
        tag: "+ New Build",
        category: "new_construction",
        bbox: { x: 10, y: 10, w: 75, h: 35 },
        details: "New housing units built along the street",
      },
    ],
  },
];

type ViewMode = "split-slider" | "dual-stack" | "side-by-side";

export const TemporalComparisonPage: React.FC = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("split-slider");
  const [sliderPos, setSliderPos] = useState(50);
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [showDifferences, setShowDifferences] = useState(true);
  const [hoveredChangeId, setHoveredChangeId] = useState<string | null>(null);
  const [selectedChangeId, setSelectedChangeId] = useState<string | null>(null);

  const scene = TEMPORAL_SCENES[activeSceneIndex];

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(`"${scene.caption}"`);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  // Render change overlay boxes
  const renderChangeOverlay = () => {
    if (!showDifferences) return null;
    return (
      <svg className="w-full h-full absolute inset-0 pointer-events-none select-none">
        {scene.changes.map((change) => {
          const isHovered = hoveredChangeId === change.id;
          const isSelected = selectedChangeId === change.id;
          const isPreExisting = change.category === "pre_existing";

          const strokeColor = isPreExisting
            ? isHovered || isSelected
              ? "rgba(209, 213, 219, 0.95)"
              : "rgba(156, 163, 175, 0.65)"
            : change.category === "canopy_loss"
            ? "rgba(244, 63, 94, 0.95)"
            : "rgba(16, 185, 129, 0.95)";

          const fillColor = isPreExisting
            ? isHovered || isSelected
              ? "rgba(156, 163, 175, 0.18)"
              : "transparent"
            : isHovered || isSelected
            ? "rgba(16, 185, 129, 0.28)"
            : "rgba(16, 185, 129, 0.1)";

          return (
            <g
              key={change.id}
              className="pointer-events-auto cursor-pointer transition-opacity"
              onMouseEnter={() => setHoveredChangeId(change.id)}
              onMouseLeave={() => setHoveredChangeId(null)}
              onClick={() =>
                setSelectedChangeId(
                  selectedChangeId === change.id ? null : change.id
                )
              }
            >
              <rect
                x={`${change.bbox.x}%`}
                y={`${change.bbox.y}%`}
                width={`${change.bbox.w}%`}
                height={`${change.bbox.h}%`}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={isHovered || isSelected ? 2.5 : 1.5}
                strokeDasharray={isPreExisting ? "4 3" : undefined}
                rx="4"
                className="transition-all duration-150"
              />
              <foreignObject
                x={`${change.bbox.x}%`}
                y={`${Math.max(0, change.bbox.y - 6)}%`}
                width="220"
                height="28"
                className="overflow-visible pointer-events-none"
              >
                <div
                  className={cn(
                    "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs text-[9px] font-mono font-semibold tracking-wide whitespace-nowrap shadow-sm border",
                    isPreExisting
                      ? "bg-black/85 text-zinc-300 border-zinc-600"
                      : change.category === "canopy_loss"
                      ? "bg-rose-950/90 text-rose-300 border-rose-500"
                      : "bg-emerald-950/90 text-emerald-300 border-emerald-500"
                  )}
                >
                  <span>{change.name}</span>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-canvas">
      {/* Left: Dominant Compare Viewer (65% width) */}
      <div className="flex-1 h-1/2 lg:h-full flex flex-col border-b lg:border-b-0 lg:border-r border-border-subtle relative">
        {/* Top Control Bar: Scene Selector & View Mode */}
        <div className="h-10 flex-none bg-panel border-b border-border-subtle px-3 flex items-center justify-between text-xs select-none gap-2">
          {/* Scene Switcher Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-content-muted font-mono text-[11px] uppercase tracking-wider mr-1 hidden sm:inline">
              Pair:
            </span>
            {TEMPORAL_SCENES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setSliderPos(50);
                  setSelectedChangeId(null);
                }}
                className={cn(
                  "px-2.5 py-1 rounded-xs text-[11px] font-mono transition-colors border whitespace-nowrap",
                  idx === activeSceneIndex
                    ? "bg-accent/15 text-accent border-accent/40 font-medium"
                    : "bg-surface text-content-secondary border-border-subtle hover:bg-surface-hover hover:text-content-primary"
                )}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* View Mode Controls, Show Differences & Reset */}
          <div className="flex items-center gap-1.5">
            {/* Show Differences Toggle */}
            <button
              onClick={() => setShowDifferences(!showDifferences)}
              className={cn(
                "px-2 py-0.5 text-[11px] font-mono rounded-xs flex items-center gap-1.5 border transition-colors",
                showDifferences
                  ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/50 font-medium"
                  : "bg-surface text-content-muted border-border-subtle hover:text-content-secondary"
              )}
              title="Toggle bounding boxes and differences overlay"
            >
              <Layers className="w-3 h-3 text-emerald-400" />
              <span>Differences: {showDifferences ? "ON" : "OFF"}</span>
            </button>

            <div className="bg-surface rounded-xs p-0.5 border border-border-subtle flex items-center">
              <button
                onClick={() => setViewMode("split-slider")}
                className={cn(
                  "px-2 py-0.5 text-[11px] font-mono rounded-xs flex items-center gap-1 transition-colors",
                  viewMode === "split-slider"
                    ? "bg-panel text-content-primary shadow-xs"
                    : "text-content-muted hover:text-content-secondary"
                )}
                title="Split slider view"
              >
                <Sliders className="w-3 h-3" />
                <span className="hidden md:inline">Slider</span>
              </button>
              <button
                onClick={() => setViewMode("dual-stack")}
                className={cn(
                  "px-2 py-0.5 text-[11px] font-mono rounded-xs flex items-center gap-1 transition-colors",
                  viewMode === "dual-stack"
                    ? "bg-panel text-content-primary shadow-xs"
                    : "text-content-muted hover:text-content-secondary"
                )}
                title="T1 / T2 Stacked (Benchmark style)"
              >
                <Rows className="w-3 h-3" />
                <span className="hidden md:inline">T1/T2 Stack</span>
              </button>
              <button
                onClick={() => setViewMode("side-by-side")}
                className={cn(
                  "px-2 py-0.5 text-[11px] font-mono rounded-xs flex items-center gap-1 transition-colors",
                  viewMode === "side-by-side"
                    ? "bg-panel text-content-primary shadow-xs"
                    : "text-content-muted hover:text-content-secondary"
                )}
                title="Side by side view"
              >
                <Columns className="w-3 h-3" />
                <span className="hidden md:inline">Side-by-Side</span>
              </button>
            </div>

            {viewMode === "split-slider" && (
              <div className="flex items-center gap-1 px-1.5 text-[11px] font-mono text-content-muted">
                <span>Split:</span>
                <span className="text-accent tabular-nums font-semibold">
                  {Math.round(sliderPos)}%
                </span>
              </div>
            )}

            <button
              onClick={() => {
                setZoom(1.0);
                setPan({ x: 0, y: 0 });
                setSliderPos(50);
                setSelectedChangeId(null);
              }}
              className="p-1 rounded-xs hover:bg-surface-hover text-content-secondary hover:text-content-primary border border-border-subtle"
              title="Reset Viewport & Slider"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Prominent Reference-Styled Natural Caption Card */}
        <div className="px-4 py-3 bg-[#13100e] border-b border-[#3d3226] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="shrink-0 px-2 py-0.5 rounded-xs bg-[#8a7255]/20 text-[#e0cfbe] border border-[#8a7255]/40 text-[10px] font-mono uppercase tracking-wider font-semibold">
              Natural Style Caption
            </span>
            <span className="text-[#f5ede0] text-base md:text-lg font-serif italic tracking-wide truncate">
              "{scene.caption}"
            </span>
          </div>

          <button
            onClick={handleCopyCaption}
            className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-xs border border-[#8a7255]/50 bg-[#211a14] hover:bg-[#2e241c] text-[#d8c5b0] text-xs font-mono transition-colors"
            title="Copy caption"
          >
            {copiedCaption ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Imagery Display Area */}
        <div className="flex-1 relative overflow-hidden bg-canvas flex items-center justify-center p-3">
          {viewMode === "split-slider" && (
            <div className="w-full h-full relative rounded-xs overflow-hidden border border-border-subtle">
              <ImageComparisonSlider
                beforeSrc={scene.t1Src}
                afterSrc={scene.t2Src}
                beforeLabel={scene.t1Label}
                afterLabel={scene.t2Label}
                sliderPos={sliderPos}
                onSliderPosChange={setSliderPos}
                scale={zoom}
                pan={pan}
                afterOverlay={renderChangeOverlay()}
              />
            </div>
          )}

          {viewMode === "dual-stack" && (
            /* Benchmark Layout (Matching the user's reference image with green frame & T1/T2 badges) */
            <div className="h-full w-full max-w-[560px] flex flex-col gap-1.5 p-1.5 rounded-sm border-2 border-emerald-600/80 bg-emerald-950/20 shadow-md">
              {/* T1 Box */}
              <div className="relative flex-1 rounded-xs overflow-hidden border border-border-subtle bg-black flex items-center justify-center">
                <img
                  src={scene.t1Src}
                  alt="Time 1 observation"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-xs bg-black/85 text-white font-mono font-bold text-xs border border-white/20 shadow-sm">
                  T1
                </span>
                <span className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded-xs bg-black/75 text-content-secondary font-mono text-[10px]">
                  {scene.t1Date}
                </span>
              </div>

              {/* T2 Box */}
              <div className="relative flex-1 rounded-xs overflow-hidden border border-border-subtle bg-black flex items-center justify-center">
                <img
                  src={scene.t2Src}
                  alt="Time 2 observation"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-xs bg-black/85 text-white font-mono font-bold text-xs border border-white/20 shadow-sm">
                  T2
                </span>
                <span className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded-xs bg-black/75 text-content-secondary font-mono text-[10px]">
                  {scene.t2Date}
                </span>
                {/* Difference Bounding Boxes Overlay */}
                {renderChangeOverlay()}
              </div>
            </div>
          )}

          {viewMode === "side-by-side" && (
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-3 p-1">
              {/* T1 Panel */}
              <div className="relative rounded-xs overflow-hidden border border-border-subtle bg-black flex items-center justify-center">
                <img
                  src={scene.t1Src}
                  alt="Time 1 observation"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-panel/90 border border-border-subtle text-xs font-mono">
                  <span className="font-bold text-accent">T1</span>
                  <span className="text-content-secondary">{scene.t1Date}</span>
                </div>
              </div>

              {/* T2 Panel */}
              <div className="relative rounded-xs overflow-hidden border border-border-subtle bg-black flex items-center justify-center">
                <img
                  src={scene.t2Src}
                  alt="Time 2 observation"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-panel/90 border border-border-subtle text-xs font-mono z-10">
                  <span className="font-bold text-emerald-400">T2</span>
                  <span className="text-content-secondary">{scene.t2Date}</span>
                </div>
                {/* Difference Bounding Boxes Overlay */}
                {renderChangeOverlay()}
              </div>
            </div>
          )}
        </div>

        {/* Viewport Status Footer */}
        <div className="h-7 flex-none bg-panel border-t border-border-subtle px-3 flex items-center justify-between text-[11px] font-mono text-content-secondary select-none">
          <span>
            {viewMode === "split-slider"
              ? "Use [ArrowLeft] / [ArrowRight] to scrub divider"
              : "Synchronized dual-epoch aerial perspective"}
          </span>
          <span className="text-content-muted">{scene.location}</span>
        </div>
      </div>

      {/* Right: Difference Cross-Check Audit & Semantic Evidence Taxonomy (35% width) */}
      <div className="w-full lg:w-[440px] h-1/2 lg:h-full bg-panel flex flex-col overflow-hidden select-none border-t lg:border-t-0 border-border-subtle">
        <div className="h-10 flex-none bg-surface border-b border-border-subtle px-3 flex items-center justify-between text-xs font-mono">
          <span className="font-medium text-content-primary uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5 text-accent" />
            Differences & Change Audit
          </span>
          <span className="text-[10px] text-emerald-400 border border-emerald-500/40 bg-emerald-950/40 px-1.5 py-0.5 rounded-xs">
            Verified Count: {scene.changes.filter((c) => c.category !== "pre_existing").length}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-xs font-sans">
          {/* Main Benchmark Reference Caption Card */}
          <div className="bg-[#171410] border-2 border-[#8a7255] rounded-xs p-3.5 flex flex-col gap-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#d0beaa] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#d0beaa]" />
                Observed Caption
              </span>
              <span className="font-mono text-[10px] text-[#a08e7a]">
                Exact Reference Style
              </span>
            </div>
            <p className="text-[#f7f2ea] text-base font-serif italic leading-snug">
              "{scene.caption}"
            </p>
          </div>

          {/* Dedicated Difference Cross-Check & Audit Card */}
          <div className="bg-surface rounded-xs p-3.5 border-l-2 border-emerald-500 border-y border-r border-border-subtle flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Change Cross-Check Analysis
              </span>
              <span className="font-mono text-[10px] text-content-muted">
                Audit Resolution
              </span>
            </div>

            <div className="p-2.5 bg-surface-raised rounded-xs border border-border-subtle text-[11px] leading-relaxed flex flex-col gap-1.5">
              <div className="font-semibold text-content-primary">
                {scene.auditSummary.question}
              </div>
              <p className="text-content-secondary leading-normal">
                {scene.auditSummary.explanation}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border-subtle/60 text-[10px] font-mono">
                <div>
                  <span className="text-content-muted block">T1 Baseline:</span>
                  <span className="text-zinc-300 font-medium">
                    {scene.auditSummary.baselineCount}
                  </span>
                </div>
                <div>
                  <span className="text-content-muted block">Net Temporal Changes:</span>
                  <span className="text-emerald-400 font-bold">
                    {scene.auditSummary.newChangesCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Itemized Detected Changes List */}
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-content-muted uppercase tracking-wider mb-1">
                <span>Itemized Changes & Differences</span>
                <span>Click to highlight</span>
              </div>

              {scene.changes.map((change) => {
                const isHovered = hoveredChangeId === change.id;
                const isSelected = selectedChangeId === change.id;
                const isPreExisting = change.category === "pre_existing";

                return (
                  <button
                    key={change.id}
                    onMouseEnter={() => setHoveredChangeId(change.id)}
                    onMouseLeave={() => setHoveredChangeId(null)}
                    onClick={() =>
                      setSelectedChangeId(
                        selectedChangeId === change.id ? null : change.id
                      )
                    }
                    className={cn(
                      "w-full text-left p-2 rounded-xs border transition-colors flex items-start justify-between gap-2 text-[11px]",
                      isSelected
                        ? "bg-accent/15 border-accent text-content-primary shadow-xs"
                        : isHovered
                        ? "bg-surface-hover border-border-contrast text-content-primary"
                        : "bg-surface border-border-subtle text-content-secondary"
                    )}
                  >
                    <div className="flex items-start gap-1.5 min-w-0">
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full shrink-0 mt-1",
                          isPreExisting
                            ? "bg-zinc-500"
                            : change.category === "canopy_loss"
                            ? "bg-rose-500"
                            : "bg-emerald-500"
                        )}
                      />
                      <div className="min-w-0">
                        <div className="font-medium text-content-primary truncate">
                          {change.name}
                        </div>
                        <div className="text-content-muted text-[10px] font-mono leading-tight">
                          {change.details}
                        </div>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-[9px] font-mono px-1.5 py-0.5 rounded-xs shrink-0 whitespace-nowrap",
                        isPreExisting
                          ? "bg-zinc-800 text-zinc-300"
                          : change.category === "canopy_loss"
                          ? "bg-rose-950/80 text-rose-300 border border-rose-800/40"
                          : "bg-emerald-950/80 text-emerald-300 border border-emerald-800/40"
                      )}
                    >
                      {change.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1. Observed Change */}
          <div className="bg-surface rounded-xs p-3 border-l-2 border-accent border-y border-r border-border-subtle flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-accent uppercase tracking-wider">
                1. Observed Change
              </span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/30 px-1 py-0.5 rounded-xs border border-emerald-800/40">
                Direct Visual Fact
              </span>
            </div>
            <p className="text-content-primary leading-relaxed font-medium">
              "{scene.observedChange}"
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2 mt-1 border-t border-border-subtle/60 text-[11px] font-mono">
              <div>
                <span className="text-content-muted block text-[10px]">
                  Landcover Transition:
                </span>
                <span className="text-content-secondary font-medium">
                  {scene.landcoverTransition}
                </span>
              </div>
              <div>
                <span className="text-content-muted block text-[10px]">
                  Extracted Extent:
                </span>
                <span className="text-content-secondary font-medium">
                  {scene.changedAreaEstimate}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Possible Interpretation */}
          <div className="bg-surface rounded-xs p-3 border-l-2 border-amber-400 border-y border-r border-border-subtle flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                2. Possible Interpretation
              </span>
              <span className="font-mono text-[10px] text-amber-300">
                Contextual Meaning
              </span>
            </div>
            <p className="text-content-primary leading-relaxed">
              {scene.possibleInterpretation}
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-border-subtle/60 text-[11px] font-mono text-content-secondary">
              <span className="text-content-muted">Certainty:</span>
              <span className="text-amber-400 font-semibold">
                {Math.round(scene.confidence * 100)}% (Calibrated Consensus)
              </span>
            </div>
          </div>

          {/* 3. Inferred Cause (Hypothesis) */}
          <div className="bg-surface rounded-xs p-3 border-l-2 border-rose-400 border-y border-r border-border-subtle flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                3. Inferred Cause
              </span>
              <span className="font-mono text-[10px] text-rose-400 bg-rose-950/40 border border-rose-800/60 px-1 py-0.5 rounded-xs">
                Unverified Hypothesis
              </span>
            </div>
            <p className="text-content-primary leading-relaxed">
              {scene.inferredCause}
            </p>
            <div className="flex items-start gap-1.5 pt-1.5 border-t border-border-subtle/60 text-[11px] font-mono text-rose-300">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Causal hypothesis is unverified without municipal permits or local ground verification.
              </span>
            </div>
          </div>

          {/* Scene Metadata & Sensor Specifications */}
          <div className="p-3 bg-surface-raised rounded-xs border border-border-subtle text-[11px] font-mono flex flex-col gap-1.5">
            <div className="text-content-primary font-semibold uppercase tracking-wider text-[10px]">
              Imagery Metadata
            </div>
            <div className="flex justify-between text-content-secondary">
              <span className="text-content-muted">Sensor:</span>
              <span>{scene.sensor}</span>
            </div>
            <div className="flex justify-between text-content-secondary">
              <span className="text-content-muted">Resolution:</span>
              <span>{scene.resolution}</span>
            </div>
            <div className="flex justify-between text-content-secondary">
              <span className="text-content-muted">Epoch T1:</span>
              <span className="text-content-primary">{scene.t1Date}</span>
            </div>
            <div className="flex justify-between text-content-secondary">
              <span className="text-content-muted">Epoch T2:</span>
              <span className="text-content-primary">{scene.t2Date}</span>
            </div>
            <div className="flex justify-between text-content-secondary border-t border-border-subtle/60 pt-1">
              <span className="text-content-muted">Benchmark:</span>
              <span className="text-accent">{scene.verificationSource}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

