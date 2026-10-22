---
name: SatelliteSense Precision Terminal
colors:
  surface: '#0f131b'
  surface-dim: '#0f131b'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#bec8d2'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#88929b'
  outline-variant: '#3e4850'
  surface-tint: '#89ceff'
  primary: '#89ceff'
  on-primary: '#00344d'
  primary-container: '#0ea5e9'
  on-primary-container: '#003751'
  inverse-primary: '#006591'
  secondary: '#b4c5ff'
  on-secondary: '#002a78'
  secondary-container: '#0053db'
  on-secondary-container: '#cdd7ff'
  tertiary: '#ddb7ff'
  on-tertiary: '#490080'
  tertiary-container: '#bf7dff'
  on-tertiary-container: '#4d0087'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c9e6ff'
  primary-fixed-dim: '#89ceff'
  on-primary-fixed: '#001e2f'
  on-primary-fixed-variant: '#004c6e'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#f0dbff'
  tertiary-fixed-dim: '#ddb7ff'
  on-tertiary-fixed: '#2c0051'
  on-tertiary-fixed-variant: '#6900b3'
  background: '#0f131b'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 15px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: -0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: -0.015em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0em
  code-dense:
    fontFamily: JetBrains Mono
    fontSize: 9px
    fontWeight: '400'
    lineHeight: 12px
    letterSpacing: 0.02em
spacing:
  gutter: 0.5rem
  gutter-mobile: 0.25rem
  margin: 0.5rem
  margin-mobile: 0.25rem
  space-xs: 0.125rem
  space-sm: 0.25rem
  space-md: 0.5rem
  space-lg: 0.75rem
  space-xl: 1rem
---

## Brand & Style

The design system establishes a high-density, mission-critical research and intelligence workspace designed for geospatial analysts, earth observation researchers, and computer vision engineers. The target audience operates within technical environments requiring sustained focus over hours of high-resolution imagery inspection, spectral band composition, multi-temporal analysis, and model inference validation.

The design style merges technical functionalism with instrumental minimalism. Drawing operational cues from command centers, orbital flight telemetry, and advanced GIS suites, it eliminates decorative artifacts, exaggerated roundedness, and gratuitous motion. Visual priority is dictated by data fidelity, spatial precision, and zero-latency readability. The interface acts as a silent, calibrated frame around complex multispectral rasters, vector geometries, and dense temporal matrices, delivering an atmosphere of rigorous scientific authority and computational power.

## Colors

The palette operates in a strictly dark, low-reflection chromatic environment engineered to minimize eye strain and prevent color perception skew when reviewing false-color composites and normalized difference indices.

- **Canvas & Ground Surfaces**: The deepest plane (`#0c0f14`) provides the foundational void for viewport framing. Layered docked surfaces scale through `#141820` (panels and tool docks), `#1c222e` (floating inspector headers, active table rows), and `#232b3b` (hover states, modal viewports, segmented controls).
- **Primary Technical Accent (`#0ea5e9`)**: Reserved strictly for high-priority telemetry readouts, active GIS tool toggles, active vector vertices, and primary interface commits.
- **Secondary Cobalt Blue (`#2563eb`)**: Encodes bounding-box selections, spatial filter footprints, and focused spatial query extents.
- **Tertiary Multi-Modal Purple (`#a855f7`)**: Exclusively indicates multimodal graph embeddings, cross-sensor attention heatmaps, and derived neural network representations.
- **Precision Status Tones**:
  - **Calibrated Emerald (`#10b981`)**: Sensor sync locked, valid atmospheric correction (BOA), verified cloud-free pixels.
  - **Telemetry Amber (`#f59e0b`)**: Nadir drift warning, cloud occlusions > 20%, degraded resolution warnings, radiometric calibration anomalies.
  - **Critical Crimson (`#ef4444`)**: Missing orbital ephemeris, sensor ingest timeout, validation failure.
- **Structural Outlines**: 1px calibrated lines (`#232b3b`, `#2d3748`, and `#374151`) define all panel boundaries and tabular cells, superseding elevation shadows.

## Typography

The typographic hierarchy is split by semantic function: human-language analytical claims versus machine-derived spatial telemetry.

- **Inter** governs high-level metadata, analysis logs, structural labels, documentation, and user notes. It provides high legibility at micro scales without stroke distortion or visual fatigue.
- **JetBrains Mono** governs all mathematical, geospatial, and computational metrics. Coordinates (WGS84, MGRS, UTM), timestamp sequences (ISO 8601 UTC), spectral wavelengths (nm), confidence vectors (0.000–1.000), bounding box dimensional polygons, and GSD (Ground Sample Distance) values use JetBrains Mono to ensure aligned tabular columns and unmistakable digit distinction (specifically `0` vs `O` and `1` vs `l`).
- Headlines are compressed to functional heights (`13px` to `18px`). In this density profile, oversized headings waste viewable viewport real estate required for imagery and time-series plots.

## Layout & Spacing

The workspace operates on an edge-to-edge docking model. The viewport prioritizes spatial mapping canvas real estate, bordered by persistent collapsible tool assemblies:

- **Desktop Layout (≥ 1280px)**:
  - Top Utility Bar: 36px fixed height for sensor selection, CRS switcher, zoom level indicator, and global scene search.
  - Left Vertical Tool Rail: 44px fixed width icon-strip for layer manipulation, polygon segmentation, radiometric tools, and spectral profiling.
  - Secondary Expandable Drawer: 280px to 360px panel for active raster band pipelines (Red, Green, Blue, NIR, SWIR1, SWIR2) and time-lapse sliders.
  - Main GIS Viewport: Dynamic fluid canvas supporting WebGL/GPU rendering of tile pyramids, bounding boxes, and vector geometry overlays.
  - Right Collapsible Inspector: 320px fixed panel housing pixel probe values, feature metadata tables, and ML confidence classifications.
  - Bottom Telemetry Strip: 28px status strip for real-time cursor coordinates (Lat/Lon/Alt), scene acquisition date, sun azimuth, and cloud cover percentage.
