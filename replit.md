# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   ├── mockup-sandbox/     # Vite mockup preview server
│   └── smart-study-planner/ # React + Vite frontend app (main product)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Smart Study Planner App

### Overview

A premium frontend-only study planning app for MSBTE Diploma and BTech students. All data is stored in localStorage.

### Design

- **Theme**: Luxury Dark Mode
- **Colors**: Deep Matte Black (#0F0F0F), Rich Gold (#D4AF37), Warm White (#F5F5F5)
- **Fonts**: Poppins (headings), Inter (body)
- **Effects**: Glassmorphism cards, gold glow hovers, framer-motion animations

### Pages & Routes

- `/` — Landing page with hero, features section
- `/login` — Login/Register with glass card design
- `/setup` — 6-step onboarding: course → branch → year → semester → subjects → study config
- `/dashboard` — Stats, today's schedule, predicted score
- `/planner` — Weekly timetable grid generator
- `/quiz` — 5-question demo quiz with scoring
- `/progress` — Analytics with recharts, circular progress bars

### MSBTE K-Scheme Data

Located in `artifacts/smart-study-planner/src/lib/data.ts`:
- **Diploma Computer Engineering**: Semesters 1–6 with proper subject codes
- **BTech Computer Engineering**: Semesters 1–8

### Key Dependencies (Frontend)

- `framer-motion` — Animations and transitions
- `recharts` — Charts and data visualization
- `wouter` — Client-side routing
- `date-fns` — Date formatting
- `lucide-react` — Icons
- `clsx` + `tailwind-merge` — Class utilities

### Context & State

- `AppContext` — User auth, setup config, localStorage persistence
- No backend calls needed — fully frontend-only

### Auth Flow

- Public routes: `/`, `/login`
- Protected routes: `/dashboard`, `/planner`, `/quiz`, `/progress`, `/setup`
- Demo credentials: demo@study.com / demo123
- After login: if setup not done → `/setup`, else → `/dashboard`

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Currently has only a health check endpoint.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Schema is currently empty.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec and Orval config. Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec.
