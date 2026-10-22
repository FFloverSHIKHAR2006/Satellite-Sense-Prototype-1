import React, { useRef, useEffect, useState } from "react";

interface VectorGlobeProps {
  size?: number;
  className?: string;
  onSelectStation?: (stationName: string) => void;
}

// Major simplified continental landmass points [lat, lon] in degrees
const CONTINENT_POLYGONS: [number, number][][] = [
  // North America
  [
    [70, -160], [72, -130], [68, -100], [60, -80], [52, -55], [45, -65],
    [30, -80], [25, -80], [18, -95], [15, -92], [9, -80], [15, -95],
    [22, -105], [32, -117], [38, -123], [48, -125], [58, -137], [60, -145],
    [65, -168], [70, -160]
  ],
  // South America
  [
    [10, -75], [5, -52], [-5, -35], [-15, -38], [-23, -42], [-35, -55],
    [-55, -67], [-52, -75], [-40, -73], [-20, -70], [-5, -80], [8, -77], [10, -75]
  ],
  // Europe
  [
    [71, 28], [60, 30], [55, 20], [54, 10], [50, 2], [43, -9], [37, -9],
    [36, -2], [40, 15], [38, 24], [42, 28], [46, 38], [55, 38], [65, 30], [71, 28]
  ],
  // Africa
  [
    [36, 10], [32, 32], [28, 34], [12, 44], [10, 50], [-5, 40], [-15, 40],
    [-25, 32], [-34, 25], [-34, 18], [-22, 14], [-5, 12], [4, 8], [5, -2],
    [15, -17], [28, -13], [35, -5], [36, 10]
  ],
  // Asia
  [
    [75, 100], [77, 140], [70, 178], [60, 165], [54, 140], [42, 130], [35, 128],
    [30, 122], [22, 114], [10, 105], [1, 104], [15, 96], [22, 90], [8, 77],
    [24, 68], [25, 57], [30, 48], [40, 50], [55, 60], [68, 75], [75, 100]
  ],
  // Australia
  [
    [-12, 132], [-15, 136], [-20, 148], [-28, 153], [-37, 150], [-38, 140],
    [-32, 132], [-35, 117], [-22, 114], [-16, 122], [-12, 132]
  ],
  // Greenland
  [
    [82, -30], [76, -18], [65, -40], [60, -45], [70, -52], [78, -68], [82, -30]
  ]
];

// Active Telemetry Ground Stations
const GROUND_STATIONS = [
  { name: "Svalbard (SKS)", lat: 78.2, lon: 15.6, code: "NOR" },
  { name: "Kiruna (KRN)", lat: 67.8, lon: 20.2, code: "SWE" },
  { name: "Kourou (CSG)", lat: 5.2, lon: -52.8, code: "GUF" },
  { name: "White Sands (WSC)", lat: 32.4, lon: -106.3, code: "USA" },
  { name: "Hartebeesthoek", lat: -25.9, lon: 27.7, code: "ZAF" },
  { name: "Subic Bay (SBA)", lat: 14.8, lon: 120.3, code: "PHL" },
  { name: "Rotherham (UK)", lat: 53.4, lon: -1.3, code: "GBR" },
];

