import React from "react";

interface RadarReticleLogoProps {
  className?: string;
  size?: number;
  showSweep?: boolean;
}

export const RadarReticleLogo: React.FC<RadarReticleLogoProps> = ({
  className = "",
  size = 32,
  showSweep = true,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
      >
        <defs>
          {/* Radial radar sweep gradient */}
          <radialGradient id="radarSweepGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>

          {/* Core glow */}
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Hexagonal Shield Ring */}
        <polygon
          points="32,3 58,18 58,46 32,61 6,46 6,18"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeOpacity="0.35"
          fill="rgba(2, 6, 23, 0.6)"
        />

        {/* Concentric Range Rings */}
        <circle cx="32" cy="32" r="24" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="3 3" />
        <circle cx="32" cy="32" r="16" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="32" cy="32" r="8" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.6" />

        {/* Cardinal Crosshair Ticks */}
        <line x1="32" y1="5" x2="32" y2="13" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="51" x2="32" y2="59" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5" y1="32" x2="13" y2="32" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="51" y1="32" x2="59" y2="32" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />

        {/* Corner Precision Aligners */}
        <path d="M18,12 L12,12 L12,18" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M46,12 L52,12 L52,18" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M18,52 L12,52 L12,46" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M46,52 L52,52 L52,46" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />

        {/* Rotating Radar Sweep Cone */}
        {showSweep && (
          <g className="animate-radar-spin origin-center" style={{ transformOrigin: "32px 32px" }}>
            <path
              d="M32,32 L32,8 A24,24 0 0,1 55,24 Z"
              fill="url(#radarSweepGrad)"
            />
            <line x1="32" y1="32" x2="55" y2="24" stroke="#e0f2fe" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        )}

        {/* Central Core Satellite Emitter */}
        <circle cx="32" cy="32" r="5" fill="url(#coreGlow)" />
        <circle cx="32" cy="32" r="2.5" fill="#ffffff" />

        {/* Pulsing Target Beacon Dot (At 2 o'clock) */}
        <circle cx="43" cy="21" r="1.8" fill="#38bdf8" className="animate-ping" style={{ transformOrigin: "43px 21px" }} />
        <circle cx="43" cy="21" r="1.8" fill="#38bdf8" />
      </svg>
    </div>
  );
};
