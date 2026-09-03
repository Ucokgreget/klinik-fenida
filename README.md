# Klinik Fenida

Website for Klinik Fenida. Monorepo with two apps:

| Folder   | Stack                                      | Default port |
| -------- | ------------------------------------------ | ------------ |
| frontend | Next.js 16, React 19, Tailwind CSS 4, shadcn | 3000        |
| backend  | Bun, Hono                                   | 8080        |

> Frontend runs on 3000, backend on 8080.

## Prerequisites

- **Node.js** ≥ 20 (for the frontend)
- **Bun** ≥ 1 (for the backend) — install: <https://bun.sh>

## Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open <http://localhost:3000>.

### Backend

```bash
cd backend
bun install
bun run dev
```

Serves on <http://localhost:8080>.

## Available scripts

**frontend/** — `npm run <script>`

| Script | Description            |
| ------ | ---------------------- |
| `dev`  | Start dev server       |
| `build`| Production build       |
| `start`| Serve production build |
| `lint` | Run ESLint             |

**backend/** — `bun run <script>`

| Script | Description                      |
| ------ | -------------------------------- |
| `dev`  | Start dev server with hot reload |

## Project structure

```text
frontend/
  src/app/        # Next.js App Router pages
  src/components/ # UI components (shadcn)
  src/lib/        # Utilities (e.g. cn helper)
backend/
  src/index.ts    # Hono app entry point
```
