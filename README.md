# Job Portal Admin

A fully functional Admin Portal for managing job listings, built as part of a Senior Frontend Developer machine test.

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** — fast development build tool
- **Redux Toolkit** — state management (slices, thunks, selectors)
- **React Router v6** — client-side routing with protected routes
- **Axios** — HTTP client for API integration
- **JSON Server** — mock REST API with persistent data
- **React Hook Form + Zod** — form handling and validation
- **Tailwind CSS v3** — utility-first styling
- **shadcn/ui** — accessible UI component library
- **Lucide React** — icon library
- **date-fns** — date formatting
- **Sonner** — toast notifications

## Features

- 🔐 Admin authentication with protected routes
- 📊 Dashboard with stat cards and recent jobs table
- 📋 Job listings with category and experience level filters
- ➕ Create job with full form validation
- ✏️ Edit job with prefilled form values
- 🗑️ Delete job with confirmation dialog
- 🔔 Toast notifications for all CRUD operations
- 📱 Fully responsive — mobile, tablet, desktop
- 💾 Auth state persisted in localStorage
- ⚡ Loading, empty, and error states throughout

## Pages

| Route                  | Description                              |
| ---------------------- | ---------------------------------------- |
| `/admin/login`         | Admin login page                         |
| `/admin/dashboard`     | Dashboard with stats and recent jobs     |
| `/admin/jobs`          | Job listings with filters and pagination |
| `/admin/jobs/new`      | Create new job                           |
| `/admin/jobs/:id/edit` | Edit existing job                        |

## Project Structure

```
src/
├── app/              # Redux store
├── components/       # Reusable UI components
│   ├── common/       # Custom components
│   └── ui/           # shadcn auto-generated
├── features/         # Feature-based modules
│   ├── auth/         # Auth slice, selectors, types, schema
│   └── jobs/         # Jobs slice, selectors, types, schema
├── hooks/            # Typed Redux hooks
├── layouts/          # AdminLayout, AuthLayout
├── lib/              # Axios instance, utilities
├── pages/            # Page components
├── routes/           # AppRoutes, ProtectedRoute
├── services/         # API service functions
├── constants/        # App-wide constants and regex patterns
├── types/            # Global TypeScript interfaces
└── utils/            # Helper functions
```

## Prerequisites

- Node.js v18+
- npm v9+

## Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/PeerMd/job-portal-admin.git
cd job-portal-admin
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

```bash
cp .env.example .env
```

The `.env` file contains:

```
VITE_API_BASE_URL=http://localhost:3001
```

**4. Start the development server**

```bash
npm run dev
```

This starts both:

- React app at `http://localhost:5173`
- JSON Server at `http://localhost:3001`

## Admin Credentials

| Field    | Value      |
| -------- | ---------- |
| Username | `admin`    |
| Password | `admin123` |

## API Endpoints

JSON Server automatically exposes these endpoints from `db.json`:

| Method | Endpoint    | Description     |
| ------ | ----------- | --------------- |
| GET    | `/jobs`     | Fetch all jobs  |
| GET    | `/jobs/:id` | Fetch job by ID |
| POST   | `/jobs`     | Create new job  |
| PUT    | `/jobs/:id` | Update job      |
| DELETE | `/jobs/:id` | Delete job      |

## Scripts

| Script            | Description                     |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start both Vite and JSON Server |
| `npm run build`   | Build for production            |
| `npm run lint`    | Run ESLint                      |
| `npm run preview` | Preview production build        |

## Repository

[https://github.com/PeerMd/job-portal-admin](https://github.com/PeerMd/job-portal-admin)
