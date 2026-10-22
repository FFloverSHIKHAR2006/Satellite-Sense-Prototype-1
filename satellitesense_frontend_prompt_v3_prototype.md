# SatelliteSense Frontend Development Prompt (v2)

## Role

Act as a senior frontend engineer and a product designer who has worked on geospatial and annotation tools. Build a production-quality frontend for **SatelliteSense: Reasoning-Guided Multimodal Captioning of Satellite Images Using Contrastive Language-Image Pre-training**.

Your task is **FRONTEND ONLY**.

Do not implement, rewrite, train, or modify the backend, AI models, APIs, database, dataset pipeline, or existing research logic.

---

## 1. Start by inspecting the existing project

Before writing code:

1. Inspect the repository: frontend framework, package manager, folder structure, existing components, routing, styling system, API configuration.
2. Identify existing frontend code that can be reused.
3. Read the current SatelliteSense documentation and architecture.
4. Preserve the current backend API contracts. Inspect existing endpoints and response schemas if accessible, but do not modify them.
5. Write a short frontend implementation plan based on the actual repository.

Do not restart the project or replace working code unnecessarily. If a frontend exists, improve it incrementally.

If no frontend framework is established, use React, TypeScript, and Vite.

---

## 2. Product vision

SatelliteSense is an analysis workstation for remote-sensing imagery. Users examine a satellite image, read evidence-grounded claims about it, check where each claim points on the image, and compare images from different dates.

The primary job of the interface: **let a person select a claim and immediately see the exact region of the image that supports it, and judge whether it holds up.**

It must feel like a tool built by people who use maps and annotation software daily. It must not look like:
- A chatbot or a chat transcript.
- A SaaS admin dashboard with KPI cards.
- A marketing landing page.
- A grid of identical rounded cards.
- A generated "AI product" template.

The satellite image is the dominant element on every screen. Everything else supports it.

---

## 3. Design direction (read this before choosing any styling)

### 3.1 Reference products (study the patterns, do not copy branding)

Base the layout and interaction vocabulary on tools that real analysts use, not on UI-kit demos:

| Reference | Borrow this |
|---|---|
| **QGIS / Google Earth Engine Code Editor** | Canvas-first layout; layers panel with per-layer visibility and opacity; coordinate readout; scale indicator |
| **Sentinel Hub EO Browser / Planet Explorer** | How imagery metadata (date, sensor, resolution) is shown unobtrusively; date/compare controls |
| **CVAT / Roboflow Annotate / Label Studio** | Slim vertical tool strip beside the canvas; selectable regions in a list that stays linked to the canvas; hover-to-highlight |
| **VS Code / Linear** | Docked panels with tab strips; dense list rows instead of cards; command menu; keyboard shortcuts; resizable splits |
| **Figma** | Right-hand inspector that changes with the selection; compact property rows |
| **Mapbox Studio / Felt** | Restrained chrome around a map; floating controls kept small and few |

If the person using this prompt supplies specific reference site links or screenshots, those take priority over this table. Inspect them first and note which patterns you are adopting.

### 3.2 Using 21st.dev and component libraries

- Use **21st.dev** and **shadcn/ui** (Radix primitives) as a source of *accessible primitives and behavior*: resizable panels, tabs, tooltips, dropdowns, command palette, file dropzone, dialogs, toasts.
- Do **not** paste community components as they come. Many are styled in the same recognizable "modern AI" way (large radii, gradient borders, glow, glass, sparkles). Take the structure and accessibility, then restyle every component with this project's tokens.
- Prefer `react-resizable-panels` for the docked layout and a lightweight viewer layer (OpenLayers or Leaflet with `CRS.Simple`, or a canvas/SVG overlay on a pan-zoom library) for the image viewer. Reuse anything already installed.
- Do not add more than a few dependencies. Every one must be justified in the final report.

### 3.3 Things that make a UI look AI-generated: avoid all of these

**Layout and structure**
- Rows of identical rounded cards. Use dense list rows, tables, and docked panels with dividers.
- A hero stat row ("97% accuracy", "12K images") or any KPI strip. No invented numbers anywhere.
- Centered "empty state with big icon and gradient button" pattern.
- Everything contained in a bordered, shadowed box. Use whitespace and single dividers to group; boxes only where a region is truly separate.
- One border radius on everything. Use a small radius scale (e.g. 2px for inputs and rows, 4px for panels, none on the canvas) and apply it by role.

