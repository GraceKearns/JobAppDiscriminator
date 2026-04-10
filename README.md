# JobAppDirectory

JobAppDirectory is a Next.js web app for tracking job applications, notes, stats, and scan-based intake from external services.

## Features

- Google-based sign-in with NextAuth
- Application tracking and status management
- Notes editing per application
- Dashboard and charts for application analytics
- Email scan trigger that sends work to the API Gateway/worker pipeline

## Tech Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Prisma (PostgreSQL datasource)
- NextAuth
- Chart.js / react-chartjs-2

## Prerequisites

- Node.js 20+
- npm 10+
- A PostgreSQL database

## Environment Variables

Create a `.env.local` file in this folder with values like:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/jobapp

NEXTAUTH_SECRET=replace-with-long-random-secret
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

TOKEN_ENCRYPTION_KEY=64_hex_characters

API_GATEWAY_URL=http://127.0.0.1:8000
API_GATEWAY_KEY=your-api-gateway-key
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

App URL:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - run production server
- `npm run lint` - run lint checks

## Project Structure

- `src/app` - routes, pages, and API endpoints
- `src/app/components` - reusable UI components
- `src/context` - React context providers
- `src/util` - shared helpers and DB setup
- `prisma/schema.prisma` - Prisma data model

## Related Services

This frontend can work with the other services in the workspace:

- `APIGateway` for secure `/process` request handling
- `Worker` for scan processing and email fetch flow
- `WorkerAI` for AI extraction pipeline

Run those services if you want Scan Inbox functionality end-to-end.