- **Tablet / Split Screen (768px – 1279px)**:
  - Left rail remains pinned.
  - Inspector and raster band drawers collapse to auto-overlay sheets triggered via tool rail hotkeys.
- **Mobile (< 768px)**:
  - Fallback view dedicated to single-target reconnaissance validation.
  - Viewport locks full-width with a compact bottom sheet displaying key status indicators, primary image band, and binary acceptance controls.

## Elevation & Depth

This design system avoids optical drop shadows, soft ambient blurs, and skeuomorphic light sources. Elevation is established exclusively through tonal stepping and razor-sharp border stratification:

- **Level 0 (Earth Surface / Viewport Canvas)**: Deep black background (`#0c0f14`). Vector features and raster layers render directly onto this plane.
- **Level 1 (Docked Containers & Rails)**: Background `#141820` with a 1px solid `#232b3b` border. Houses persistent controls, timeline strips, and layer trees.
- **Level 2 (Floating Precision Toolbars & Overlays)**: Background `#1c222e` with a 1px solid `#2d3748` border. Applied to zoom/pan controls, scale bars, reticle indicators, and inline contextual context menus. No drop shadow is used; separation is achieved by the high contrast border against imagery.
- **Level 3 (Modal Alerts & Heavy Diagnostics)**: Background `#141820` framed with 1px solid `#374151` and an outer 1px accent highlight when active. A 40% opacity `#0c0f14` non-blurred scrim isolates the diagnostic window from distracting underlying geospatial rasters.

## Shapes

The interface utilizes a rigid `0px` border-radius architecture across all operational controls, panels, input fields, and HUD badges. 

Every pixel communicates precision. Rounded corners waste active interaction area in dense data grids and clash with the strict rectilinear nature of satellite swath boundaries, pixel arrays, and bounding-box coordinates. All components—from segmented buttons and modal viewports to floating crosshair badges—feature crisp 90-degree corners. 

Interior status dots and focus indicators remain strictly circular or square glyphs, acting as symbolic targets rather than structural bounding containers.

## Components

### Buttons & Action Triggers
- **Primary Action (Commit/Run Inference)**: Background `#0ea5e9`, text `#0c0f14`, font `JetBrains Mono` 11px bold, uppercase, 0px radius, 28px height, horizontal padding 12px. Hover: `#38bdf8`. Active: `#0284c7`.
- **Secondary Tool Trigger**: Background `#1c222e`, border 1px solid `#2d3748`, text `#e2e8f0`, 28px height. Hover: background `#232b3b`, border `#0ea5e9`.
- **Icon Tool (GIS Toolbar)**: 32px × 32px square. Inactive: text `#94a3b8`. Active/Selected: background `#232b3b`, text `#0ea5e9`, border-left 2px solid `#0ea5e9`.

### Chips & Telemetry Badges
- **Status Badges**: Composed of a 6px solid square status indicator followed by tabular label. Height 20px, background `#141820`, border 1px solid `#232b3b`, padding 0 6px.
- **Spectral Band Tag**: Background `#1c222e`, border 1px solid `#2d3748`, font `JetBrains Mono` 10px, text `#38bdf8`. E.g., `B04 (665nm)`.

### Lists & Layer Trees
- **Layer Stacks**: Dense 26px row items. Drag handle on extreme left, visibility checkbox (eye glyph), layer name in `Inter` 12px, opacity slider inline, and blend mode trigger. Active selection marked by a continuous `#2563eb` 1px border.
- **Telemetry Feeds**: Striped rows alternating `#141820` and `#0c0f14`. Column dividers 1px solid `#1c222e`. Numerical values aligned right using `JetBrains Mono`.

### Checkboxes & Segmented Controls
- **Checkboxes**: 12px × 12px square, 0px radius, border 1px solid `#475569`, background `#0c0f14`. Checked state: background `#0ea5e9` with a centered sharp 4px inner black square.
- **Segmented Band Switchers**: Compact inline group (e.g., `RGB` | `NDVI` | `SWIR` | `EVI`), height 24px, 1px border between items. Inactive item `#141820` with muted text; active item `#0ea5e9` with black text.

### Input Fields & Scrubbers
- **Coordinate & Float Inputs**: 24px height, background `#0c0f14`, border 1px solid `#2d3748`, font `JetBrains Mono` 11px, text `#38bdf8`, padding 0 6px. Focus state: border 1px solid `#0ea5e9` with zero glow.
- **Value Scrubbers (Gamma, Gain, Opacity)**: Track height 2px `#232b3b`, thumb 8px × 12px rectangle `#0ea5e9` with 0px radius. Real-time value display alongside in monospaced micro-text.

### Precision Cards & Inspector Panels
- **Inspector Data Units**: Border 1px solid `#232b3b`, background `#141820`. Header height 24px, uppercase `Inter` 11px with collapsible arrow, containing key-value pair grids bordered by `#1c222e` gridlines.

### Specialized Geospatial Overlays
- **Reticle / Pixel Probe**: Floating HUD crosshair attached to cursor with a 4-quadrant readout: Lat, Lon, Elevation, and Target Digital Number (DN) / Reflectance value in `JetBrains Mono` 10px `#0ea5e9`.
- **Bounding Box Telemetry Labels**: Crisp 1px outline box `#2563eb` with an attached top-left 0px badge displaying class label and confidence score (e.g., `VESSEL_DETECT: 0.984`) on `#2563eb` background with white text.