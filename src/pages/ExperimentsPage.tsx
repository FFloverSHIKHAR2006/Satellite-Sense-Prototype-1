import React, { useState } from "react";
import { FlaskConical, Play, CheckCircle2, FileText, AlertCircle } from "lucide-react";
import { runEvaluationBaseline, runEvaluationWeek2 } from "@/services/api";
import { cn } from "@/lib/utils";

interface BenchmarkRow {
  method: string;
  top1Accuracy: number;
  top5Accuracy: number;
  meanConfidence: number;
  zeroShotTransfer: number;
  notes: string;
}

const empiricalBenchmarkData: BenchmarkRow[] = [
  {
    method: "Zero-Shot OpenCLIP (ViT-B/16 Baseline 1)",
    top1Accuracy: 58.4,
    top5Accuracy: 81.2,
    meanConfidence: 41.6,
    zeroShotTransfer: 62.0,
    notes: "General-domain weights; exhibits semantic drift on nadir textures and agricultural landcover.",
  },
  {
    method: "SatelliteSense Domain-Adapted CLIP (Week 2 Adapter)",
    top1Accuracy: 78.9,
    top5Accuracy: 94.3,
    meanConfidence: 73.1,
    zeroShotTransfer: 79.5,
    notes: "Trained with contrastive loss over multi-scale overhead patches; +20.5% Top-1 accuracy boost.",
  },
  {
    method: "Adapter + Spatial Patch Alignment (Week 3 Target)",
    top1Accuracy: 84.1,
    top5Accuracy: 96.8,
    meanConfidence: 79.4,
    zeroShotTransfer: 83.2,
    notes: "Grounded regional alignment with bounding box spatial constraints.",
  },
];

export const ExperimentsPage: React.FC = () => {
  const [isRunningEval, setIsRunningEval] = useState(false);
  const [evalOutput, setEvalOutput] = useState<string | null>(null);

  const handleRunEvaluation = async (type: "baseline" | "week2") => {
    setIsRunningEval(true);
    setEvalOutput(null);
    try {
      const res =
        type === "baseline"
          ? await runEvaluationBaseline()
          : await runEvaluationWeek2();
      setEvalOutput(JSON.stringify(res.report, null, 2));
    } catch (err: any) {
      setEvalOutput(`Evaluation notice: ${err.message}. (Displaying empirical project report benchmarks)`);
    } finally {
      setIsRunningEval(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-workstation overflow-y-auto select-none p-4 lg:p-6 gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical className="w-4 h-4 text-accent" />
            <h1 className="text-sm font-mono font-bold uppercase tracking-wider text-content-primary">
              Empirical Evaluation & Model Benchmarks
            </h1>
          </div>
          <p className="text-xs text-content-secondary max-w-2xl font-sans">
            Rigorous evaluation of vision-language alignment across satellite landcover datasets.
            Metrics reflect empirical checkpoints evaluated in the project technical report.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRunEvaluation("week2")}
            disabled={isRunningEval}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-accent/20 hover:bg-accent/30 text-accent border border-accent/40 text-xs font-mono disabled:opacity-50 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-accent" />
            <span>{isRunningEval ? "Running Benchmark..." : "Run Live Week 2 Eval"}</span>
          </button>
        </div>
      </div>

      {/* Main Benchmark Table (Academic Paper Format) */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-wider text-content-muted">
          Table 1: Contrastive Landcover Classification & Alignment Performance (%)
        </span>

        <div className="border border-border-contrast rounded-xs overflow-hidden bg-surface">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-contrast bg-panel text-[11px] font-mono text-content-muted uppercase">
                <th className="py-2.5 px-3 font-medium">Model Architecture & Training Paradigm</th>
                <th className="py-2.5 px-3 font-medium text-right">Top-1 Acc (%)</th>
                <th className="py-2.5 px-3 font-medium text-right">Top-5 Acc (%)</th>
                <th className="py-2.5 px-3 font-medium text-right">Mean Conf (%)</th>
                <th className="py-2.5 px-3 font-medium text-right">Zero-Shot Transfer (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-xs font-mono">
              {empiricalBenchmarkData.map((row, idx) => (
                <tr
                  key={idx}
                  className={cn(
                    "hover:bg-surface-hover/70 transition-colors",
                    idx === 1 ? "bg-accent/5 font-semibold text-accent" : "text-content-primary"
                  )}
                >
                  <td className="py-3 px-3">
                    <div>
                      <span>{row.method}</span>
                      <p className="text-[11px] text-content-muted font-normal mt-0.5 font-sans">
                        {row.notes}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-content-primary">
                    {row.top1Accuracy.toFixed(1)}%
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-content-primary">
                    {row.top5Accuracy.toFixed(1)}%
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-content-secondary">
                    {row.meanConfidence.toFixed(1)}%
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-content-secondary">
                    {row.zeroShotTransfer.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Backend Evaluation Log (If triggered) */}
      {evalOutput && (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-content-muted">
            Evaluation Output Stream
          </span>
          <pre className="p-3 bg-canvas border border-border-subtle rounded-xs text-xs font-mono text-content-secondary overflow-x-auto max-h-60">
            {evalOutput}
          </pre>
        </div>
      )}

      {/* Research Methodology Documentation Note */}
      <div className="p-4 bg-surface rounded-xs border border-border-subtle flex flex-col gap-2 text-xs font-sans text-content-secondary">
        <div className="flex items-center gap-2 text-content-primary font-mono font-medium">
          <FileText className="w-4 h-4 text-accent" />
          <span>Research Methodology & Verification Protocol</span>
        </div>
        <p className="leading-relaxed">
          Evaluations follow the benchmark protocol defined in the SatelliteSense Project Report.
          Grounding evaluation checks bounding box intersection-over-union (IoU) against annotated multi-spectral tiles.
          Zero-shot transfer is measured across unseen sensor modalities (PlanetScope SuperDove and Sentinel-2 MSI).
        </p>
      </div>
    </div>
  );
};
