import React from "react";

// =========================================================================
// 1. SPECTRAL PRISM VECTOR: Animated 13-Band Multi-Spectral Dispersion
// =========================================================================
export const SpectralPrismVector: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-44 flex items-center justify-center overflow-hidden rounded-lg bg-[#020712] border border-sky-500/20 ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 340 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glass prism gradient */}
          <linearGradient id="prismFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.3" />
          </linearGradient>

          {/* Incoming solar beam */}
          <linearGradient id="solarRay" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>

          {/* Band gradients */}
          <linearGradient id="bandBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="bandGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="bandRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f87171" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="bandNIR" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="bandSWIR" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Ambient Grid Lines */}
        <line x1="20" y1="80" x2="320" y2="80" stroke="rgba(56,189,248,0.1)" strokeDasharray="3 3" />
        <line x1="150" y1="20" x2="150" y2="140" stroke="rgba(56,189,248,0.1)" strokeDasharray="3 3" />

        {/* Incoming Solar Radiation (White Beam) */}
        <line x1="15" y1="88" x2="135" y2="76" stroke="url(#solarRay)" strokeWidth="3" strokeLinecap="round" />
        {/* Animated photon pulse on incoming beam */}
        <circle cx="75" cy="82" r="3" fill="#ffffff" filter="drop-shadow(0 0 6px #ffffff)">
          <animate attributeName="cx" values="15;135" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="cy" values="88;76" dur="1.6s" repeatCount="indefinite" />
        </circle>

        {/* Dispersive Optical Prism Facet (Triangle) */}
        <polygon
          points="145,28 195,128 95,128"
          fill="url(#prismFace)"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]"
        />
        {/* Internal refraction facet */}
        <polygon
          points="145,28 178,128 112,128"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.8"
        />

        {/* Refracted Internal Rays */}
        <line x1="135" y1="76" x2="160" y2="68" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" />
        <line x1="135" y1="76" x2="168" y2="92" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />

        {/* Emergent Dispersed Spectral Bands */}
        {/* Band 1: Coastal/Blue B02 (490nm) */}
        <path d="M160,68 L320,38" stroke="url(#bandBlue)" strokeWidth="2.2" strokeLinecap="round" />
        <text x="325" y="41" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="600">B02: 490nm</text>

        {/* Band 2: Green B03 (560nm) */}
        <path d="M162,73 L320,56" stroke="url(#bandGreen)" strokeWidth="2.2" strokeLinecap="round" />
        <text x="325" y="59" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="600">B03: 560nm</text>

        {/* Band 3: Red B04 (665nm) */}
        <path d="M164,79 L320,74" stroke="url(#bandRed)" strokeWidth="2.2" strokeLinecap="round" />
        <text x="325" y="77" fill="#f87171" fontSize="8" fontFamily="monospace" fontWeight="600">B04: 665nm</text>

        {/* Band 4: NIR B08 (842nm) */}
        <path d="M166,85 L320,94" stroke="url(#bandNIR)" strokeWidth="2.2" strokeLinecap="round" />
        <text x="325" y="97" fill="#c084fc" fontSize="8" fontFamily="monospace" fontWeight="600">B08: 842nm</text>

        {/* Band 5: SWIR-1 B11 (1610nm) */}
        <path d="M168,92 L320,114" stroke="url(#bandSWIR)" strokeWidth="2.2" strokeLinecap="round" />
        <text x="325" y="117" fill="#fbbf24" fontSize="8" fontFamily="monospace" fontWeight="600">B11: 1610nm</text>

        {/* Animated Emergent Photons */}
        <circle cx="240" cy="53" r="2.2" fill="#38bdf8" filter="drop-shadow(0 0 4px #38bdf8)">
          <animate attributeName="cx" values="160;320" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="cy" values="68;38" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="240" cy="85" r="2.2" fill="#c084fc" filter="drop-shadow(0 0 4px #c084fc)">
          <animate attributeName="cx" values="166;320" dur="2.1s" repeatCount="indefinite" />
          <animate attributeName="cy" values="85;94" dur="2.1s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

