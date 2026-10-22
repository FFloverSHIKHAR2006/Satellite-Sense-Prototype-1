import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  Search,
  Layers,
  Activity,
  Compass,
  ListChecks,
  GitBranch,
  SplitSquareVertical,
  Clock,
  FlaskConical,
  ChevronDown,
  Zap,
} from "lucide-react";
import { useWorkstation, WorkstationPage } from "@/context/WorkstationContext";
import { SAMPLE_CAPTION_REVIEW_FIXTURES } from "@/data/captionReviewFixtures";
import { RadarReticleLogo } from "@/components/common/RadarReticleLogo";
import { VectorGlobe } from "@/components/common/VectorGlobe";
import {
  SpectralPrismVector,
  GroundingReticleVector,
  SarRadarVector,
  SceneGraphVector,
  VectorHorizonEarthLimb,
} from "@/components/common/VectorVisuals";

export const LandingPage: React.FC = () => {
  const { setActivePage, openImageInWorkstation, loadSampleScene } = useWorkstation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBandMode, setSelectedBandMode] = useState<"rgb" | "nir" | "ndvi">("rgb");
  const [activeConstellation, setActiveConstellation] = useState<string>("Sentinel-2 MSI");
  const [activeSandboxStep, setActiveSandboxStep] = useState<number>(1);
  const [heroGlobeMode, setHeroGlobeMode] = useState<"vector-globe" | "horizon-limb">("vector-globe");

  // Keyboard shortcut: Press W to launch explorer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key.toLowerCase() === "w") {
        setActivePage("caption-review");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setActivePage]);

  // Quick constellation preset selector
  const constellations = [
    { name: "Sentinel-2 MSI", sampleId: "scene_playground_stadium_01", desc: "10m-20m Multispectral (VNIR/SWIR)" },
    { name: "Landsat 8/9 OLI", sampleId: "scene_airport_planes_02", desc: "15m-30m Multispectral & Thermal TIRS" },
    { name: "WorldView-3", sampleId: "scene_playground_stadium_01", desc: "0.31m High-Res Commercial Stereo Ortho" },
    { name: "Sentinel-1 SAR", sampleId: "scene_bareland_culdesac_03", desc: "C-Band Synthetic Aperture Radar (VV/VH)" },
  ];

  const workstationModules = [
    {
      id: "caption-review" as WorkstationPage,
      title: "Caption Review Studio",
      badge: "5A Grounding",
      desc: "Natural multimodal captions paired with overhead imagery, evidence patches, and 5-point review rubric.",
      icon: ListChecks,
      accent: "text-sky-400",
      bgHover: "hover:border-sky-400/50",
    },
    {
      id: "single-image" as WorkstationPage,
      title: "Single Image Workstation",
      badge: "Canvas + Radiometry",
      desc: "High-resolution ortho viewer, pan/zoom reticles, multi-spectral band pipelines, and atomic claim inspections.",
      icon: Compass,
      accent: "text-emerald-400",
      bgHover: "hover:border-emerald-400/50",
    },
    {
      id: "scene-graph" as WorkstationPage,
      title: "Spatial Scene Graph",
      badge: "Topological Reasoning",
      desc: "Directed relational assertions (adjacent_to, surrounded_by, mounted_on) with sparse topological density metrics.",
      icon: GitBranch,
      accent: "text-purple-400",
      bgHover: "hover:border-purple-400/50",
    },
    {
      id: "temporal-compare" as WorkstationPage,
      title: "Temporal Comparison",
      badge: "Before / After Slider",
      desc: "Interactive before/after split slider, seasonal timeline markers, and automated canopy & construction change detection.",
      icon: SplitSquareVertical,
      accent: "text-amber-400",
      bgHover: "hover:border-amber-400/50",
    },
    {
      id: "history" as WorkstationPage,
      title: "Analysis History",
      badge: "STAC Telemetry",
      desc: "Audit trail of executed inferences, latency profiles, confidence calibration, and exportable JSON summaries.",
      icon: Clock,
      accent: "text-sky-300",
      bgHover: "hover:border-sky-300/50",
    },
    {
      id: "experiments" as WorkstationPage,
      title: "Experiments & Benchmarks",
      badge: "CLIP vs Adapted",
      desc: "Comparative evaluation of Zero-Shot CLIP vs Domain-Adapted RemoteCLIP across BLEU, ROUGE, and CIDEr metrics.",
      icon: FlaskConical,
      accent: "text-rose-400",
      bgHover: "hover:border-rose-400/50",
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      setActivePage("caption-review");
      return;
    }
    // Match against fixtures
    const match = SAMPLE_CAPTION_REVIEW_FIXTURES.find(
      (f) =>
        f.filename.toLowerCase().includes(q) ||
        f.image_id.toLowerCase().includes(q) ||
        f.candidates.some((c) => c.caption_text.toLowerCase().includes(q))
    );
    if (match) {
      openImageInWorkstation(match.image_src, match.filename);
    } else {
      setActivePage("caption-review");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#010307] text-slate-100 font-sans overflow-x-hidden selection:bg-sky-500/30 selection:text-sky-200">
      {/* =========================================================================
          SECTION 1: MASTER COSMIC HERO VIEWPORT (Stitch Landing Specification)
      ========================================================================= */}
      <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden star-bg">
        {/* Deep Space Ambient Gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#010206] via-transparent to-transparent opacity-90 z-0" />

        {/* Top Flight Telemetry & Navigation Bar */}
        <header className="relative z-30 w-full px-5 py-4 border-b border-white/5 glass-hud">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            {/* Animated Vector Radar Reticle Logo & Model Status */}
            <div className="flex items-center gap-3">
              <RadarReticleLogo size={36} showSweep={true} />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold tracking-tight text-white text-sm">SatelliteSense</span>
                  <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-mono rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold">
                    v2.4-EO REASONING
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono tracking-tight">
                  Earth Observation Reasoning & Multimodal Captioning
                </span>
              </div>
            </div>

            {/* Live Sensor Flight Telemetry HUD */}
            <div className="hidden xl:flex items-center gap-6 px-4 py-1.5 rounded-full bg-black/40 border border-white/5 font-mono text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-slate-400">CRS:</span>
                <span className="text-sky-300 font-semibold">WGS 84 / UTM 31N</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">ORBIT:</span>
                <span className="text-emerald-300">SSO (705 KM)</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">GSD:</span>
                <span className="text-amber-300">0.31m NADIR</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">SPECTRAL:</span>
                <span className="text-sky-400">13 BANDS (VNIR/SWIR)</span>
              </div>
            </div>

            {/* Navigation & Action Links */}
            <div className="flex items-center gap-3">
              <a href="#features-specs" className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded transition font-medium">
                Capabilities
              </a>
              <a href="#workstations-directory" className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded transition font-medium">
                Workstations
              </a>
              <button
                onClick={() => setActivePage("caption-review")}
                className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.7)] hover:bg-sky-400"
              >
                <span>DEMO WORKSTATION</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Sputnik Orbital Satellite Object (Upper Right) */}
        <div className="absolute right-[6%] md:right-[10%] top-[11%] md:top-[14%] z-20 pointer-events-none select-none animate-satellite-drift">
          <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
            <svg
              className="w-full h-full drop-shadow-[0_0_12px_rgba(224,242,254,0.4)]"
              fill="none"
              viewBox="0 0 160 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient cx="42%" cy="38%" id="satelliteHull" r="58%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#cbd5e1" />
                  <stop offset="60%" stopColor="#475569" />
                  <stop offset="90%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </radialGradient>
                <linearGradient id="antennaSheen" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#94a3b8" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#334155" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <line stroke="url(#antennaSheen)" strokeLinecap="round" strokeWidth="1.3" x1="72" x2="12" y1="78" y2="28" />
              <line stroke="url(#antennaSheen)" strokeLinecap="round" strokeWidth="1.1" x1="76" x2="28" y1="84" y2="46" />
              <line stroke="url(#antennaSheen)" strokeLinecap="round" strokeWidth="1.4" x1="79" x2="48" y1="92" y2="148" />
              <line stroke="url(#antennaSheen)" strokeLinecap="round" strokeWidth="1.1" x1="84" x2="72" y1="96" y2="152" />
              <circle cx="85" cy="82" fill="url(#satelliteHull)" r="21" />
              <ellipse cx="82" cy="80" fill="none" rx="19" ry="19" stroke="rgba(186, 230, 253, 0.45)" strokeWidth="0.8" />
              <circle cx="77" cy="74" fill="#ffffff" filter="drop-shadow(0 0 4px #ffffff)" r="2.8" />
              <circle cx="78" cy="75" fill="none" r="5" stroke="rgba(255,255,255,0.7)" strokeWidth="0.5" />
              <circle className="animate-ping" cx="94" cy="92" fill="#38bdf8" r="1.5" style={{ animationDuration: "2.2s" }} />
            </svg>
            <div className="absolute -bottom-6 -left-12 font-mono text-[9px] text-sky-400/80 tracking-widest whitespace-nowrap bg-black/70 px-2 py-0.5 rounded border border-sky-400/20 backdrop-blur-sm hidden sm:block">
              PRN: 04 • NORAD 00002 • 7.42 km/s
            </div>
          </div>
        </div>

        {/* Central Title & Reasoning Badge */}
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pt-8 pb-12">
          {/* Core Title */}
          <h1 className="hero-title-glow text-5xl sm:text-6xl md:text-7xl lg:text-[96px] font-extrabold tracking-tight select-none mb-4 leading-none">
            SatelliteSense
          </h1>

          {/* Reasoning Badge */}
          <div className="badge-backdrop border border-white/20 px-6 sm:px-8 py-2 sm:py-2.5 rounded-none sm:rounded-sm transition-all duration-300 mb-6">
            <p className="text-white text-xs sm:text-sm md:text-base font-semibold tracking-wide sm:tracking-wider uppercase">
              Reasoning-Guided Satellite Image Intelligence
            </p>
          </div>

          {/* Earth Telemetry View Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/70 border border-sky-500/30 font-mono text-[11px] mb-6 z-30 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <button
              type="button"
              onClick={() => setHeroGlobeMode("vector-globe")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                heroGlobeMode === "vector-globe"
                  ? "bg-sky-500/20 text-sky-300 border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)] font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
              <span>3D HOLOGRAPHIC VECTOR GLOBE</span>
            </button>
            <button
              type="button"
              onClick={() => setHeroGlobeMode("horizon-limb")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                heroGlobeMode === "horizon-limb"
                  ? "bg-sky-500/20 text-sky-300 border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)] font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>DEEP SPACE HORIZON LIMB</span>
            </button>
          </div>

          {/* Hero Visual Display: Mode 1 = Interactive 3D Vector Globe */}
          {heroGlobeMode === "vector-globe" && (
            <div className="relative flex flex-col items-center justify-center my-2 animate-fadeIn z-20">
              <VectorGlobe size={420} className="drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]" />
            </div>
          )}

          {/* Action Cluster & Mission Capabilities */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 z-30">
            <button
              onClick={() => setActivePage("caption-review")}
              className="group relative px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-widest shadow-[0_0_35px_rgba(56,189,248,0.5)] transition-all duration-200 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>Launch Explorer [W]</span>
            </button>

            <a
              href="#interactive-suite"
              className="px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 font-mono text-xs tracking-wider transition-all duration-200 flex items-center gap-2 backdrop-blur-md"
            >
              <Layers className="w-4 h-4 text-sky-400" />
              <span>13-Band Radiometric Engine</span>
            </a>
          </div>

          {/* Downward Prompt */}
          <a
            href="#satellite-drawer"
            className="mt-6 inline-flex flex-col items-center text-slate-400 hover:text-sky-300 transition-colors group"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase mb-1">
              Explore Earth Telemetry & Quick AOI Search
            </span>
            <ChevronDown className="w-4 h-4 text-sky-400 animate-bounce" />
          </a>
        </main>

        {/* Hero Visual Display: Mode 2 = Rich Vector Horizon Earth Limb */}
        {heroGlobeMode === "horizon-limb" && (
          <div className="absolute inset-x-0 bottom-0 pointer-events-none z-10 overflow-hidden h-[42vh] md:h-[48vh] animate-fadeIn">
            <VectorHorizonEarthLimb className="w-full h-full" />
          </div>
        )}

        {/* Floating Quick Ingestion Banner (Docked over earth atmosphere) */}
        <div className="relative z-30 max-w-5xl mx-auto w-full px-4 mb-4" id="satellite-drawer">
          <div className="glass-hud p-3 sm:p-4 rounded-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-3 border border-sky-400/20">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-8 h-8 rounded bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4 text-sky-300" />
              </div>
              <div className="w-full sm:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AOI, MGRS, or Scene (e.g. stadium, forest)..."
                  className="w-full bg-black/60 border border-white/10 text-xs rounded-md px-3 py-1.5 text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 font-mono"
                />
              </div>
            </form>

            {/* Constellation Selector Chips */}
            <div className="flex items-center flex-wrap gap-2 text-[11px] font-mono w-full md:w-auto justify-end">
              <span className="text-slate-400 text-[10px] uppercase">Constellations:</span>
              {constellations.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setActiveConstellation(c.name);
                    loadSampleScene(c.sampleId);
                  }}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeConstellation === c.name
                      ? "bg-sky-950/80 border border-sky-500/40 text-sky-300 font-semibold"
                      : "bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
                  }`}
                  title={c.desc}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: REASONING CAPABILITIES & ARCHITECTURE (Stitch Design)
      ========================================================================= */}
      <section className="relative z-20 bg-[#02050c] border-t border-white/10 py-20 px-4 reticle-grid" id="features-specs">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-xs uppercase tracking-wider mb-4">
              <span>Multimodal EO-VQA & Grounding</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Not Generic Vision. Specifically Engineered for Remote Sensing.
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              Standard LLMs fail on overhead Nadir imagery, radiometric bands, and multi-temporal signatures. SatelliteSense injects domain-adapted spatial coordinate tokens, GSD calibration, and zero-shot geospatial reasoning.
            </p>
          </div>

          {/* Feature Grid Cards with Custom Animated Vector Visualizations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: 13-Band Multi-Spectral Prism */}
            <div className="glass-hud p-5 rounded-xl border border-white/10 hover:border-sky-400/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <SpectralPrismVector className="mb-4" />
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-sky-300 transition-colors">
                  13-Band Radiometric Analysis
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Directly ingests SWIR-1, SWIR-2, RedEdge, and NIR reflectance bands to reason over moisture stress, mineral composition, and canopy vitality beyond RGB limitations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-sky-300">
                • NDVI / NDWI / NBR Native Inference
              </div>
            </div>

            {/* Card 2: Precision Grounding Reticle */}
            <div className="glass-hud p-5 rounded-xl border border-white/10 hover:border-sky-400/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <GroundingReticleVector className="mb-4" />
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-sky-300 transition-colors">
                  Token-to-Pixel Grounding
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Outputs continuous bounding polygons with calibrated pixel coordinates. Every atomic statement maps directly to georeferenced visual evidence patches.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-sky-300">
                • Sub-pixel IoU Calibration &lt;0.2m
              </div>
            </div>

            {/* Card 3: SAR Cloud-Penetrating Radar */}
            <div className="glass-hud p-5 rounded-xl border border-white/10 hover:border-emerald-400/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <SarRadarVector className="mb-4" />
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-emerald-300 transition-colors">
                  SAR & All-Weather Sensing
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Interprets Sentinel-1 VV/VH backscatter amplitude & phase coherence to penetrate cloud cover, detect vessel signatures, and delineate flood transitions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-emerald-300">
                • Polarimetric Pauli / Cloude-Pottier
              </div>
            </div>

            {/* Card 4: Topological Scene Knowledge Graph */}
            <div className="glass-hud p-5 rounded-xl border border-white/10 hover:border-purple-400/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <SceneGraphVector className="mb-4" />
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-purple-300 transition-colors">
                  Claim-Verified Scene Graphs
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Constructs formal hierarchical topological assertions ("Athletic court surrounded by residential housing and dense tree canopy") with traceable uncertainty metrics.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-purple-300">
                • 98.4% Hallucination Elimination
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INTERACTIVE INFERENCE SANDBOX PREVIEW (Stitch Design)
      ========================================================================= */}
      <section className="relative z-20 bg-[#01040a] py-20 px-4 border-t border-white/5" id="interactive-suite">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
            <div>
              <span className="text-sky-400 font-mono text-xs uppercase tracking-widest">
                Interactive Inference Sandbox
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Satellite Image Captioning & Grounding Suite
              </h3>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
                Scene: Subic Bay / Stadium Complex
              </span>
              <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                GSD: 0.31m NADIR
              </span>
            </div>
          </div>

          {/* Sandbox Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Imagery Raster Canvas */}
            <div className="lg:col-span-7 glass-hud rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">
              {/* Raster Header */}
              <div className="bg-black/80 px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>RASTER_VIEWPORT: STADIUM_PLAYGROUND_01.JPG</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span>Bands: B04 (Red), B03 (Green), B02 (Blue), B08 (NIR)</span>
                </div>
              </div>

              {/* Overhead Satellite View with Grounding Overlays */}
              <div className="relative aspect-video w-full bg-[#081b29] overflow-hidden flex items-center justify-center">
                <img
                  src="/images/stadium_playground.jpg"
                  alt="Overhead Satellite Imagery"
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    selectedBandMode === "nir"
                      ? "sepia hue-rotate-180 brightness-110 contrast-125"
                      : selectedBandMode === "ndvi"
                      ? "hue-rotate-90 saturate-200 contrast-125"
                      : "contrast-105"
                  }`}
                />

                {/* Animated Laser Scanning Beam */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-laser-scan pointer-events-none z-10" />

                {/* Grid Scan Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

                {/* Grounding Bounding Box 1: Oval Athletic Field */}
                <div
                  onClick={() => setActiveSandboxStep(1)}
                  className={`absolute left-[33%] top-[27%] w-[30%] h-[42%] border-2 transition-all duration-200 cursor-pointer ${
                    activeSandboxStep === 1
                      ? "border-sky-400 bg-sky-500/25 shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                      : "border-sky-400/60 bg-sky-500/10 hover:bg-sky-500/20"
                  }`}
                >
                  <div className="absolute -top-6 left-0 bg-sky-500 text-slate-950 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                    OBJ_01: OVAL ATHLETIC COURT (95.2%)
                  </div>
                  {/* Corner Reticles */}
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white" />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white" />
                </div>

                {/* Grounding Bounding Box 2: White Residential Buildings */}
                <div
                  onClick={() => setActiveSandboxStep(2)}
                  className={`absolute left-[3%] top-[2%] w-[48%] h-[22%] border-2 transition-all duration-200 cursor-pointer ${
                    activeSandboxStep === 2
                      ? "border-amber-400 bg-amber-500/25 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                      : "border-amber-400/60 bg-amber-500/10 hover:bg-amber-500/20"
                  }`}
                >
                  <div className="absolute -top-6 left-0 bg-amber-500 text-slate-950 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                    OBJ_02: RESIDENTIAL HOUSING (88.4%)
                  </div>
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-300" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-300" />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-300" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-300" />
                </div>

                {/* Grounding Bounding Box 3: Surrounding Green Trees */}
                <div
                  onClick={() => setActiveSandboxStep(3)}
                  className={`absolute left-[63%] top-[22%] w-[30%] h-[58%] border-2 transition-all duration-200 cursor-pointer ${
                    activeSandboxStep === 3
                      ? "border-emerald-400 bg-emerald-500/25 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                      : "border-emerald-400/60 bg-emerald-500/10 hover:bg-emerald-500/20"
                  }`}
                >
                  <div className="absolute -top-6 left-0 bg-emerald-500 text-slate-950 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                    OBJ_03: DENSE CANOPY (92.1%)
                  </div>
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-300" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-300" />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-300" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-300" />
                </div>

                {/* Coordinate Readout */}
                <div className="absolute bottom-3 right-3 font-mono text-[10px] text-right text-slate-300 bg-black/70 px-2.5 py-1.5 rounded border border-white/10 backdrop-blur-sm pointer-events-none">
                  <div>LAT: 14°48'36" N • LON: 120°16'18" E</div>
                  <div className="text-sky-300">PROJECTION: WGS 84 / UTM 51N</div>
                </div>
              </div>

              {/* Band Control Toolbar */}
              <div className="bg-black/90 p-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedBandMode("rgb")}
                    className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors ${
                      selectedBandMode === "rgb"
                        ? "bg-sky-500 text-slate-950 font-bold"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    RGB True Color
                  </button>
                  <button
                    onClick={() => setSelectedBandMode("nir")}
                    className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors ${
                      selectedBandMode === "nir"
                        ? "bg-sky-500 text-slate-950 font-bold"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    False Color Infrared (CIR)
                  </button>
                  <button
                    onClick={() => setSelectedBandMode("ndvi")}
                    className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors ${
                      selectedBandMode === "ndvi"
                        ? "bg-sky-500 text-slate-950 font-bold"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    NDVI Canopy Index
                  </button>
                </div>
                <span className="text-slate-400 font-mono text-[10px]">Cloud Occlusion: &lt;0.02%</span>
              </div>
            </div>

            {/* Right: Real-Time Reasoning Chain */}
            <div className="lg:col-span-5 glass-hud rounded-xl p-5 border border-white/10 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky-500" />
                    <span className="font-bold text-white text-xs uppercase tracking-wider">
                      SatelliteSense EO-VQA Agent
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    REASONING ACTIVE
                  </span>
                </div>

                {/* Prompt Query */}
                <div className="mt-4 p-3 rounded-lg bg-black/50 border border-white/5 font-mono text-xs">
                  <span className="text-sky-400 font-semibold">EO_QUERY:</span>
                  <p className="text-slate-200 mt-1">
                    "Identify sports facilities, classify adjoining vegetation boundary, and verify surrounding structure morphology."
                  </p>
                </div>

                {/* Chain of Thought Steps */}
                <div className="mt-4 space-y-2.5 font-mono text-[11px]">
                  <div
                    onClick={() => setActiveSandboxStep(1)}
                    className={`p-2.5 rounded transition-all cursor-pointer border-l-2 ${
                      activeSandboxStep === 1
                        ? "bg-sky-950/40 border-sky-400 text-white shadow-sm"
                        : "bg-sky-950/20 border-sky-400/50 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-sky-300 font-bold block mb-1">
                      Step 1: Central Athletic Court Grounding
                    </span>
                    Bounding box calibration confirms 300m × 420m oval athletic stadium structure with red rubberized track geometry.
                  </div>

                  <div
                    onClick={() => setActiveSandboxStep(2)}
                    className={`p-2.5 rounded transition-all cursor-pointer border-l-2 ${
                      activeSandboxStep === 2
                        ? "bg-amber-950/40 border-amber-400 text-white shadow-sm"
                        : "bg-amber-950/20 border-amber-400/50 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-amber-300 font-bold block mb-1">
                      Step 2: Residential Housing Perimeter
                    </span>
                    High-albedo white roof structures along northern perimeter indicate low-density residential settlement.
                  </div>

                  <div
                    onClick={() => setActiveSandboxStep(3)}
                    className={`p-2.5 rounded transition-all cursor-pointer border-l-2 ${
                      activeSandboxStep === 3
                        ? "bg-emerald-950/40 border-emerald-400 text-white shadow-sm"
                        : "bg-emerald-950/20 border-emerald-400/50 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-emerald-300 font-bold block mb-1">
                      Step 3: Multi-spectral Canopy Differentiation
                    </span>
                    NIR reflectance confirmed dense chlorophyll response (NDVI &gt; 0.68) spanning eastern flank.
                  </div>
                </div>

                {/* Synthesized Caption */}
                <div className="mt-5 p-3.5 rounded-lg bg-sky-500/10 border border-sky-400/30">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold mb-1">
                    Synthesized Grounded Caption:
                  </div>
                  <p className="text-xs text-white leading-relaxed font-sans">
                    "A playground with basketball fields next to it is surrounded by many green trees and buildings."
                  </p>
                </div>
              </div>

              {/* Sandbox CTAs */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActivePage("caption-review")}
                  className="flex-1 py-2.5 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                >
                  <span>Open In Workstation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActivePage("scene-graph")}
                  className="px-3 py-2.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 font-mono text-xs transition-colors"
                >
                  View Scene Graph
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: WORKSTATIONS SUITE DIRECTORY (Direct Entry into Existing Work)
      ========================================================================= */}
      <section className="relative z-20 bg-[#02050c] py-20 px-4 border-t border-white/10" id="workstations-directory">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-xs uppercase tracking-wider mb-2">
                <span>Integrated Workstation Suite</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Specialized Geospatial Analytical Workspaces
              </h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md">
              Each module provides high-density specialized tooling for claim verification, multi-spectral inspection, topological graphs, and temporal change detection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workstationModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  onClick={() => setActivePage(mod.id)}
                  className={`glass-hud p-6 rounded-xl border border-white/10 ${mod.bgHover} transition-all duration-300 cursor-pointer group flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        <Icon className={`w-5 h-5 ${mod.accent}`} />
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                        {mod.badge}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-base mb-2 group-hover:text-sky-300 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{mod.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 group-hover:text-slate-200 transition-colors">
                      Enter Module
                    </span>
                    <ArrowRight className="w-4 h-4 text-sky-400 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FOOTER & CITATION TELEMETRY
      ========================================================================= */}
      <footer className="relative z-20 bg-[#010206] py-12 px-4 border-t border-white/5 font-mono text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <RadarReticleLogo size={28} showSweep={false} />
            <div>
              <span className="text-white font-bold tracking-tight">SatelliteSense</span>
              <span className="text-slate-500 ml-2">v2.4-EO • OpenCLIP-ViT/B16</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <span>STAC v1.0.0 COMPLIANT</span>
            <span>•</span>
            <span>EPSG:4326 / UTM ZONES</span>
            <span>•</span>
            <span className="text-sky-400">HOTKEY: PRESS [W] TO LAUNCH WORKSTATION</span>
          </div>

          <button
            onClick={() => setActivePage("caption-review")}
            className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors"
          >
            Launch Workstation →
          </button>
        </div>
      </footer>
    </div>
  );
};
