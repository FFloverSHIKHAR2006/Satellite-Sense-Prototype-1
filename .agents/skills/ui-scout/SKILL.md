---
name: ui-scout
description: Use this skill when the user asks to find, search, or fetch UI components, templates, or design inspiration from 21st.dev or the web. Trigger on "find a component", "fetch UI", or "21st.dev".
---

# UI Scout & Fetcher

## Instructions
1. Identify the exact UI component type the user needs (e.g., hero section, pricing table, testimonial bento).
2. Call the `21st-magic` MCP tool (`search` and `get_component`) to fetch 2 to 3 top matching React/Tailwind component candidates.
3. If external web inspiration is requested, use the `firecrawl` MCP `search` tool to locate live reference URLs.
4. Pass the fetched component code directly to the `theme-gatekeeper` skill before writing any files to the project.