// =========================================================================
// 2. GROUNDING RETICLE VECTOR: Animated Precision Spatial Target Alignment
// =========================================================================
export const GroundingReticleVector: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-44 flex items-center justify-center overflow-hidden rounded-lg bg-[#020712] border border-sky-500/20 ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 340 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="targetCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#0284c7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Grid Background */}
        <g stroke="rgba(56,189,248,0.08)" strokeWidth="0.8">
          <line x1="40" y1="20" x2="40" y2="140" />
          <line x1="90" y1="20" x2="90" y2="140" />
          <line x1="140" y1="20" x2="140" y2="140" />
          <line x1="200" y1="20" x2="200" y2="140" />
          <line x1="250" y1="20" x2="250" y2="140" />
          <line x1="300" y1="20" x2="300" y2="140" />
          <line x1="20" y1="40" x2="320" y2="40" />
          <line x1="20" y1="80" x2="320" y2="80" />
          <line x1="20" y1="120" x2="320" y2="120" />
        </g>

        {/* Rotating Outer Dial with Compass Ticks */}
        <g className="animate-radar-spin origin-center" style={{ transformOrigin: "170px 80px", animationDuration: "16s" }}>
          <circle cx="170" cy="80" r="54" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 6" />
          <circle cx="170" cy="80" r="46" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.4" />
          {/* Compass Ticks */}
          <line x1="170" y1="24" x2="170" y2="30" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="170" y1="130" x2="170" y2="136" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="114" y1="80" x2="120" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="220" y1="80" x2="226" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
        </g>

        {/* Counter-rotating Middle Dial */}
        <g className="animate-radar-spin origin-center" style={{ transformOrigin: "170px 80px", animationDirection: "reverse", animationDuration: "10s" }}>
          <circle cx="170" cy="80" r="34" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="8 8" />
        </g>

        {/* Center Target Core Glow */}
        <circle cx="170" cy="80" r="24" fill="url(#targetCore)" />

        {/* Crosshair Lines */}
        <line x1="135" y1="80" x2="158" y2="80" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="182" y1="80" x2="205" y2="80" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="170" y1="45" x2="170" y2="68" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="170" y1="92" x2="170" y2="115" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />

        {/* Center Sub-Pixel Dot */}
        <circle cx="170" cy="80" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 4px #38bdf8)" />

        {/* 4 Pulsing Precision Locking Corner Brackets */}
        <g stroke="#38bdf8" strokeWidth="2" strokeLinecap="round">
          {/* Top-Left */}
          <path d="M142,58 L142,52 L148,52" />
          {/* Top-Right */}
          <path d="M198,58 L198,52 L192,52" />
          {/* Bottom-Left */}
          <path d="M142,102 L142,108 L148,108" />
          {/* Bottom-Right */}
          <path d="M198,102 L198,108 L192,108" />
        </g>

        {/* Telemetry Annotation Badges */}
        <g fontFamily="monospace" fontSize="9">
          <rect x="22" y="24" width="94" height="20" rx="3" fill="#0b172a" stroke="rgba(56,189,248,0.3)" />
          <text x="28" y="37" fill="#38bdf8" fontWeight="600">CAL: 0.18m/px</text>

          <rect x="224" y="24" width="94" height="20" rx="3" fill="#0b172a" stroke="rgba(56,189,248,0.3)" />
          <text x="230" y="37" fill="#34d399" fontWeight="600">IoU: 0.942 LOCK</text>

          <rect x="22" y="116" width="94" height="20" rx="3" fill="#0b172a" stroke="rgba(56,189,248,0.3)" />
          <text x="28" y="129" fill="#94a3b8">LAT: 14°48'36"N</text>

          <rect x="224" y="116" width="94" height="20" rx="3" fill="#0b172a" stroke="rgba(56,189,248,0.3)" />
          <text x="230" y="129" fill="#94a3b8">LON: 120°16'18"E</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 3. SAR WAVE VECTOR: Animated Synthetic Aperture Cloud-Penetrating Radar
// =========================================================================
export const SarRadarVector: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-44 flex items-center justify-center overflow-hidden rounded-lg bg-[#020712] border border-emerald-500/20 ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 340 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cloudLayer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#64748b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#475569" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="groundBed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#064e3b" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#059669" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Satellite Radar Transceiver (Top Center) */}
        <g transform="translate(148, 10)">
          {/* Phased Array Panel */}
          <rect x="0" y="0" width="44" height="8" rx="2" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" />
          {/* Feed horn */}
          <polygon points="17,8 27,8 24,14 20,14" fill="#34d399" />
          {/* Solar Wing Left */}
          <rect x="-24" y="1" width="20" height="6" rx="1" fill="#0369a1" stroke="#38bdf8" strokeWidth="0.8" />
          {/* Solar Wing Right */}
          <rect x="48" y="1" width="20" height="6" rx="1" fill="#0369a1" stroke="#38bdf8" strokeWidth="0.8" />
          {/* Telemetry beacon */}
          <circle cx="22" cy="4" r="1.5" fill="#10b981" className="animate-ping" />
        </g>

        {/* Emitted Microwave Pulse Wavefronts (Propagating Down) */}
        <g stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.75">
          {/* Wave 1 */}
          <path d="M140,32 Q170,44 200,32" strokeDasharray="3 3">
            <animate attributeName="d" values="M150,22 Q170,30 190,22; M120,60 Q170,82 220,60; M90,110 Q170,140 250,110" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.9;0.5;0" dur="2.4s" repeatCount="indefinite" />
          </path>
          {/* Wave 2 */}
          <path d="M130,48 Q170,64 210,48" strokeDasharray="3 3">
            <animate attributeName="d" values="M150,22 Q170,30 190,22; M120,60 Q170,82 220,60; M90,110 Q170,140 250,110" begin="0.8s" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.9;0.5;0" begin="0.8s" dur="2.4s" repeatCount="indefinite" />
          </path>
          {/* Wave 3 */}
          <path d="M120,64 Q170,82 220,64" strokeDasharray="3 3">
            <animate attributeName="d" values="M150,22 Q170,30 190,22; M120,60 Q170,82 220,60; M90,110 Q170,140 250,110" begin="1.6s" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.9;0.5;0" begin="1.6s" dur="2.4s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Dense Cloud Occlusion Layer (which Optical vision cannot penetrate) */}
        <g>
          {/* Cloud silhouettes */}
          <path
            d="M40,68 Q60,54 85,62 Q110,48 140,58 Q165,50 195,60 Q225,52 255,62 Q280,56 300,68 L300,76 L40,76 Z"
            fill="url(#cloudLayer)"
          />
          <text x="50" y="70" fill="#94a3b8" fontSize="8" fontFamily="monospace">CLOUD OCCLUSION (100% OPTICAL BLINDNESS)</text>
        </g>

        {/* Ground Relief & Backscatter Reflectors */}
        <polygon points="20,135 70,125 120,132 170,120 220,128 270,122 320,135 320,155 20,155" fill="url(#groundBed)" stroke="#059669" strokeWidth="1" />

        {/* Reflected Backscatter Wavevectors (Returning back up to antenna) */}
        <g stroke="#34d399" strokeWidth="1.2">
          {/* Return 1 (Double bounce) */}
          <line x1="170" y1="120" x2="162" y2="22" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" values="30;0" dur="1.2s" repeatCount="indefinite" />
          </line>
          {/* Return 2 (Volume scattering) */}
          <line x1="220" y1="128" x2="178" y2="22" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" values="30;0" dur="1.4s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Status Callout */}
        <g fontFamily="monospace" fontSize="9">
          <rect x="22" y="24" width="88" height="20" rx="3" fill="#0b172a" stroke="rgba(16,185,129,0.3)" />
          <text x="28" y="37" fill="#34d399" fontWeight="600">C-BAND 5.4GHz</text>

          <rect x="230" y="24" width="88" height="20" rx="3" fill="#0b172a" stroke="rgba(16,185,129,0.3)" />
          <text x="236" y="37" fill="#6ee7b7" fontWeight="600">POL: VV + VH</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 4. SCENE GRAPH VECTOR: Animated Topological Spatial Knowledge Graph
