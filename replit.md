# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: Replit PostgreSQL + Drizzle ORM
- **Auth**: Supabase Auth (email/password)
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server (profile, config, quiz, sessions routes)
│   ├── mockup-sandbox/     # Vite mockup preview server
│   └── smart-study-planner/ # React + Vite frontend app (main product)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
└── pnpm-workspace.yaml     # pnpm workspace config
```

## Smart Study Planner App

### Overview

A full-stack premium study planning app for MSBTE K-Scheme Diploma and BTech students.
- **Auth**: Supabase Auth (email/password sign-up and sign-in)
- **Data**: All user data persisted to Replit PostgreSQL via API server
- **Frontend**: React + Vite with luxury dark mode design

### Design

- **Theme**: Luxury Dark Mode
- **Colors**: Deep Matte Black (#0F0F0F), Rich Gold (#D4AF37), Warm White (#F5F5F5)
- **Fonts**: Poppins (headings), Inter (body)
- **Effects**: Glassmorphism cards, gold glow hovers, framer-motion animations

### Pages & Routes

- `/` — Landing page with hero, features section
- `/login` — Login/Register with Supabase Auth (real email/password)
- `/setup` — 6-step onboarding: course → branch → year → semester → subjects → study config (saved to DB)
- `/dashboard` — Real stats from DB: study sessions, quiz results, predicted score
- `/planner` — Weekly timetable grid; mark sessions as complete (saves to DB)
- `/quiz` — 10-question quiz with scoring; save result to DB
- `/progress` — Analytics with recharts from real DB data (quiz history, subject progress)

### MSBTE K-Scheme Data

Located in `artifacts/smart-study-planner/src/lib/msbte-data.ts` (re-exported via `data.ts`):

**Diploma branches (6 semesters each)**:
- Computer Engineering, Information Technology, Electronics & Telecommunication
- Mechanical Engineering, Civil Engineering, Electrical Engineering, Automobile Engineering, Chemical Engineering

**BTech branches (8 semesters each)**:
- Computer Engineering, Information Technology, Electronics Engineering
- Mechanical Engineering, Civil Engineering, Electrical Engineering

### Key Frontend Files

- `src/lib/supabase.ts` — Supabase client (uses VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- `src/lib/api.ts` — API utility for all backend calls
- `src/lib/msbte-data.ts` — Full MSBTE K-Scheme subject data (all branches + semesters)
- `src/lib/data.ts` — Re-exports from msbte-data.ts for backward compatibility
- `src/context/AppContext.tsx` — Supabase Auth integration + API data loading

### Database Schema

Located in `lib/db/src/schema/index.ts`:
- `profiles` — User profile (supabaseId, name, email, college)
- `study_configs` — Study configuration (courseType, branch, semester, subjects JSON, studySettings JSON)
- `quiz_results` — Quiz results (score, total, percentage, subject)
- `study_sessions` — Study sessions (subjectName, hours, sessionDate, completed, topic)

### API Endpoints (`/api/...`)

- `GET/POST /profile` — User profile
- `GET/POST /config` — Study configuration
- `GET/POST /quiz` — Quiz results
- `GET/POST /sessions` — Study sessions

### Environment Variables

- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (server-side, unused for now)
- `DATABASE_URL`, `PGHOST`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`, `PGPORT` — Replit PostgreSQL

### Auth Flow

- Public routes: `/`, `/login`
- Protected routes: `/dashboard`, `/planner`, `/quiz`, `/progress`, `/setup`
- After login: if no setup config in DB → `/setup`, else → `/dashboard`
- Signup: creates Supabase user + profile in PostgreSQL via API

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
- `pnpm --filter @workspace/db run push` — push Drizzle schema to Replit PostgreSQL
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client from OpenAPI spec

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server with routes: health, profile, config, quiz, sessions.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Schema: profiles, study_configs, quiz_results, study_sessions.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec and Orval config. Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec.
