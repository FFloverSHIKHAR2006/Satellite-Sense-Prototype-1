/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          black: "#010307",
          void: "#060913",
          glow: "#38bdf8",
          atmospheric: "#60a5fa",
          radar: "#38bdf8",
          cyber: "#0ea5e9",
        },
        canvas: "#06080B",
        workstation: "#0C1017",
        panel: "#121721",
        surface: {
          DEFAULT: "#121721",
          raised: "#19202E",
          hover: "#202A3D",
          active: "#27344D",
        },
        border: {
          subtle: "#1E2638",
          contrast: "#313F59",
          focus: "#38BDF8",
        },
        accent: {
          DEFAULT: "#38BDF8",
          hover: "#0EA5E9",
          muted: "rgba(56, 189, 248, 0.15)",
        },
        status: {
          verified: "#10B981",
          uncertain: "#F59E0B",
          unsupported: "#F43F5E",
          uncalibrated: "#94A3B8",
        },
        content: {
          primary: "#F1F5F9",
          secondary: "#94A3B8",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'satellite-drift': 'orbitalDrift 28s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'radar-spin': 'radarSweep 3s linear infinite',
        'limb-breathe': 'limbAtmosphere 7s ease-in-out infinite alternate',
        'laser-scan': 'laserScan 3.5s ease-in-out infinite alternate',
      },
      keyframes: {
        laserScan: {
          '0%': { transform: 'translateY(0%)', opacity: '0.85' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0.85' },
        },
        orbitalDrift: {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '50%': { transform: 'translate(-12px, -8px) rotate(-1.5deg)' },
          '100%': { transform: 'translate(10px, -18px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: '0.85',
            filter: 'drop-shadow(0 0 35px rgba(125,211,252,0.65)) drop-shadow(0 0 75px rgba(56,189,248,0.4))',
          },
          '50%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 50px rgba(186,230,253,0.95)) drop-shadow(0 0 110px rgba(56,189,248,0.7))',
          },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        limbAtmosphere: {
          '0%': { opacity: '0.9' },
          '100%': { opacity: '1' },
        },
      },
      borderRadius: {
        none: "0px",
        xs: "2px",
        sm: "2px",
        DEFAULT: "2px",
        md: "4px",
        lg: "4px",
      },
    },
  },
  plugins: [],
};
