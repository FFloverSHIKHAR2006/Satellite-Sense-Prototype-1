import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  SampleItem,
  SingleAnalysisResponse,
  PatchEvidence,
  ClaimItem,
  LayerState,
} from "@/types/workstation";
import {
  fetchSampleCatalog,
  analyzeSingleImage,
  fetchHealthCheck,
} from "@/services/api";
import { SAMPLE_CAPTION_REVIEW_FIXTURES } from "@/data/captionReviewFixtures";

export type WorkstationPage =
  | "landing"
  | "caption-review"
  | "single-image"
  | "scene-graph"
  | "temporal-compare"
  | "history"
  | "experiments";

interface WorkstationContextType {
  activePage: WorkstationPage;
  setActivePage: (page: WorkstationPage) => void;

  // Health and System Telemetry
  backendStatus: "connected" | "offline" | "checking";
  hardwareInfo: string;

  // Active Image & Metadata
  imageSrc: string | null;
  imageFilename: string;
  imageDimensions: { width: number; height: number } | null;
  sensorMetadata: {
    sensor?: string;
    gsd_m?: string;
    date?: string;
  } | null;

  // Analysis State
  isAnalyzing: boolean;
  analysisError: string | null;
  analysisResult: SingleAnalysisResponse["analysis"] | null;
  telemetry: SingleAnalysisResponse["telemetry"] | null;
  modelMode: "domain_adapted" | "baseline";
  setModelMode: (mode: "domain_adapted" | "baseline") => void;

  // Shared Selection State (Canvas <-> Claims <-> Evidence <-> Scene Graph)
  selectedClaimId: number | null;
  setSelectedClaimId: (id: number | null) => void;
  hoveredRegionId: string | null;
  setHoveredRegionId: (id: string | null) => void;
  selectedPatch: PatchEvidence | null;
  setSelectedPatch: (patch: PatchEvidence | null) => void;

  // Canvas Viewport Controls
  zoom: number;
  setZoom: (z: number | ((prev: number) => number)) => void;
  pan: { x: number; y: number };
  setPan: (p: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
  cursorPos: { x: number; y: number } | null;
  setCursorPos: (pos: { x: number; y: number } | null) => void;
  resetViewport: () => void;
  zoomToFit: () => void;
  zoomToBbox: (bbox: [number, number, number, number]) => void;

  // Layers Configuration
  layers: LayerState;
  setLayers: React.Dispatch<React.SetStateAction<LayerState>>;

  // Sample catalog
  sampleCatalog: SampleItem[];
  loadSampleScene: (sampleId: string) => Promise<void>;

  // Actions
  loadUserImage: (file: File) => Promise<void>;
  runAnalysisOnCurrentImage: (mode?: "domain_adapted" | "baseline") => Promise<void>;
  openImageInWorkstation: (src: string, filename: string, presetAnalysis?: any) => void;
}

const defaultLayers: LayerState = {
  imageVisible: true,
  imageOpacity: 100,
  boxesVisible: true,
  boxesOpacity: 100,
  halosVisible: true,
  patchesVisible: true,
  patchesOpacity: 80,
  heatmapVisible: false,
};

const WorkstationContext = createContext<WorkstationContextType | null>(null);

export const WorkstationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<WorkstationPage>("landing");

  const [backendStatus, setBackendStatus] = useState<"connected" | "offline" | "checking">("checking");
  const [hardwareInfo, setHardwareInfo] = useState<string>("Detecting...");