**Color and surfaces**
- Glassmorphism, backdrop blur, glow, neon outlines, gradient washes, gradient text, gradient buttons.
- A saturated accent used everywhere. The accent is for selection, focus, and the active tool only. Status colors are for status only.
- Soft identical drop shadows on every element. Use borders for separation; at most one shadow, on floating menus and dialogs.

**Typography and copy**
- Inter as the default face. Use **Public Sans** (or another face you can justify) for the UI. Use a monospace face **only** for coordinates, IDs, and tabular values, not for general small labels.
- ALL-CAPS tracked eyebrow labels above headings. Use sentence case and a clear size/weight hierarchy.
- Emphasizing one word of a heading in a different color.
- Meta strings joined with middle dots ("Sentinel-2 · 10 m · 2024"). Use a labeled key/value list instead.
- Spaced em dashes in labels, arrows appended to button text, emoji, sparkle icons, "AI-powered" badges, "Powered by CLIP" banners.
- Marketing tone. Write like a tool: "Analyze image", "Clear overlays", "No image loaded. Drop a file or choose one."
- Numbered markers (01 / 02 / 03) unless the content is truly a sequence.

**Motion**
- Fade-and-slide-up on every section, hover lift on every row, animated gradients, typing effects.
- Allowed: panel resize/collapse (150 ms), selection highlight on the canvas, expand/collapse of details, and one indeterminate progress indicator while analysis runs. Respect `prefers-reduced-motion`.

**Icons and imagery**
- Use one icon set at one stroke weight. Prefer **Phosphor** (regular) or **Tabler**; if Lucide is already installed, keep it and do not mix sets.
- No illustrations, stock imagery, or decorative satellite graphics. The only imagery is the user's actual image.

### 3.4 Design tokens

Start from these and change them only for a reason you can state.

**Neutrals (slightly cool graphite, not pure black):**
- Canvas surround: `#0B0F14`
- App background: `#111820`
- Panel: `#161F29`
- Raised (menus, dialogs): `#1C2733`
- Border: `#2B3948`
- Text primary: `#E8EEF5`
- Text secondary: `#9AA9B8`

**Interaction accent (selection, focus, active tool only):** `#67B7FF`

**Status (never decorative):**
- Verified: `#45C486`
- Partially supported / uncertain: `#F2B84B`
- Unsupported: `#F16D75`
- Not evaluated / not calibrated: use secondary text color

Rules:
- Never communicate status by color alone. Pair every status with a glyph and a text label.
- Overlay colors on the image must stay distinguishable on top of varied imagery: use 2 px strokes with a dark outer stroke or halo, and a low-opacity fill for masks.
- Provide a light theme only if you fully implement and test it. Otherwise ship dark only and omit the theme control.
- Body text 13 to 14 px in dense panels, line length under 80 characters in prose areas, tabular numerals for numbers.

### 3.5 Design plan checkpoint (required before building)

After inspecting the repo and before writing UI code, write a short plan:
1. Tokens (color, type, radius scale, spacing scale).
2. An ASCII wireframe of the Single Image Analysis screen at 1440 px, and a second one for tablet/mobile.
3. The three or four signature interactions (see 3.6).
4. A self-review: list any choice that matches the "avoid" list above or that you would have made for any similar project, and revise it. State what you changed.

### 3.6 Signature interactions (spend the design effort here)

Put the polish into these and keep everything else quiet:
- **Claim to region linking.** Hovering a claim row previews its region on the canvas; clicking selects it, pans/zooms to fit the region with padding, and fills the inspector. Hovering a region on the canvas highlights its claim row and scrolls it into view. Selection state is shared across the claim list, canvas, inspector, and scene graph.
- **Layers panel.** Per-overlay toggles with opacity sliders (image, boxes, masks, change layer), a legend that lists only overlay types actually present, and keyboard shortcuts for common toggles.
- **Canvas readout.** Pointer pixel coordinates, current zoom, and image dimensions in a thin status bar under the canvas. Show geographic coordinates only if the data supplies georeferencing.
- **Compare slider** on the Temporal page: a draggable divider with keyboard control (arrow keys), synchronized zoom/pan.

