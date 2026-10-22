import React from "react";
import {
  Activity,
  Cpu,
  Keyboard,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";
import { useWorkstation } from "@/context/WorkstationContext";
import { RadarReticleLogo } from "@/components/common/RadarReticleLogo";
import { cn } from "@/lib/utils";

interface TopStatusBarProps {
  onOpenShortcuts?: () => void;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({ onOpenShortcuts }) => {
  const {
    imageFilename,
    imageDimensions,
    sensorMetadata,
    telemetry,
    isAnalyzing,
    modelMode,
    setModelMode,
    runAnalysisOnCurrentImage,
    backendStatus,
    hardwareInfo,
    setActivePage,
  } = useWorkstation();

  return (
    <header className="h-10 flex-none bg-panel border-b border-border-subtle px-3 flex items-center justify-between text-xs select-none z-20">
      {/* Left: Portal return button & Active Scene Metadata */}
      <div className="flex items-center gap-3 overflow-hidden">
        {/* Quick Portal Switcher */}
        <button
          onClick={() => setActivePage("landing")}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-400/30 transition-colors font-mono text-[11px] shrink-0"
          title="Return to Cosmic Landing Portal"
        >
          <RadarReticleLogo size={14} showSweep={false} />
          <span className="hidden sm:inline font-semibold">PORTAL</span>
        </button>

        <div className="h-4 w-px bg-border-subtle hidden sm:block" />

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-content-muted text-[11px]">SCENE:</span>
          <span className="font-mono text-content-primary font-medium truncate max-w-[180px]" title={imageFilename}>
            {imageFilename}
          </span>
        </div>

        {imageDimensions && (
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-content-secondary border-l border-border-subtle pl-3">
            <span className="text-content-muted">DIM:</span>
            <span className="tabular-numbers text-content-primary">{imageDimensions.width}×{imageDimensions.height}</span>
          </div>
        )}

        {sensorMetadata?.sensor && (
          <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-content-secondary border-l border-border-subtle pl-3">
            <span className="text-content-muted">SENSOR:</span>
            <span className="text-sky-300 font-medium">{sensorMetadata.sensor}</span>
          </div>
        )}

        <div className="hidden xl:flex items-center gap-1.5 font-mono text-[11px] text-content-secondary border-l border-border-subtle pl-3">
          <span className="text-content-muted">CRS:</span>
          <span className="text-content-primary">EPSG:4326</span>
          <span className="text-border-contrast">|</span>
          <span className="text-content-muted">GSD:</span>
          <span className="text-amber-300">{sensorMetadata?.gsd_m || "0.31m/px"}</span>
        </div>
      </div>

      {/* Right: Model Mode Selector, Status & Telemetry */}
      <div className="flex items-center gap-3">
        {/* Model Mode Selector */}
        <div className="flex items-center bg-surface-raised border border-border-subtle rounded-xs p-0.5">
          <button
            onClick={() => {
              setModelMode("domain_adapted");
              runAnalysisOnCurrentImage("domain_adapted");
            }}
            disabled={isAnalyzing}
            className={cn(
              "px-2 py-0.5 rounded-xs text-[11px] font-mono transition-colors",
              modelMode === "domain_adapted"
                ? "bg-accent/20 text-accent font-medium border border-accent/40"
                : "text-content-secondary hover:text-content-primary"
            )}
          >
            Domain Adapted
          </button>
          <button
            onClick={() => {
              setModelMode("baseline");
              runAnalysisOnCurrentImage("baseline");
            }}
            disabled={isAnalyzing}
            className={cn(
              "px-2 py-0.5 rounded-xs text-[11px] font-mono transition-colors",
              modelMode === "baseline"
                ? "bg-accent/20 text-accent font-medium border border-accent/40"
                : "text-content-secondary hover:text-content-primary"
            )}
          >
            Zero-Shot Base
          </button>
        </div>

        {/* Quick Re-Infer Action */}
        <button
          onClick={() => runAnalysisOnCurrentImage()}
          disabled={isAnalyzing}
          className="h-6 px-2 bg-sky-500/20 text-sky-300 hover:bg-sky-500 hover:text-slate-950 border border-sky-500/40 font-mono text-[10px] font-bold uppercase flex items-center gap-1 transition-colors rounded-xs"
          title="Re-run CLIP Multimodal Inference"
        >
          <RefreshCw className={cn("w-3 h-3", isAnalyzing && "animate-spin")} />
          <span className="hidden md:inline">RUN INFERENCE</span>
        </button>

        {/* Backend & Inference Telemetry */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-content-secondary border-l border-border-subtle pl-3">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                backendStatus === "connected"
                  ? "bg-emerald-400"
                  : backendStatus === "checking"
                  ? "bg-amber-400 animate-pulse"
                  : "bg-rose-400"
              )}
            />
            <span className="truncate max-w-[150px]" title={hardwareInfo}>
              {hardwareInfo}
            </span>
          </div>

          {telemetry && (
            <span className="text-accent bg-surface px-1.5 py-0.5 rounded-xs border border-border-subtle tabular-numbers">
              {telemetry.latency_ms} ms
            </span>
          )}
        </div>

        {/* Keyboard Shortcuts Trigger */}
        {onOpenShortcuts && (
          <button
            onClick={onOpenShortcuts}
            className="p-1 rounded-xs hover:bg-surface-hover text-content-secondary hover:text-content-primary border border-transparent hover:border-border-subtle transition-colors"
            title="Keyboard Shortcuts (?)"
            aria-label="Keyboard Shortcuts"
          >
            <Keyboard className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </header>
  );
};
