import React, { useState } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/common/resizable";
import { CanvasViewer } from "@/components/image-viewer/CanvasViewer";
import { AnalysisPanel } from "@/components/analysis/AnalysisPanel";
import { EvidenceInspector } from "@/components/evidence/EvidenceInspector";
import { SceneGraphInspector } from "@/components/scene-graph/SceneGraphInspector";
import { ShieldCheck, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

export const SingleImageWorkstationPage: React.FC = () => {
  const [activeInspectorTab, setActiveInspectorTab] = useState<"evidence" | "graph">("evidence");

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-canvas">
      {/* Desktop 1440px Resizable Split Layout */}
      <div className="hidden lg:block h-full w-full">
        <ResizablePanelGroup direction="horizontal" autoSaveId="satellitesense-workstation-h">
          {/* Main Dominant Canvas Viewport (>= 55% width) */}
          <ResizablePanel defaultSize={60} minSize={45}>
            <CanvasViewer />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right-Hand Docked Analysis & Inspector Split */}
          <ResizablePanel defaultSize={40} minSize={28}>
            <ResizablePanelGroup direction="vertical" autoSaveId="satellitesense-workstation-v">
              {/* Top Half: Caption & Atomic Claims */}
              <ResizablePanel defaultSize={52} minSize={30}>
                <AnalysisPanel />
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Bottom Half: Inspector Tabs (Evidence / Scene Graph) */}
              <ResizablePanel defaultSize={48} minSize={25}>
                <div className="h-full flex flex-col bg-panel">
                  {/* Tab Strip */}
                  <div className="flex-none h-8 bg-surface border-b border-border-subtle flex items-center px-2 gap-1 text-xs select-none">
                    <button
                      onClick={() => setActiveInspectorTab("evidence")}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-xs font-mono text-[11px] transition-colors",
                        activeInspectorTab === "evidence"
                          ? "bg-surface-raised text-accent font-medium border border-border-contrast"
                          : "text-content-secondary hover:text-content-primary hover:bg-surface-hover"
                      )}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Evidence Inspector</span>
                    </button>

                    <button
                      onClick={() => setActiveInspectorTab("graph")}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-xs font-mono text-[11px] transition-colors",
                        activeInspectorTab === "graph"
                          ? "bg-surface-raised text-accent font-medium border border-border-contrast"
                          : "text-content-secondary hover:text-content-primary hover:bg-surface-hover"
                      )}
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Scene Graph</span>
                    </button>
                  </div>

                  {/* Active Inspector View */}
                  <div className="flex-1 overflow-hidden">
                    {activeInspectorTab === "evidence" ? (
                      <EvidenceInspector />
                    ) : (
                      <SceneGraphInspector />
                    )}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Responsive Mobile / Tablet Layout (< 1024px): Stacked Canvas on Top, Tabbed Sheet on Bottom */}
      <div className="flex lg:hidden flex-col h-full w-full overflow-hidden">
        {/* Dominant Top Half: Canvas */}
        <div className="h-1/2 w-full border-b border-border-subtle">
          <CanvasViewer />
        </div>

        {/* Bottom Half: Tabbed Panels */}
        <div className="h-1/2 w-full flex flex-col bg-panel">
          <div className="flex-none h-9 bg-surface border-b border-border-subtle flex items-center px-2 gap-1 text-xs">
            <button
              onClick={() => setActiveInspectorTab("evidence")}
              className={cn(
                "px-2.5 py-1 rounded-xs font-mono text-[11px]",
                activeInspectorTab === "evidence"
                  ? "bg-surface-raised text-accent font-medium"
                  : "text-content-secondary"
              )}
            >
              Analysis & Evidence
            </button>
            <button
              onClick={() => setActiveInspectorTab("graph")}
              className={cn(
                "px-2.5 py-1 rounded-xs font-mono text-[11px]",
                activeInspectorTab === "graph"
                  ? "bg-surface-raised text-accent font-medium"
                  : "text-content-secondary"
              )}
            >
              Scene Graph
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeInspectorTab === "evidence" ? (
              <div className="flex flex-col h-full divide-y divide-border-subtle">
                <div className="min-h-[220px]">
                  <AnalysisPanel />
                </div>
                <div className="min-h-[240px]">
                  <EvidenceInspector />
                </div>
              </div>
            ) : (
              <SceneGraphInspector />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
