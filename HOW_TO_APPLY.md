# Applying the Flux dashboard UI to flux-frontend

I don't have a GitHub connector active in this chat, so I built and
verified everything locally (typecheck + production build both pass)
but couldn't push the branch or open the PR myself. Here's how to do
it in ~2 minutes.

## 1. Unzip into your repo

```bash
cd /path/to/flux-frontend
git checkout -b feature/dashboard-ui-shell

# unzip the contents on top of your existing repo, allow overwrite
unzip -o ~/Downloads/flux-frontend-dashboard-ui.zip -d .

git status   # review what changed
```

## 2. Install the new dependencies and verify

```bash
npm install
npm run build      # tsc -b && vite build — should pass clean
npm run lint        # 2 pre-existing warnings remain, see "Known issues" below
npm run dev          # eyeball it at localhost:5173
```

## 3. Commit and push

```bash
git add -A
git commit -m "Rebuild homepage as tabbed dashboard with new design system

- New design token system (colors, type, spacing, motion) in src/styles/tokens.css
- Reusable component library in src/components/common (Button, Card, Tabs,
  Badge, Avatar, ProgressBar, Input, Autocomplete, Modal, Tooltip, Skeleton)
- New AppShell layout with animated rail navigation (liquid tab indicator)
- Four feature pages on mock data: Overview, Transactions, Bills & Splits, Budgets
- Signature FlowBar visual + Recharts trend chart + animated StatCards
- Homepage (/) now renders the dashboard; /login and /register untouched
- Added framer-motion-driven animations throughout (respects prefers-reduced-motion)"

git push -u origin feature/dashboard-ui-shell
```

## 4. Open the PR

```bash
gh pr create \
  --repo harihara0072/flux-frontend \
  --base main \
  --head feature/dashboard-ui-shell \
  --title "New dashboard UI shell: design system + Overview/Transactions/Bills/Budgets" \
  --body-file PR_DESCRIPTION.md
```

(Or open it manually on github.com — same branch/base.)

I did **not** merge anything — this only pushes a branch and opens the
PR for your review, per your instructions.

## What's in this milestone

- UI only. All four feature pages render from `src/lib/mockData.ts`,
  not the Django API. Wiring to real endpoints is a follow-up milestone.
- Auth flow (`/register`, `/login`) is untouched — same components, same
  logic, just copied over so the repo still builds as a whole.
- The homepage (`/`) is **not** gated behind auth yet — that's intentional
  for this milestone per your instructions ("we can work on the
  authentication and registration part later").

## Known issues / left for follow-up

- `npm run lint` reports 2 pre-existing-pattern warnings in code I didn't
  touch this milestone (`StepOneName.tsx`'s `any` prop type, and a
  react-refresh warning in `useAuth.tsx` from exporting a hook + provider
  from one file). Both predate this change; flagging rather than
  silently fixing since they're outside this milestone's scope.
- The production JS bundle is ~777kB (235kB gzipped), mostly from
  `recharts` + `framer-motion`. Fine for now; worth revisiting with
  route-based code-splitting once there are more pages.
- No screenshot/visual QA was possible in my environment (no headless
  browser available to me) — please eyeball `npm run dev` before merging.