  // Default to first fixture agricultural image
  const defaultFixture = SAMPLE_CAPTION_REVIEW_FIXTURES[0];
  const [imageSrc, setImageSrc] = useState<string | null>(defaultFixture.image_src);
  const [imageFilename, setImageFilename] = useState<string>(defaultFixture.filename);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>({
    width: 1024,
    height: 1024,
  });
  const [sensorMetadata, setSensorMetadata] = useState<{ sensor?: string; gsd_m?: string; date?: string } | null>({
    sensor: defaultFixture.sensor,
    gsd_m: defaultFixture.gsd_m,
    date: defaultFixture.acquisition_date,
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<SingleAnalysisResponse["analysis"] | null>({
    caption: defaultFixture.candidates[2].caption_text, // "A playground with basketball fields next to it is surrounded by many green trees and buildings."
    claims: defaultFixture.candidates.map((c) => ({
      claim_id: c.candidate_id,
      statement: c.caption_text,
      category: `Feature #${c.candidate_id}`,
      confidence: c.confidence || 0.88,
      evidence_type: "visual_grounding",
      quality_status: "high",
    })),
    scene_predictions: [
      { label: "Playground & Sports Field", confidence: 0.94 },
      { label: "Surrounding Trees & Residential", confidence: 0.86 },
    ],
    quality_report: {
      mean_brightness: 118.4,
      cloud_occlusion_estimate: 0.02,
    },
    patch_evidence: [
      {
        patch_id: 1,
        bbox: [340, 280, 300, 420],
        scale: 1.0,
        center_norm: [0.49, 0.49],
        top_predictions: [{ label: "Oval Football Field & Running Track", confidence: 0.95 }],
        primary_evidence: "Oval Football Field & Running Track",
        evidence_confidence: 0.95,
      },
      {
        patch_id: 2,
        bbox: [30, 20, 500, 220],
        scale: 1.0,
        center_norm: [0.28, 0.13],
        top_predictions: [{ label: "White Residential Houses", confidence: 0.88 }],
        primary_evidence: "White Residential Houses",
        evidence_confidence: 0.88,
      },
      {
        patch_id: 3,
        bbox: [650, 220, 300, 600],
        scale: 1.0,
        center_norm: [0.8, 0.52],
        top_predictions: [{ label: "Dense Green Trees", confidence: 0.92 }],
        primary_evidence: "Dense Green Trees",
        evidence_confidence: 0.92,
      },
      {
        patch_id: 4,
        bbox: [20, 510, 130, 240],
        scale: 1.0,
        center_norm: [0.08, 0.63],
        top_predictions: [{ label: "Long Perimeter Buildings", confidence: 0.84 }],
        primary_evidence: "Long Perimeter Buildings",
        evidence_confidence: 0.84,
      },
      {
        patch_id: 5,
        bbox: [705, 450, 95, 160],
        scale: 1.0,
        center_norm: [0.75, 0.53],
        top_predictions: [{ label: "Basketball & Tennis Courts", confidence: 0.93 }],
        primary_evidence: "Basketball & Tennis Courts",
        evidence_confidence: 0.93,
      },
    ],
    mode: "domain_adapted",
  });
  const [telemetry, setTelemetry] = useState<SingleAnalysisResponse["telemetry"] | null>({
    latency_ms: 114.2,
    device: "GPU",
    mode: "domain_adapted",
    backbone: "OpenCLIP-ViT-B/16",
    checkpoint_loaded: true,
  });
  const [modelMode, setModelMode] = useState<"domain_adapted" | "baseline">("domain_adapted");

  const [selectedClaimId, setSelectedClaimId] = useState<number | null>(1);
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [selectedPatch, setSelectedPatch] = useState<PatchEvidence | null>({
    patch_id: 1,
    bbox: [340, 280, 300, 420],
    scale: 1.0,
    center_norm: [0.49, 0.49],
    top_predictions: [{ label: "Oval Football Field & Running Track", confidence: 0.95 }],
    primary_evidence: "Oval Football Field & Running Track",
    evidence_confidence: 0.95,
  });

  const [zoom, setZoom] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  const [layers, setLayers] = useState<LayerState>(defaultLayers);
  const [sampleCatalog, setSampleCatalog] = useState<SampleItem[]>([]);
  const [currentFileObject, setCurrentFileObject] = useState<File | null>(null);

  // Check backend health on mount
  useEffect(() => {
    let mounted = true;
    fetchHealthCheck()
      .then((data) => {
        if (!mounted) return;
        setBackendStatus("connected");
        const dev = data.hardware?.device?.toUpperCase() || "CPU";
        const vram = data.hardware?.vram_allocated_mb ? ` (${data.hardware.vram_allocated_mb} MB VRAM)` : "";
        setHardwareInfo(`${dev}${vram} • Adapter Ready`);
      })
      .catch(() => {
        if (!mounted) return;
        setBackendStatus("offline");
        setHardwareInfo("Backend Offline • Standalone Mode Active");
      });

    fetchSampleCatalog()
      .then((items) => {
        if (!mounted) return;
        setSampleCatalog(items);
      })
      .catch(() => {
        // Ignored
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Sync selected claim with corresponding patch
  useEffect(() => {
    if (selectedClaimId === null) return;
    if (analysisResult?.patch_evidence && analysisResult.patch_evidence.length > 0) {
      // Find matching patch or select first relevant
      const found = analysisResult.patch_evidence.find((p) => p.patch_id === selectedClaimId);
      if (found) {
        setSelectedPatch(found);
      }
    }
  }, [selectedClaimId, analysisResult]);

  const resetViewport = useCallback(() => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  }, []);

  const zoomToFit = useCallback(() => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  }, []);

  const zoomToBbox = useCallback((bbox: [number, number, number, number]) => {
    // bbox is [x, y, w, h] in image coordinates
    const [bx, by, bw, bh] = bbox;
    const cx = bx + bw / 2;
    const cy = by + bh / 2;
    // Target zoom around the box
    const targetZoom = Math.min(3.5, Math.max(1.8, 512 / Math.max(bw, bh)));
    setZoom(targetZoom);
    // Center the bounding box in viewport
    const offsetX = -(cx - 256) * targetZoom;
    const offsetY = -(cy - 256) * targetZoom;
    setPan({ x: offsetX, y: offsetY });
  }, []);

  const loadUserImage = async (file: File) => {
    setCurrentFileObject(file);
    setImageFilename(file.name);
    setAnalysisError(null);
    setSensorMetadata({
      sensor: "Custom Upload",
      date: new Date().toISOString().split("T")[0],
    });

    const url = URL.createObjectURL(file);
    setImageSrc(url);

    // Measure dimensions
    const img = new Image();
    img.src = url;
    await img.decode().catch(() => {});
    setImageDimensions({ width: img.naturalWidth || 512, height: img.naturalHeight || 512 });

    // Automatically trigger initial analysis
    await triggerAnalysis({ file, mode: modelMode });
  };

  const loadSampleScene = async (sampleId: string) => {
    setAnalysisError(null);
    const sample = sampleCatalog.find((s) => s.id === sampleId);
    if (!sample) return;

    setImageFilename(sample.filename);
    setImageSrc(sample.url);
    setSensorMetadata({
      sensor: `Dataset Sample (${sample.class})`,
      date: "Catalog Reference",
    });

    await triggerAnalysis({ sampleId: sample.id, mode: modelMode });
  };

  const triggerAnalysis = async (options: {
    file?: File | null;
    sampleId?: string | null;
    mode?: "domain_adapted" | "baseline";
  }) => {
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await analyzeSingleImage({
        file: options.file || currentFileObject,
        sampleId: options.sampleId,
        extractPatches: true,
        mode: options.mode || modelMode,
      });

      setAnalysisResult(response.analysis);
      setTelemetry(response.telemetry);

      if (response.preview_data_url) {
        setImageSrc(response.preview_data_url);
      }

      // Preselect primary claim if available
      if (response.analysis.claims && response.analysis.claims.length > 0) {
        setSelectedClaimId(response.analysis.claims[0].claim_id);
      }
    } catch (err: any) {
      console.warn("[Workstation] Live analysis call notice:", err.message);
      setAnalysisError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const runAnalysisOnCurrentImage = async (overrideMode?: "domain_adapted" | "baseline") => {
    const mode = overrideMode || modelMode;
    await triggerAnalysis({ file: currentFileObject, mode });
  };

  const openImageInWorkstation = (
    src: string,
    filename: string,
    presetAnalysis?: any
  ) => {
    setImageSrc(src);
    setImageFilename(filename);
    if (presetAnalysis) {
      setAnalysisResult(presetAnalysis);
    }
    setActivePage("single-image");
  };

  return (
    <WorkstationContext.Provider
      value={{
        activePage,
        setActivePage,
        backendStatus,
        hardwareInfo,
        imageSrc,
        imageFilename,
        imageDimensions,
        sensorMetadata,
        isAnalyzing,
        analysisError,
        analysisResult,
        telemetry,
        modelMode,
        setModelMode,
        selectedClaimId,
        setSelectedClaimId,
        hoveredRegionId,
        setHoveredRegionId,
        selectedPatch,
        setSelectedPatch,
        zoom,
        setZoom,
        pan,
        setPan,
        cursorPos,
        setCursorPos,
        resetViewport,
        zoomToFit,
        zoomToBbox,
        layers,
        setLayers,
        sampleCatalog,
        loadSampleScene,
        loadUserImage,
        runAnalysisOnCurrentImage,
        openImageInWorkstation,
      }}
    >
      {children}
    </WorkstationContext.Provider>
  );
};

export const useWorkstation = () => {
  const context = useContext(WorkstationContext);
  if (!context) {
    throw new Error("useWorkstation must be used within a WorkstationProvider");
  }
  return context;
};
