import React, { useState } from "react";
import { GitBranch, Table, Network, ExternalLink, Info } from "lucide-react";
import { useWorkstation } from "@/context/WorkstationContext";
import { SceneGraphData } from "@/types/workstation";
import { cn } from "@/lib/utils";

export const SceneGraphInspector: React.FC = () => {
  const {
    analysisResult,
    selectedPatch,
    setSelectedPatch,
    zoomToBbox,
    setHoveredRegionId,
  } = useWorkstation();

  const [viewMode, setViewMode] = useState<"table" | "diagram">("table");
  const [selectedEdgeIndex, setSelectedEdgeIndex] = useState<number | null>(null);

  // Derive scene graph from actual returned patches/claims (or explicit empty state)
  const patches = analysisResult?.patch_evidence || [];
  const primaryClaim = analysisResult?.claims?.[0];

  const graphData: SceneGraphData = {
    nodes: patches.map((p) => ({
      id: `node-${p.patch_id}`,
      label: p.primary_evidence,
      type: "landcover",
      patch_id: p.patch_id,
      bbox: p.bbox,
    })),
    edges: [],
  };

  // Build real spatial adjacency relations between detected patches if 2+ patches exist
  if (patches.length >= 2) {
    for (let i = 0; i < patches.length - 1; i++) {
      graphData.edges.push({
        source: `node-${patches[i].patch_id}`,
        target: `node-${patches[i + 1].patch_id}`,
        relation: "adjacent_to",
        confidence: Math.min(
          patches[i].evidence_confidence,
          patches[i + 1].evidence_confidence
        ),
      });
    }
  }

  const handleNodeClick = (node: (typeof graphData.nodes)[0]) => {
    if (node.patch_id) {
      const match = patches.find((p) => p.patch_id === node.patch_id);
      if (match) {
        setSelectedPatch(match);
        zoomToBbox(match.bbox);
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-panel p-3 overflow-hidden select-none text-xs font-sans">
      {/* Header with View Mode Switcher */}
      <div className="flex items-center justify-between pb-2 border-b border-border-subtle mb-3 flex-none">
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-content-primary uppercase tracking-wider">
          <GitBranch className="w-3.5 h-3.5 text-accent" />
          <span>Spatial Scene Graph</span>
        </div>

        <div className="flex items-center bg-surface border border-border-subtle rounded-xs p-0.5">
          <button
            onClick={() => setViewMode("table")}
            className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-xs font-mono text-[11px] transition-colors",
              viewMode === "table"
                ? "bg-accent/20 text-accent font-medium border border-accent/40"
                : "text-content-secondary hover:text-content-primary"
            )}
          >
            <Table className="w-3 h-3" />
            <span>Table View</span>
          </button>
          <button
            onClick={() => setViewMode("diagram")}
            className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-xs font-mono text-[11px] transition-colors",
              viewMode === "diagram"
                ? "bg-accent/20 text-accent font-medium border border-accent/40"
                : "text-content-secondary hover:text-content-primary"
            )}
          >
            <Network className="w-3 h-3" />
            <span>Node-Link</span>
          </button>
        </div>
      </div>

      {graphData.nodes.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-content-muted p-4">
          <Info className="w-5 h-5 mb-2 text-content-muted" />
          <p className="font-mono text-xs">No graph entities detected.</p>
          <span className="text-[11px] mt-1">
            Run domain-adapted analysis with patch extraction enabled to populate spatial relationships.
          </span>
        </div>
      ) : viewMode === "table" ? (
        /* Accessible Subject -> Relation -> Object Table */
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-contrast bg-surface text-[11px] font-mono text-content-muted uppercase">
                <th className="py-1.5 px-2 font-medium">Subject</th>
                <th className="py-1.5 px-2 font-medium">Relation</th>
                <th className="py-1.5 px-2 font-medium">Object</th>
                <th className="py-1.5 px-2 font-medium text-right">Conf.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-xs font-mono">
              {graphData.edges.length > 0 ? (
                graphData.edges.map((edge, idx) => {
                  const srcNode = graphData.nodes.find((n) => n.id === edge.source);
                  const tgtNode = graphData.nodes.find((n) => n.id === edge.target);

                  return (
                    <tr
                      key={idx}
                      onClick={() => setSelectedEdgeIndex(idx)}
                      className={cn(
                        "hover:bg-surface-hover/70 cursor-pointer transition-colors",
                        selectedEdgeIndex === idx ? "bg-surface-raised text-accent" : ""
                      )}
                    >
                      <td className="py-2 px-2 text-content-primary">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (srcNode) handleNodeClick(srcNode);
                          }}
                          className="hover:underline text-accent text-left"
                        >
                          {srcNode?.label || edge.source}
                        </button>
                      </td>
                      <td className="py-2 px-2 text-content-secondary">
                        <span className="px-1.5 py-0.5 rounded-xs bg-surface border border-border-subtle text-[11px]">
                          {edge.relation}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-content-primary">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (tgtNode) handleNodeClick(tgtNode);
                          }}
                          className="hover:underline text-accent text-left"
                        >
                          {tgtNode?.label || edge.target}
                        </button>
                      </td>
                      <td className="py-2 px-2 text-right tabular-nums text-content-secondary">
                        {edge.confidence !== undefined
                          ? `${(edge.confidence * 100).toFixed(1)}%`
                          : "—"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-content-muted italic">
                    Single entity identified ({graphData.nodes[0]?.label}). Minimum 2 regions required for pairwise relation edges.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Flat Node-Link Diagram (Restrained, no glowing balls or bouncy physics) */
        <div className="flex-1 bg-canvas border border-border-subtle rounded-xs relative p-3 overflow-auto">
          <svg className="w-full h-full min-h-[220px]" viewBox="0 0 320 200">
            {graphData.edges.map((edge, idx) => (
              <line
                key={idx}
                x1={60 + idx * 80}
                y1={100}
                x2={140 + idx * 80}
                y2={100}
                stroke="#313F59"
                strokeWidth={1.5}
                strokeDasharray="3 3"
              />
            ))}

            {graphData.nodes.map((node, idx) => {
              const x = 50 + idx * 110;
              const y = 100;
              const isSelected = selectedPatch?.patch_id === node.patch_id;

              return (
                <g
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredRegionId(String(node.patch_id))}
                  onMouseLeave={() => setHoveredRegionId(null)}
                >
                  <rect
                    x={x - 45}
                    y={y - 20}
                    width={90}
                    height={40}
                    fill={isSelected ? "#19202E" : "#121721"}
                    stroke={isSelected ? "#38BDF8" : "#313F59"}
                    strokeWidth={isSelected ? 2 : 1}
                    rx={2}
                  />
                  <text
                    x={x}
                    y={y - 2}
                    textAnchor="middle"
                    fill="#F1F5F9"
                    fontSize={11}
                    fontWeight={500}
                    fontFamily="sans-serif"
                  >
                    {node.label.length > 12 ? `${node.label.slice(0, 11)}…` : node.label}
                  </text>
                  <text
                    x={x}
                    y={y + 12}
                    textAnchor="middle"
                    fill="#94A3B8"
                    fontSize={9.5}
                    fontFamily="monospace"
                  >
                    Region #{node.patch_id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </div>
  );
};
