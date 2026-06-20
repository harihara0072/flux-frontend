## Summary

Rebuilds the Flux homepage as a tabbed dashboard with a new design
system, ahead of wiring it to real data. Auth (`/login`, `/register`)
is untouched and still works exactly as before.

## Design direction

Moved away from generic fintech defaults (sterile blue/white, or
near-black + acid-green) toward something with more warmth: an ink
background, warm-paper card surfaces, an electric violet primary
accent, and `Fraunces` for display type paired with `Inter` for body
text. Full token system lives in `src/styles/tokens.css` and
`tailwind.config.js`.

**Signature element:** an animated "flow bar" — a horizontal stacked
bar that pours in on load, one segment per spending category — used
as the Overview tab's hero instead of a generic stat-card grid.

**Motion signature:** the left-rail tab indicator uses framer-motion's
shared layout animation, so it morphs smoothly between tab positions
rather than snapping.

## What's new

- **Design tokens** — `src/styles/tokens.css`, extended into
  `tailwind.config.js`
- **Reusable component library** — `src/components/common/`:
  `Button`, `IconButton`, `Card`, `Tabs`, `Badge`, `Avatar`,
  `ProgressBar`, `Input`, `Autocomplete`, `Modal`, `Tooltip`,
  `Skeleton`. Single import surface via `components/common/index.ts`.
- **AppShell layout** — `src/components/layout/AppShell.tsx`: left
  rail nav (desktop), bottom nav (mobile), topbar with search/notif/add
- **Four feature pages**, all on mock data (`src/lib/mockData.ts`):
  - `Overview` — FlowBar hero, stat cards, income/expense trend chart,
    pending bill splits, recent transactions
  - `Transactions` — searchable list with inline category re-assignment
    via the Autocomplete component
  - `Bills & Splits` — owed/owing summary, friends list, split cards
  - `Budgets` — per-category limit cards with on-track/approaching/
    exceeded states, edit-limit modal
- **Charts** — `src/components/charts/`: `FlowBar` (custom SVG-free
  CSS/motion bar), `TrendChart` (Recharts area chart), `StatCard`
  (count-up animated metric card)

## What's intentionally not in this PR

- No backend wiring — everything reads from `src/lib/mockData.ts`
- No auth gating on the dashboard route yet
- No bank connection / statement upload UI yet (next milestone)

## How to review

```bash
npm install
npm run build   # verify clean build
npm run dev      # localhost:5173 — homepage is the new dashboard
```

Typecheck (`tsc -b`) and `vite build` both pass clean. `eslint` has 2
pre-existing-pattern warnings in untouched legacy files — noted in
`HOW_TO_APPLY.md`, not introduced by this change.

## Follow-up: light/dark theming + real logo

A second pass on top of the initial dashboard shell:

- **Token system restructured for theming.** `src/styles/tokens.css`
  now defines semantic tokens (`--color-bg`, `--color-surface`,
  `--color-text-primary`, etc.) that resolve differently under
  `[data-theme="light"]` vs `[data-theme="dark"]`, instead of one fixed
  dark palette. **Light is the default theme.**
- **Theme toggle** in the rail (desktop) / header (mobile), via
  `useTheme` + `ThemeProvider` (`src/hooks/useTheme.tsx`). Choice
  persists to `localStorage`; an inline script in `index.html` applies
  it before React mounts to avoid a flash of the wrong theme.
- **Every component audited and fixed** for theme-independence — this
  was the bulk of the work. Things like `bg-white/[0.04]` hover washes
  or `text-ink`/`bg-paper` assumptions look fine in dark mode but are
  broken (invisible or low-contrast) in light mode; all replaced with
  semantic `bg-overlay-*` / `bg-surface-sunken` tokens that adapt.
  Light-mode teal/coral/amber were also darkened slightly from their
  dark-mode values to hold AA contrast on a white card.
- **Real logo integrated** — `src/components/common/Logo/Logo.tsx`,
  the hand-drawn scribble mark you provided, recolored from green to
  the app's violet accent per your direction, with theme-aware strokes
  so it stays legible in both modes. Replaces the placeholder "F" mark
  in the rail/header. Also used as `public/flux-favicon.svg` (a static
  copy, since favicons can't read CSS variables).

### Note on Figma

You mentioned Figma is now connected for confirming designs going
forward — I wasn't able to pull from it for this round (the connector
showed as not yet linked in this session when I checked), so this pass
is still based on the original design direction we discussed, not a
Figma source of truth. Happy to reconcile against Figma next round
once the connection is confirmed live.

## Screenshots

_Please add screenshots here after running `npm run dev` locally — I
wasn't able to render/screenshot the UI from my environment. Worth
checking both the light (default) and dark (toggle) states._


