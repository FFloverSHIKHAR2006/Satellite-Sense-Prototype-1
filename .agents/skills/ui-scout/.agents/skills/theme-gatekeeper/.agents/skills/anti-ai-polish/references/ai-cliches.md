# AI Design Clichés & Anti-Patterns Reference
*Captured via Firecrawl & Anti-AI Polish Audit*

## Key Visual Tells & Clichés to Strictly Avoid
1. **The Ubiquitous Em Dash (—) & Marketing Fluff**:
   - Avoid buzzwords: "Unleash", "Elevate", "Supercharge", "Next-gen", "Seamless", "Build faster — without sacrificing quality".
   - Use straightforward tool terminology: "Analyze image", "Inspect region", "Compute delta", "Filter layers".
2. **Generic Indigo-to-Violet Gradients & Glows**:
   - Avoid `#615fff` to `#8e51ff` gradients, glassmorphism, glowing card borders, and purple neon blurs.
   - Use bespoke, high-contrast workstation neutrals (e.g., `#06080B` to `#19202E`) and functional spectral cyan (`#38BDF8`) reserved exclusively for active tools and selections.
3. **Left-Border Gradient Cards & Symmetrical 3-Column Bento Boxes**:
   - Avoid uniform 3-card icon-title-subtext rows and gradient left-borders.
   - Use dense, 1px-divided list rows (`border-b border-[#232D3F]`), tabular layouts, and docked resizable panels.
4. **Emojis Where Real Tool Icons Belong**:
   - Avoid 🚀, 💡, ✨, or emoji status markers.
   - Use strict 1.5px/1.75px SVG tool icons (Lucide / Tabler consistent set) and semantic glyphs paired with text labels: `[✓] Verified`, `[△] Uncertain`, `[✕] Unsupported`, `[—] Uncalibrated`.
5. **Fake Metric Strips & Fabricated Numbers**:
   - Avoid "99.4% Accuracy", "12k Images Processed", "Powered by AI" vanity counters.
   - Display only calibrated outputs from real model payloads or show explicit "Not calibrated" / "Evidence unavailable" flags.
6. **One Border Radius on Everything**:
   - Avoid pill buttons and huge 16px/24px rounded corners.
   - Use a disciplined radius scale: 0px on canvas/viewer, 2px on buttons/badges/inputs, 4px on docked panels and modal dialogs.
7. **Middle Dots for Metadata**:
   - Avoid "Sentinel-2 · 10m · 2024". Use clear key/value pairs (`Sensor: Sentinel-2`, `GSD: 10m`, `Date: 2024-05-12`).
8. **Curly Smart Quotes & Formatting Inconsistencies**:
   - Keep clean standard keyboard typographic standards.
