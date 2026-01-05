import { CodeBlock, Callout, Note } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Architecture | Documentation',
  description: 'Understand the system architecture and data flow',
};

export default function ArchitecturePage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Architecture' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Architecture Overview
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          A deep dive into how The Knowledge Parlour is built and how data flows through the system.
        </p>
      </header>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="tech-stack">
          Tech Stack
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <TechCard
            name="Next.js 15"
            description="Full-stack React framework with App Router"
            category="Framework"
          />
          <TechCard
            name="React 18"
            description="UI library with Server Components"
            category="Frontend"
          />
          <TechCard
            name="TypeScript"
            description="Type-safe JavaScript for reliability"
            category="Language"
          />
          <TechCard
            name="Tailwind CSS"
            description="Utility-first styling with custom theme"
            category="Styling"
          />
          <TechCard
            name="Supabase"
            description="PostgreSQL database with real-time features"
            category="Database"
          />
          <TechCard
            name="Vercel"
            description="Edge deployment with cron job support"
            category="Hosting"
          />
        </div>
      </section>

      {/* System Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="system-diagram">
          System Diagram
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          The platform uses a two-way sync architecture with Luma as the source of truth for events:
        </p>
        <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
          <pre className="text-sm text-slate-200 font-mono whitespace-pre">
{`┌─────────────────────────────────────────────────────────────────────────────┐
│                              LUMA API (External)                            │
│              https://api.lu.ma/v1/calendar/list-events                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
         ┌────────────────────────────┼───────────────────────────┐
         │                            │                           │
         ▼                            ▼                           ▼
┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
│    Cron Job     │        │    Webhooks     │        │   Direct API    │
│  Every 5 min    │        │   Real-time     │        │    (Future)     │
│     (GET)       │        │    (POST)       │        │                 │
└────────┬────────┘        └────────┬────────┘        └─────────────────┘
         │                          │
         └──────────┬───────────────┘
                    │
                    ▼
         ┌─────────────────┐
         │  Transform to   │
         │  Event Schema   │
         │ (lib/luma.ts)   │
         └────────┬────────┘
                  │
    ┌─────────────┴───────────────┐
    │                             │
    ▼                             ▼
┌─────────────────┐    ┌─────────────────┐
│ Local Storage   │    │    Supabase     │
│ /data/events    │    │  events table   │
│   (Scaffold)    │    │  (Production)   │
└────────┬────────┘    └────────┬────────┘
         │                      │
         └──────────┬───────────┘
                    │
                    ▼
         ┌─────────────────┐
         │  getEvents()    │
         │  Server Fetch   │
         └────────┬────────┘
                  │
                  ▼
         ┌─────────────────┐
         │   Landing Page  │
         │   (React SSR)   │
         └────────┬────────┘
                  │
                  ▼
         ┌─────────────────┐
         │   User Browser  │
         └─────────────────┘`}
          </pre>
        </div>
      </section>

      {/* Data Flow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="data-flow">
          Data Flow
        </h2>

        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6">
          1. Scheduled Sync (Cron)
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Every 5 minutes, Vercel triggers the <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">/api/cron/sync-luma</code> endpoint:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>Fetches all events from Luma&apos;s calendar API</li>
          <li>Transforms each event to our internal schema</li>
          <li>Upserts events into the database (insert or update)</li>
          <li>Returns count of synced events</li>
        </ol>

        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6">
          2. Real-time Updates (Webhooks)
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          For instant updates, Luma sends webhooks to <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">/api/webhooks/luma</code>:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li><strong>event.created</strong> - New event added</li>
          <li><strong>event.updated</strong> - Event details changed</li>
          <li><strong>event.deleted</strong> - Event cancelled</li>
          <li><strong>guest.created</strong> - Someone registered</li>
          <li><strong>ticket.created</strong> - Ticket purchased</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6">
          3. Page Rendering
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          The landing page uses Incremental Static Regeneration (ISR):
        </p>
        <CodeBlock
          code={`// In page.tsx
export const revalidate = 60; // Revalidate every 60 seconds`}
          language="typescript"
        />
        <p className="text-slate-600 dark:text-slate-300">
          This means pages are statically generated but refreshed every minute for near-real-time data.
        </p>
      </section>

      {/* Database Schema */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="database">
          Database Schema
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          The main <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">events</code> table stores all lecture information:
        </p>
        <CodeBlock
          code={`CREATE TABLE events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  luma_id         TEXT UNIQUE NOT NULL,    -- External Luma ID
  luma_url        TEXT NOT NULL,           -- Ticket purchase URL
  title           TEXT NOT NULL,
  description     TEXT,
  speaker_name    TEXT,
  speaker_role    TEXT,
  speaker_image_url TEXT,
  venue_name      TEXT,
  venue_address   TEXT,
  starts_at       TIMESTAMPTZ NOT NULL,
  ends_at         TIMESTAMPTZ,
  total_spots     INTEGER,
  spots_remaining INTEGER,
  is_sold_out     BOOLEAN DEFAULT FALSE,
  status          TEXT CHECK (status IN ('upcoming','live','past','cancelled')),
  is_featured     BOOLEAN DEFAULT FALSE,
  synced_at       TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);`}
          language="sql"
          filename="supabase/schema.sql"
        />

        <Callout type="info" title="Row-Level Security">
          The database uses RLS policies to ensure events are publicly readable but only
          modifiable via the service role (server-side).
        </Callout>
      </section>

      {/* Scaffold Mode */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="scaffold-mode">
          Scaffold Mode
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          For development without Supabase, the app runs in &quot;scaffold mode&quot; using local JSON files:
        </p>
        <CodeBlock
          code={`// data/events.json
{
  "events": [
    {
      "id": "demo-1",
      "luma_id": "evt_demo_1",
      "title": "The Neuroscience of Decision-Making",
      "speaker_name": "Dr. Sarah Chen",
      ...
    }
  ]
}`}
          language="json"
        />
        <Note>
          The local storage adapter (<code>lib/local-storage.ts</code>) mimics the Supabase interface,
          making it easy to switch between modes by changing imports.
        </Note>
      </section>

      {/* Security */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="security">
          Security Model
        </h2>
        <div className="space-y-4">
          <SecurityItem
            title="API Authentication"
            description="Cron endpoints are protected by bearer token (CRON_SECRET) or Vercel's built-in cron verification."
          />
          <SecurityItem
            title="Webhook Verification"
            description="Optional HMAC signature verification for Luma webhooks using LUMA_WEBHOOK_SECRET."
          />
          <SecurityItem
            title="Database Security"
            description="Row-Level Security (RLS) policies restrict write access to service role only."
          />
          <SecurityItem
            title="Environment Variables"
            description="Secrets stored in environment variables, never committed to source control."
          />
        </div>
      </section>

      <PageNavigation />
    </div>
  );
}

function TechCard({
  name,
  description,
  category,
}: {
  name: string;
  description: string;
  category: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
        {category}
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white">{name}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {description}
      </p>
    </div>
  );
}

function SecurityItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <span className="text-green-500 mt-0.5">🔒</span>
      <div>
        <h4 className="font-medium text-slate-900 dark:text-white">{title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
}