// =========================================================================
export const SceneGraphVector: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-44 flex items-center justify-center overflow-hidden rounded-lg bg-[#020712] border border-purple-500/20 ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 340 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="edgePurple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Directed Edges Between Nodes */}
        {/* Edge 1: Central Court -> Canopy */}
        <path d="M150,75 C180,50 200,45 235,45" stroke="#a855f7" strokeWidth="1.6" strokeDasharray="3 3" />
        {/* Edge 2: Central Court -> Residential */}
        <path d="M150,85 C180,105 200,115 235,115" stroke="#a855f7" strokeWidth="1.6" strokeDasharray="3 3" />
        {/* Edge 3: Left Ingestion -> Central Court */}
        <path d="M85,80 L125,80" stroke="#a855f7" strokeWidth="1.6" />

        {/* Animated Packets Moving Along Edges */}
        <circle cx="150" cy="75" r="3" fill="#e879f9" filter="drop-shadow(0 0 4px #e879f9)">
          <animate attributeName="cx" values="150;235" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="cy" values="75;45" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="85" r="3" fill="#e879f9" filter="drop-shadow(0 0 4px #e879f9)">
          <animate attributeName="cx" values="150;235" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="85;115" dur="2.2s" repeatCount="indefinite" />
        </circle>

        {/* Relationship Predicate Badges */}
        <g fontFamily="monospace" fontSize="8" fill="#e9d5ff">
          <rect x="165" y="44" width="62" height="13" rx="2" fill="#3b0764" stroke="#a855f7" strokeWidth="0.8" />
          <text x="170" y="53">adjacent_to</text>

          <rect x="165" y="103" width="66" height="13" rx="2" fill="#3b0764" stroke="#a855f7" strokeWidth="0.8" />
          <text x="170" y="112">surrounded_by</text>
        </g>

        {/* Node 1: Scene Root (Left) */}
        <g transform="translate(35, 66)">
          <rect x="0" y="0" width="55" height="28" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.4" />
          <text x="8" y="17" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">SCENE</text>
          <circle cx="48" cy="14" r="3" fill="#6366f1" />
        </g>

        {/* Node 2: Central Subject (Court) */}
        <g transform="translate(118, 62)">
          <rect x="0" y="0" width="62" height="36" rx="4" fill="#3b0764" stroke="#c084fc" strokeWidth="1.6" className="drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]" />
          <text x="8" y="18" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">COURT</text>
          <text x="8" y="28" fill="#d8b4fe" fontSize="7" fontFamily="monospace">OBJ_01 (95%)</text>
        </g>

        {/* Node 3: Target A (Dense Canopy) */}
        <g transform="translate(235, 28)">
          <rect x="0" y="0" width="72" height="34" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1.4" />
          <text x="8" y="16" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">CANOPY</text>
          <text x="8" y="26" fill="#6ee7b7" fontSize="7" fontFamily="monospace">VEG_03 (92%)</text>
        </g>

        {/* Node 4: Target B (Settlement) */}
        <g transform="translate(235, 98)">
          <rect x="0" y="0" width="76" height="34" rx="4" fill="#451a03" stroke="#fbbf24" strokeWidth="1.4" />
          <text x="8" y="16" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">HOUSING</text>
          <text x="8" y="26" fill="#fde68a" fontSize="7" fontFamily="monospace">BLDG_02 (88%)</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 5. VECTOR HORIZON EARTH LIMB: Rich Vector Planetary Curve with Continents & Cities
// =========================================================================
export const VectorHorizonEarthLimb: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full pointer-events-none select-none overflow-hidden ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep Earth Core Gradient */}
          <radialGradient id="earthCoreLimb" cx="50%" cy="130%" r="90%">
            <stop offset="0%" stopColor="#082f49" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#031a30" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#020d1c" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#01040a" stopOpacity="1" />
          </radialGradient>

          {/* Atmospheric Airglow Rim Glow */}
          <linearGradient id="airglowRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.2" />
            <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#bae6fd" stopOpacity="1" />
            <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
          </linearGradient>

          {/* Diffuse Aurora Haze */}
          <linearGradient id="auroraHaze" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#0284c7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#01040a" stopOpacity="0" />
          </linearGradient>

          {/* Continents glow */}
          <linearGradient id="continentGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Outer Atmospheric Ionosphere Aura */}
        <path
          d="M-200,400 Q720,-30 1640,400 Z"
          fill="url(#auroraHaze)"
        />

        {/* Main Planetary Earth Curvature Body */}
        <path
          d="M-200,400 Q720,20 1640,400 Z"
          fill="url(#earthCoreLimb)"
        />

        {/* Illuminated Atmospheric Airglow Rim Line */}
        <path
          d="M-200,400 Q720,20 1640,400"
          stroke="url(#airglowRim)"
          strokeWidth="3.5"
          className="drop-shadow-[0_0_20px_#38bdf8]"
        />
        <path
          d="M-200,400 Q720,22 1640,400"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeOpacity="0.9"
          className="drop-shadow-[0_0_8px_#ffffff]"
        />

        {/* Curving Latitude Graticules across Planetary Surface */}
        <g stroke="rgba(56,189,248,0.18)" strokeWidth="0.8" fill="none">
          <path d="M-150,400 Q720,65 1590,400" strokeDasharray="6 6" />
          <path d="M-100,400 Q720,115 1540,400" strokeDasharray="6 6" />
          <path d="M-50,400 Q720,175 1490,400" strokeDasharray="6 6" />
          <path d="M0,400 Q720,245 1440,400" strokeDasharray="6 6" />
        </g>

        {/* Curving Longitude Meridians across Planetary Surface */}
        <g stroke="rgba(56,189,248,0.12)" strokeWidth="0.8" fill="none">
          <path d="M220,180 Q320,280 400,400" />
          <path d="M420,105 Q500,240 560,400" />
          <path d="M620,55 Q660,210 700,400" />
          <path d="M820,55 Q780,210 740,400" />
          <path d="M1020,105 Q940,240 880,400" />
          <path d="M1220,180 Q1120,280 1040,400" />
        </g>

        {/* Continental Silhouette Vectors (Landmasses visible on horizon) */}
        {/* Eurasia / Mediterranean Cluster */}
        <path
          d="M320,165 Q370,140 430,135 Q480,145 520,120 Q570,110 610,130 Q630,150 670,145 Q700,165 720,195 Q680,210 610,190 Q540,205 480,180 Q400,190 320,165 Z"
          fill="url(#continentGlow)"
          stroke="rgba(125,211,252,0.45)"
          strokeWidth="1.2"
        />
        {/* Southeast Asia / Pacific Archipelagos */}
        <path
          d="M840,130 Q890,115 940,135 Q980,120 1030,140 Q1060,170 1100,160 Q1140,190 1080,210 Q1010,195 950,215 Q890,180 840,130 Z"
          fill="url(#continentGlow)"
          stroke="rgba(125,211,252,0.45)"
          strokeWidth="1.2"
        />

        {/* Twinkling Night City Light Clusters (Golden fiber points) */}
        <g fill="#fde047" opacity="0.95">
          {/* Western Mega-Cluster */}
          <circle cx="410" cy="155" r="2" filter="drop-shadow(0 0 5px #fde047)" />
          <circle cx="425" cy="160" r="1.5" />
          <circle cx="440" cy="150" r="1.8" filter="drop-shadow(0 0 4px #fde047)" />
          <circle cx="460" cy="165" r="1.3" />
          <circle cx="490" cy="148" r="2.2" filter="drop-shadow(0 0 6px #fde047)" />
          <circle cx="515" cy="158" r="1.4" />
          <circle cx="540" cy="142" r="1.7" />
          <circle cx="570" cy="145" r="2.5" filter="drop-shadow(0 0 8px #fde047)" />
          <circle cx="585" cy="160" r="1.4" />
          <circle cx="620" cy="168" r="1.9" filter="drop-shadow(0 0 5px #fde047)" />

          {/* Eastern Metro Network */}
          <circle cx="890" cy="145" r="2.2" filter="drop-shadow(0 0 6px #fde047)" />
          <circle cx="915" cy="150" r="1.6" />
          <circle cx="940" cy="140" r="2.8" filter="drop-shadow(0 0 8px #fde047)" />
          <circle cx="965" cy="160" r="1.4" />
          <circle cx="995" cy="152" r="2.1" filter="drop-shadow(0 0 5px #fde047)" />
          <circle cx="1030" cy="158" r="1.8" />
          <circle cx="1060" cy="172" r="2" filter="drop-shadow(0 0 6px #fde047)" />
        </g>

        {/* Orbiting Satellite Ground-Track Vector Arcs */}
        <g stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 6" fill="none">
          <path d="M100,240 Q720,-10 1340,240" strokeOpacity="0.45" />
        </g>

        {/* Active Ground Station Uplink Vectors */}
        <g stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 3">
          <line x1="570" y1="145" x2="680" y2="40" strokeOpacity="0.7">
            <animate attributeName="stroke-dashoffset" values="20;0" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="940" y1="140" x2="880" y2="35" strokeOpacity="0.7">
            <animate attributeName="stroke-dashoffset" values="20;0" dur="1.2s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Uplink Ground Station Beacon Markers */}
        <circle cx="570" cy="145" r="3.5" stroke="#38bdf8" strokeWidth="1" fill="#ffffff" />
        <circle cx="940" cy="140" r="3.5" stroke="#38bdf8" strokeWidth="1" fill="#ffffff" />
        <text x="580" y="142" fill="#bae6fd" fontSize="9" fontFamily="monospace">GS: KIRUNA (SWE)</text>
        <text x="950" y="137" fill="#bae6fd" fontSize="9" fontFamily="monospace">GS: SUBIC BAY (PHL)</text>
      </svg>
    </div>
  );
};
