# SatelliteSense Workstation (Prototype 1)

A frontend prototype for an analysis workstation for satellite and remote-sensing imagery. It is built around one idea: select a caption claim, and the image region that supports it is shown right away, so an analyst can judge whether the evidence holds up.

The project accompanies research on *Reasoning-Guided Multimodal Captioning of Satellite Images Using Contrastive Language-Image Pre-training*. This repository contains the interface only. The backend and models are not part of it.

## What the interface covers

- **Caption review.** An image next to a numbered list of caption candidates, each with its source, evidence references, verification status and confidence, shown only when the data provides them.
- **Single image analysis.** A docked layout with image input, a viewer (zoom, pan, fit, reset, overlays), a layers panel, a caption and claims list, and an inspector with Evidence and Graph tabs.
- **Evidence inspection.** The selected claim, a crop of its supporting region, and a warning when evidence is missing or ambiguous.
- **Scene graph.** Subject, relation and object links, with a table view as an accessible fallback.
- **Temporal comparison.** Before and after images with a draggable split view and synchronized zoom and pan.
- **History and experiments.** Past analyses and experiment results, limited to data that actually exists.

The full specification lives in `satellitesense_frontend_prompt_v3_prototype.md`.

A few rules the prototype follows: no invented metrics, detections or captions; confidence reads "Not calibrated" unless the API defines it; sample data appears only in clearly labeled preview fixtures.

## Tech stack

React 18, TypeScript, Vite, Tailwind CSS, react-resizable-panels, Lucide icons.

## Getting started

You need Node.js 18 or newer.

```bash
git clone https://github.com/FFloverSHIKHAR2006/Satellite-Sense-Prototype-1.git
cd Satellite-Sense-Prototype-1
npm install
npm run dev
```

Vite prints the local address in the terminal, usually http://localhost:5173.

Other scripts:

```bash
npm run build     # type-check and produce a production build
npm run preview   # serve the production build locally
```

## Project layout

```
src/        application source
public/     static assets
index.html  entry point
satellitesense_frontend_prompt_v3_prototype.md   frontend specification
```

## Status

Early prototype. Screens and behavior will change.

## License

Released under the MIT License. See [LICENSE](LICENSE) for the full text.