---

## 4. Application layout

### A. Navigation
A narrow icon rail (about 48 px) that expands to show labels. Items: New analysis, Single image, Temporal comparison, History, Experiments, Settings. Show only pages that can be meaningfully implemented. No large logo block; a small mark and the product name when expanded.

### B. Top bar
A single thin bar (about 40 px) with: analysis name, mode, image metadata when available (shown as a compact labeled list), and processing status. Include theme control and a workspace menu only if actually supported. Do not invent telemetry, model performance, or user information.

### C. Main workspace (Single Image Analysis)
A docked, resizable three-region layout, similar to an IDE or annotation tool:

```
+----+---------------------------------------+------------------+
|    | tool strip | canvas                   | Analysis panel   |
| nav|            |                          |  caption         |
|    |            |                          |  claims list     |
|    |            |                          +------------------+
|    |            |                          | Inspector tabs:  |
|    |            |                          |  Evidence | Graph|
|    +---------------------------------------+                  |
|    | status bar: coords, zoom, dimensions  |                  |
+----+---------------------------------------+------------------+
```

- The canvas gets at least 55% of the width at 1440 px.
- Panels are resizable and collapsible. Remember sizes for the session.
- Tablet: the right side becomes a bottom sheet with tabs. Mobile: canvas on top, panels as tabs below, no horizontal scrolling of the page.

---

## 5. Core page: Single Image Analysis

This page gets the most effort.

### Image input
- Drag-and-drop and file picker. Preview before analysis. Replace and remove.
- Empty, loading, success, and error states, each with plain, specific text that says what happened and what to do.
- Show filename and dimensions when available.
- Validate type and size on the client against the existing frontend/backend contract. Do not claim this replaces server validation.

### Image viewer
- Zoom in/out, fit to view, reset, pan/drag, mouse-wheel and pinch zoom.
- Overlay visibility controls (see layers panel), bounding boxes when coordinates exist, segmentation masks when masks exist, region selection when supported.
- Legend limited to overlay types present in the data.
- Do not draw fake detections or fabricated masks.

### Analysis controls
- Analyze image button; current image status; settings only if they map to real functionality or API parameters.
- Indeterminate progress and clear failure states. Disable duplicate submissions while a request runs.

### Caption output
- Show the generated caption as readable body text at the top of the analysis panel.
- Below it, if the API returns structured claims, show them as **dense list rows** (not cards), each with: claim text, status glyph and label, confidence (only if returned and defined), evidence region IDs (only if returned), and an inspect action.
- If the backend returns only a paragraph, display it as-is. Do not invent claim decomposition and present it as model output.

---

## 5A. First prototype: Multi-caption evidence review (required)

Build this as the **first usable prototype**, before expanding the rest of the application. Use the uploaded reference screenshot as a layout/interaction reference: each satellite image is shown beside a numbered list of several caption candidates describing that image. The reference is about presenting multiple textual descriptions for one image; do not copy its plain document styling. Adapt the pattern to the existing SatelliteSense product design, colors, navigation, and components in this prompt.

### Prototype screen

Create a page or mode named **Caption Review** with a vertically scrollable sequence of image-analysis rows. Each row contains:

- **Image column:** the actual uploaded satellite image, with a consistent preview size and a control to open it in the main viewer.
- **Caption column:** a clearly numbered list of caption candidates returned by the existing API or loaded from explicitly labeled prototype fixtures.
- **Per-candidate details:** show any available source/model label, evidence-region references, verification status, and confidence only when the data contract provides them. If a field is absent, show a restrained label such as “Evidence unavailable” or “Not calibrated”; never invent a score.
- **Review actions:** select a candidate, compare/select another candidate, inspect its evidence, and mark a candidate for review only if that action has a real local or API-backed behavior.
- **Image metadata:** filename, dimensions, and acquisition date/sensor/resolution only when available.

Use compact rows and dividers, not a grid of rounded cards. At desktop widths, keep the image on the left and candidate descriptions on the right, inspired by the supplied screenshot. Keep the image dominant enough to inspect while allowing several caption candidates to be read without opening separate pages. On narrow screens, stack each image above its candidate list.

### Candidate data and honesty

