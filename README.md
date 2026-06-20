# flux-frontend

Flux is a personal finance app: connect bank accounts or upload statements,
auto-categorize transactions, set budget limits, split bills with friends,
and see it all in a fast, modern dashboard.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS (design tokens in `src/styles/tokens.css`)
- Framer Motion for animation
- Recharts for data visualization
- React Router

## Project structure

```
src/
  components/
    common/      # Reusable, domain-agnostic UI primitives (Button, Card, Tabs,
                  Autocomplete, Modal, etc). Import via `components/common`.
    charts/      # Data-viz building blocks (FlowBar, TrendChart, StatCard)
    layout/      # App shell / navigation chrome
    ui/          # Legacy auth-flow-specific components (pre-dates the
                  common library; slated for consolidation)
  features/      # Page-level feature modules (dashboard, transactions, bills, budgets)
  flows/auth/    # Multi-step registration flow
  hooks/         # Shared React hooks (useAuth, etc.)
  lib/           # Utilities + mock data (mock data is temporary, see below)
  pages/         # Route-level page components
  styles/        # Design tokens
  types/         # Shared TypeScript types
```

## Current milestone: UI shell

This pass rebuilds the homepage as a tabbed dashboard (Overview,
Transactions, Bills & Splits, Budgets) using a new reusable component
library and design system, wired to **mock data** in `src/lib/mockData.ts`.
Real API integration, auth-gating of the dashboard, and bank
connection/statement upload are follow-up milestones.

## Theming

Flux opens in **light mode by default**. A toggle in the rail (desktop)
or header (mobile) switches to dark; the choice persists via
`localStorage` (`useTheme` hook + `ThemeProvider`). All components
reference semantic CSS variables (`--color-bg`, `--color-surface`,
`--color-text-primary`, etc., defined in `src/styles/tokens.css`) keyed
off `[data-theme="light"|"dark"]` on `<html>` — never hardcode a raw
hex or a `bg-white/[x]` opacity trick, since that breaks one of the
two themes. An inline script in `index.html` applies the saved theme
before React mounts, to avoid a flash of the wrong theme on load.

## Logo

`src/components/common/Logo/Logo.tsx` is the hand-drawn "scribble" Flux
mark, recolored to the violet brand accent (provided by design in green;
swapped to match the app's primary accent). It reads `--color-violet`
and `--color-text-primary` directly, so it adapts automatically between
themes. Use `<Logo size={36} />` for the full lockup or
`<Logo markOnly />` for just the mark in tight spaces. `public/flux-favicon.svg`
is a static (non-theme-aware) copy for the browser tab icon.

## Getting started

```bash
npm install
npm run dev
```

Set `VITE_API_URL` in a `.env` file for the parts of the app that still
talk to the Django backend (registration flow).