export const VectorGlobe: React.FC<VectorGlobeProps> = ({
  size = 500,
  className = "",
  onSelectStation,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ yaw: 0.4, pitch: 0.28 });
  const [isHovered, setIsHovered] = useState(false);
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  // Animation Loop for automatic rotation when not dragging
  useEffect(() => {
    let animId: number;
    const animate = () => {
      if (!isDraggingRef.current) {
        setRotation((prev) => ({
          yaw: prev.yaw + 0.003,
          pitch: prev.pitch,
        }));
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Main Canvas Rendering Pipeline
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const radius = size * 0.4;
    const cx = size / 2;
    const cy = size / 2;

    ctx.clearRect(0, 0, size, size);

    // 1. Draw Space Radial Atmospheric Rim Glow behind sphere
    const spaceGlow = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.35);
    spaceGlow.addColorStop(0, "rgba(56, 189, 248, 0.22)");
    spaceGlow.addColorStop(0.5, "rgba(14, 165, 233, 0.08)");
    spaceGlow.addColorStop(1, "rgba(2, 6, 23, 0)");
    ctx.fillStyle = spaceGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
    ctx.fill();

    // 2. Draw Sphere Base with deep cosmic blue gradient
    const globeGrad = ctx.createRadialGradient(cx - radius * 0.35, cy - radius * 0.35, radius * 0.1, cx, cy, radius);
    globeGrad.addColorStop(0, "#0e2d59");
    globeGrad.addColorStop(0.4, "#081938");
    globeGrad.addColorStop(0.75, "#040c1d");
    globeGrad.addColorStop(1, "#02050e");

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = globeGrad;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
    ctx.stroke();

    // Clip to globe circle for internal geometry
    ctx.clip();

    // Coordinate projection function
    const project = (latDeg: number, lonDeg: number): { x: number; y: number; z: number; visible: boolean } => {
      const lat = (latDeg * Math.PI) / 180;
      const lon = (lonDeg * Math.PI) / 180 + rotation.yaw;

      // 3D sphere coordinates
      let x = radius * Math.cos(lat) * Math.sin(lon);
      let y = -radius * Math.sin(lat);
      let z = radius * Math.cos(lat) * Math.cos(lon);

      // Apply Pitch (tilt around X-axis)
      const pitch = rotation.pitch;
      const yNew = y * Math.cos(pitch) - z * Math.sin(pitch);
      const zNew = y * Math.sin(pitch) + z * Math.cos(pitch);

      return {
        x: cx + x,
        y: cy + yNew,
        z: zNew,
        visible: zNew > -radius * 0.15,
      };
    };

    // 3. Draw Latitude Parallels (Graticule)
    ctx.lineWidth = 0.75;
    ctx.strokeStyle = "rgba(56, 189, 248, 0.16)";
    const latitudes = [-60, -30, 0, 30, 60];
    latitudes.forEach((lat) => {
      ctx.beginPath();
      let first = true;
      for (let lon = -180; lon <= 180; lon += 5) {
        const p = project(lat, lon);
        if (p.visible) {
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          first = true;
        }
      }
      ctx.stroke();
    });

    // 4. Draw Longitude Meridians
    for (let lon = -180; lon < 180; lon += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -80; lat <= 80; lat += 4) {
        const p = project(lat, lon);
        if (p.visible) {
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          first = true;
        }
      }
      ctx.stroke();
    }

    // 5. Draw Continents with glowing cyan borders and subtle oceanic fill
    CONTINENT_POLYGONS.forEach((poly) => {
      ctx.beginPath();
      let visibleCount = 0;
      poly.forEach(([lat, lon], idx) => {
        const p = project(lat, lon);
        if (p.visible) visibleCount++;
        if (idx === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.lineTo(p.x, p.y);
        }
      });
      ctx.closePath();

      if (visibleCount > 2) {
        ctx.fillStyle = "rgba(14, 165, 233, 0.16)";
        ctx.fill();
        ctx.strokeStyle = "rgba(125, 211, 252, 0.65)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    });

    // 6. Draw Pulsing Ground Tracking Stations
    GROUND_STATIONS.forEach((station) => {
      const p = project(station.lat, station.lon);
      if (p.visible && p.z > 0) {
        // Outer pulsing ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.8)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner glowing beacon dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8";
        ctx.fill();

        // Label if station is near front
        if (p.z > radius * 0.35) {
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillStyle = "#e0f2fe";
          ctx.fillText(station.name, p.x + 7, p.y + 3);
        }
      }
    });

    // 7. Atmospheric Specular Sheen (Curved inner atmospheric halo)
    const atmosphericSheen = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
    atmosphericSheen.addColorStop(0, "rgba(255, 255, 255, 0.2)");
    atmosphericSheen.addColorStop(0.25, "rgba(56, 189, 248, 0.15)");
    atmosphericSheen.addColorStop(0.6, "rgba(14, 165, 233, 0.02)");
    atmosphericSheen.addColorStop(1, "rgba(0, 0, 0, 0.65)");
    ctx.fillStyle = atmosphericSheen;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore(); // Restore out of clipping

    // 8. Draw Orbital Satellite Trajectory Rings (outside sphere)
    // Satellite 1: Sentinel-2A Sun-Synchronous Polar Orbit
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.35); // Orbit inclination angle

    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 1.25, radius * 0.45, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Sentinel Satellite Beacon along ellipse
    const sat1Angle = rotation.yaw * 1.6;
    const sat1X = Math.cos(sat1Angle) * radius * 1.25;
    const sat1Y = Math.sin(sat1Angle) * radius * 0.45;

    // Outer ping
    ctx.beginPath();
    ctx.arc(sat1X, sat1Y, 5, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.9)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Satellite body
    ctx.beginPath();
    ctx.arc(sat1X, sat1Y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Satellite Label Tag
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText("S2A [786 KM]", sat1X + 8, sat1Y - 4);

    // Satellite 2: Landsat-9 Tilted Orbit
    ctx.rotate(0.7);
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 1.35, radius * 0.52, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(16, 185, 129, 0.35)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    const sat2Angle = -rotation.yaw * 1.2 + 2;
    const sat2X = Math.cos(sat2Angle) * radius * 1.35;
    const sat2Y = Math.sin(sat2Angle) * radius * 0.52;

    ctx.beginPath();
    ctx.arc(sat2X, sat2Y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "#10b981";
    ctx.fill();

    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#6ee7b7";
    ctx.fillText("L9 [705 KM]", sat2X + 8, sat2Y - 4);

    ctx.restore();

    // 9. Coordinate Reticle Markers on Globe Rim
    ctx.strokeStyle = "rgba(56, 189, 248, 0.8)";
    ctx.lineWidth = 1.5;
    // 4 cardinal tick marks
    ctx.beginPath();
    ctx.moveTo(cx, cy - radius - 6);
    ctx.lineTo(cx, cy - radius + 2);
    ctx.moveTo(cx, cy + radius - 2);
    ctx.lineTo(cx, cy + radius + 6);
    ctx.moveTo(cx - radius - 6, cy);
    ctx.lineTo(cx - radius + 2, cy);
    ctx.moveTo(cx + radius - 2, cy);
    ctx.lineTo(cx + radius + 6, cy);
    ctx.stroke();
  }, [size, rotation]);

  // Pointer dragging handler for interactive rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    setRotation((prev) => ({
      yaw: prev.yaw + dx * 0.008,
      pitch: Math.max(-0.8, Math.min(0.8, prev.pitch + dy * 0.008)),
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  return (
    <div
      className={`relative select-none flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
      style={{ width: size, height: size }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} style={{ width: size, height: size }} className="block" />

      {/* Interactive Helper Overlay HUD */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
        <span className="font-mono text-[9px] text-sky-400/80 bg-black/60 px-2 py-0.5 rounded border border-sky-400/20 backdrop-blur-sm tracking-wider">
          DRAG TO ROTATE PLANET • ORBIT REASONING: LIVE
        </span>
      </div>
    </div>
  );
};