- Prefer the existing backend's real multi-caption or candidate-ranking endpoint, if one exists. Inspect the actual routes and schemas first.
- If the backend returns only one caption, do not pretend it returns five. Instead, provide a **clearly labeled “Prototype preview — sample captions”** fixture solely for demonstrating layout interactions, and keep it separate from real analysis results. Never mix sample captions into a real model response.
- Do not hard-code the example descriptions from the reference screenshot as if they were SatelliteSense predictions. They describe unrelated example scenes and are only a visual layout reference.
- If no multi-caption endpoint exists, implement a typed frontend adapter for the future capability, document the missing API contract, and make the UI show a clear unavailable state for live multi-candidate analysis.
- A candidate may be selected to inspect its evidence only when the required region/evidence data exists. If no evidence is supplied, explain that it is unavailable rather than drawing invented boxes or masks.
- Do not imply that candidate ordering means better quality unless the API explicitly defines the ranking.

### First-prototype acceptance criteria

1. A user can load or upload an image and see it beside multiple caption entries when actual candidate data or clearly labeled preview fixtures are available.
2. Each image has its own candidate list; candidates never accidentally repeat across unrelated images.
3. Selecting a candidate visibly updates the selected state and the evidence inspector when evidence exists.
4. The screen uses SatelliteSense's graphite palette, blue selection accent, compact typography, and restrained borders from section 3.
5. The layout works at desktop, tablet, and mobile widths.
6. Real outputs, sample fixtures, and unavailable functionality are visibly distinguished.
7. The existing API, backend, model, research logic, and Week 3–4 work remain untouched.


---

## 6. Confidence and evidence inspection

Evidence tab in the inspector shows:
- Selected claim text.
- The supporting region, as a cropped preview of the actual image area plus its box or mask.
- Confidence score, verification result, evidence metadata.
- A visible warning when evidence is missing or ambiguous.

Status labels (consistent everywhere): Verified, Partially supported, Uncertain, Unsupported, Not evaluated.

Rules:
- Show a status only when the backend supplies it or a documented, transparent frontend rule derives it.
- Do not treat raw similarity as calibrated probability. Display confidence only when the API defines its meaning. If calibration is not implemented, show "Not calibrated" instead of a percentage.

---

## 7. Scene graph and spatial relationships

A dedicated Graph tab in the inspector.

Support `Subject → Relation → Object` when returned by the backend. Provide:
- A readable graph view and a **table view** (subject, relation, object, evidence) that is the accessible fallback and is always available.
- Selecting a node highlights its region when coordinates exist. Selecting an edge shows the relation and its evidence.
- Handling for empty graphs and missing coordinates.
- No fabricated objects or relationships for visual completeness.

Graph styling follows the same rules: flat nodes, thin edges, labels in the UI face, no glow, no physics animation that never settles.

---

## 8. Temporal Comparison page

Frontend for before/after analysis:
- Before and after uploads; side-by-side view and an adjustable swipe/split view; synchronized zoom and pan.
- Dates and metadata when supplied. Change-overlay layer when available.
- Change claims with spatial evidence, confidence, and verification when returned.

Clearly separate three kinds of statement and label each:
- **Observed change**
- **Possible interpretation**
- **Inferred cause**

Never present a causal explanation as verified unless the backend explicitly supports it. If the backend does not support temporal analysis yet, build the interface and show a clearly labeled unavailable state. Do not simulate a successful result.

---

## 9. Analysis History

Build only to the extent the existing application supports. Show available fields (ID, thumbnail, timestamp, mode, status, caption preview) as a **table or dense list**, not a card grid. Use real persisted history if an API exists; if not, do not imply history survives a refresh. Provide loading, empty, error, and retry states.

---

## 10. Experiments and Evaluation page

A research-oriented view of **actual** results only. Possible sections: baseline comparison, contrastive alignment ablations, scene-graph contribution, grounding evaluation, confidence calibration, temporal reasoning, optical versus optical + SAR, caption and grounding metrics.

- Present results as proper tables (sortable, tabular numerals) and minimal charts with labeled axes, in the style of a paper's results section. No decorative charts.
- Populate only from real experiment files, existing API responses, or fixtures clearly labeled as sample data for UI development.
- Never fabricate scores, training progress, or improvements. If data is missing, the empty state states which file or endpoint is required.

---

## 11. Frontend architecture and code quality

