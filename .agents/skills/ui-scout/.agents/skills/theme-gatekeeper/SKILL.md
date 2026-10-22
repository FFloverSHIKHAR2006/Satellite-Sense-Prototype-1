---
name: theme-gatekeeper
description: Evaluates fetched UI components against the current website's theme, brand purpose, and design tokens before integrating them. Trigger whenever integrating external UI code or running after ui-scout.
---

# Theme & Purpose Gatekeeper

## Instructions
1. Inspect the project's styling configuration (`tailwind.config.*`, `globals.css`, or theme tokens) and `README.md` to understand the site's core purpose, color palette, typography, and border-radius system.
2. Score the fetched component against three criteria:
   - **Purpose Match:** Does the layout serve the user flow of this specific website?
   - **Visual Cohesion:** Can its spacing, shadows, and structure adapt to existing CSS variables?
   - **Dependency Footprint:** Does it require bloat that conflicts with our stack?
3. **Decision Gate:**
   - If the component conflicts with the website's purpose, **reject it**, explain why in 2 lines, and ask `ui-scout` to fetch an alternative.
   - If it fits, refactor all hardcoded hex colors, fonts, and spacing to use the project's native theme tokens before inserting it into `src/components/`.