import React, { useState } from "react";
import { Clock, Eye, Trash2, ArrowUpRight, Search, Filter } from "lucide-react";
import { useWorkstation } from "@/context/WorkstationContext";
import { cn } from "@/lib/utils";

interface HistoryRecord {
  id: string;
  timestamp: string;
  filename: string;
  mode: string;
  captionPreview: string;
  topClaim: string;
  confidence: number;
  status: "verified" | "uncertain" | "unsupported";
}

const mockHistory: HistoryRecord[] = [
  {
    id: "hist-0941",
    timestamp: "2026-10-14 14:12:05",
    filename: "agricultural_pivot_nebraska.tif",
    mode: "domain_adapted",
    captionPreview: "High-confidence overhead identification of circular center-pivot irrigation agricultural fields...",
    topClaim: "Primary terrain structure verified as agriculture",
    confidence: 0.864,
    status: "verified",
  },
  {
    id: "hist-0940",
    timestamp: "2026-10-14 13:48:22",
    filename: "rotterdam_europort_docks.tif",
    mode: "domain_adapted",
    captionPreview: "High-contrast coastal deepwater port showing active terminal piers with berthed commercial vessels...",
    topClaim: "Deepwater port infrastructure and shipping aprons",
    confidence: 0.912,
    status: "verified",
  },
  {
    id: "hist-0939",
    timestamp: "2026-10-14 11:20:19",
    filename: "dallas_urban_arterial.tif",
    mode: "baseline",
    captionPreview: "A satellite map view of city buildings and streets in square blocks...",
    topClaim: "Urban commercial grid network",
    confidence: 0.612,
    status: "uncertain",
  },
  {
    id: "hist-0938",
    timestamp: "2026-10-14 09:15:44",
    filename: "indus_river_flood_t1.tif",
    mode: "domain_adapted",
    captionPreview: "Inundated agricultural floodplain exhibiting severe riverine overflow and submerged transport corridors...",
    topClaim: "Surface water boundary inundation",
    confidence: 0.887,
    status: "verified",
  },
];

export const HistoryPage: React.FC = () => {
  const { openImageInWorkstation } = useWorkstation();
  const [historyList, setHistoryList] = useState<HistoryRecord[]>(mockHistory);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = historyList.filter(
    (h) =>
      h.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.captionPreview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-workstation overflow-hidden select-none">
      {/* Header */}
      <div className="h-10 flex-none bg-panel border-b border-border-subtle px-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent" />
          <span className="font-mono font-semibold text-content-primary uppercase tracking-wider text-[11px]">
            Analysis Run History ({filtered.length})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-content-muted" />
            <input
              type="text"
              placeholder="Search filename or caption..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface border border-border-subtle rounded-xs pl-7 pr-3 py-1 text-xs text-content-primary font-mono placeholder:text-content-muted focus:border-accent focus:outline-none w-64"
            />
          </div>
          <button
            onClick={() => setHistoryList([])}
            className="px-2 py-1 rounded-xs border border-border-subtle hover:bg-surface-hover text-content-muted hover:text-rose-400 font-mono text-[11px] transition-colors"
          >
            Clear Session
          </button>
        </div>
      </div>

      {/* Dense Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-contrast bg-surface text-[11px] font-mono text-content-muted uppercase">
              <th className="py-2 px-3 font-medium">Run ID</th>
              <th className="py-2 px-3 font-medium">Timestamp</th>
              <th className="py-2 px-3 font-medium">Source Scene</th>
              <th className="py-2 px-3 font-medium">Mode</th>
              <th className="py-2 px-3 font-medium">Synthesized Caption Preview</th>
              <th className="py-2 px-3 font-medium text-right">Confidence</th>
              <th className="py-2 px-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-xs font-mono">
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-surface-hover/60 transition-colors group"
              >
                <td className="py-2.5 px-3 text-accent font-bold">
                  {item.id}
                </td>
                <td className="py-2.5 px-3 text-content-secondary tabular-nums text-[11px]">
                  {item.timestamp}
                </td>
                <td className="py-2.5 px-3 text-content-primary font-medium">
                  {item.filename}
                </td>
                <td className="py-2.5 px-3 text-content-secondary">
                  <span className="px-1.5 py-0.5 rounded-xs bg-surface border border-border-subtle text-[10px]">
                    {item.mode}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-content-primary font-sans max-w-md truncate">
                  {item.captionPreview}
                </td>
                <td className="py-2.5 px-3 text-right tabular-nums text-content-primary">
                  {(item.confidence * 100).toFixed(1)}%
                </td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() =>
                      openImageInWorkstation(
                        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="%23223322"/></svg>`,
                        item.filename,
                        {
                          caption: item.captionPreview,
                          claims: [
                            {
                              claim_id: 1,
                              statement: item.topClaim,
                              category: "Historical Record",
                              confidence: item.confidence,
                              evidence_type: item.mode,
                              quality_status: item.status === "verified" ? "high" : "moderate",
                            },
                          ],
                        }
                      )
                    }
                    className="inline-flex items-center gap-1 text-accent hover:text-accent-hover text-[11px] font-medium"
                    title="Load in workstation"
                  >
                    <span>Load</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-content-muted font-mono">
            No analysis history records match your search query.
          </div>
        )}
      </div>
    </div>
  );
};