Use reusable components and a clean structure that fits the existing repo. A possible layout:

```
src/
  app/
  components/
    layout/  image-viewer/  evidence/  scene-graph/  analysis/  temporal/  common/
  pages/  hooks/  services/  types/  utils/  styles/
```

Requirements:
- TypeScript with explicit API and component types.
- Design tokens defined once (CSS variables or the existing theme system) and used everywhere. No one-off hex values in components.
- Separation of presentation and API services; centralized API base URL; public config through environment variables; no secrets in frontend code; no hard-coded URLs.
- Shared selection state (selected claim, region, node) in one place so the canvas, list, inspector, and graph stay in sync.
- Request loading and error handling; abort or clean up requests when appropriate.
- Keyboard navigation, visible focus rings, ARIA roles for lists/tabs/panels, and meaningful empty states.
- No duplicated components or unnecessary dependencies. No backend changes.

If an endpoint is unavailable, isolate it behind a typed interface and show a clear unavailable state. Never silently return fake success data.

---

## 12. API integration rules

Use the existing backend contract exactly.

1. Inspect endpoints and response models.
2. Map them to TypeScript types.
3. Implement the service layer.
4. Handle success, validation errors, timeouts, and server failures.
5. Test against the backend where accessible.

If a schema is unknown, do not guess it. Mark the integration pending and document the required request and response fields. Never modify backend logic to fit frontend assumptions.

---

## 13. Interaction and motion

Follow section 3.3 for what to avoid. Include: hover and selected states, restrained panel transitions, upload feedback, indeterminate analysis progress, claim-to-region selection, overlay toggles, expandable evidence details, responsive navigation, and a small set of keyboard shortcuts (listed in a help dialog). No fake progress percentages.

---

## 14. Copy and microcopy

- Plain verbs, sentence case, active voice. Name things by what users do: "Analyze image", "Show masks", "Replace image".
- Same action, same name everywhere (a button that says "Analyze image" produces a status that says "Analysis complete").
- Errors say what happened and what to try next, without apologizing or being vague. Example: "The server did not respond within 30 seconds. Check that the backend is running, then try again."
- Empty states tell the user what to do, with no mood copy and no jokes.
- No placeholder text such as "Lorem ipsum", invented captions, or invented dataset names in the shipped UI.

---

## 15. Testing and acceptance criteria

The frontend is complete only when:

1. The app starts with the repository's documented command.
2. All implemented routes render correctly.
3. Image upload and preview work.
4. Viewer controls work (zoom, pan, fit, reset, overlays, layers).
5. Real analysis requests use the existing API contract.
6. Errors and unavailable endpoints are handled clearly.
7. Claims select their evidence when IDs and geometry are provided, and canvas hover links back to the claim list.
8. Scene graphs show actual returned data, with the table fallback.
9. Temporal comparison works as far as existing APIs allow.
10. The layout is responsive at desktop, tablet, and mobile widths.
11. Keyboard navigation, focus visibility, and contrast are checked (including status colors on the image overlays).
12. **Design review passed:** none of the items in section 3.3 are present; screenshots reviewed against the wireframes from 3.5.
13. No fabricated metrics, confidence scores, detections, or results are shown.
14. No backend, model, training, dataset, or research files were modified.
15. Existing frontend functionality has not regressed.

Run available linting, type checking, tests, and the production build. Fix errors you introduced.

---

## 16. Final deliverable

Implement the frontend in the existing repository. Do not provide only a design proposal or sample code.

At completion, report:
- Files created and modified.
- Pages and components implemented.
- Reference patterns adopted and which libraries or 21st.dev/shadcn primitives were used (and how they were restyled).
- API endpoints integrated.
- Features that work, and features awaiting backend support.
- Commands to run the frontend and required environment variables.
- Test and build results.
- Screenshots of the finished interface, if the environment supports them.
- Any item from the "avoid" list you could not avoid, and why.

## Final rule

**Frontend only. Preserve the existing SatelliteSense backend and Week 3-4 implementation. Inspect first, reuse what works, and implement the Multi-caption evidence review prototype in section 5A as the first usable screen. Match the supplied screenshot's image-left / numbered-caption-list-right information pattern while using SatelliteSense's own design system. Integrate only existing APIs, clearly label preview fixtures, and never fabricate AI outputs or research results.**
