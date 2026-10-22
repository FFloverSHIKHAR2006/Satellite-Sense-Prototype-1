---
name: anti-ai-polish
description: Scrapes current web design critiques to identify cliché AI-generated website patterns and refactors components so they look human-crafted and bespoke.
---

# Anti-AI Design Polisher

## Instructions
1. Use the `firecrawl` MCP `search` and `scrape` tools to query recent articles or discussions on "common signs of AI generated websites UI design cliches" and extract key visual anti-patterns into `.agents/skills/anti-ai-polish/references/ai-cliches.md` (if not already cached).
2. Audit the target component or page against both the scraped insights and these baseline rules:
   - **No default AI gradients:** Remove generic purple/indigo/blue neon mesh gradients and glowing blurs unless explicitly part of the brand.
   - **Break symmetrical 3-column bento clichés:** Replace uniform 3-card icon-title-subtext rows with editorial asymmetry, varied grid spans, or interactive states.
   - **Typography & Micro-copy:** Replace generic filler words ("Unleash", "Supercharge", "Elevate", "Seamless") and uniform centered headings with sharp, domain-specific copy and high-contrast typographic hierarchy.
   - **Lucide Icon Overuse:** Avoid placing a generic badge icon in a colored circle above every single paragraph.
3. Refactor the component's JSX/Tailwind classes to apply bespoke spacing, realistic micro-interactions, and organic layout rhythm.
