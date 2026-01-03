import { CodeBlock, Callout } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Project Structure | Developer Guide',
  description: 'Navigate the Knowledge Parlour codebase',
};

export default function ProjectStructurePage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Developer Guide' },
          { label: 'Project Structure' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Project Structure
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Understand how the codebase is organized and where to find things.
        </p>
      </header>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="overview">
          Directory Overview
        </h2>
        <CodeBlock
          code={`knowledge-parlour/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── cron/          # Scheduled jobs
│   │   │   └── webhooks/      # Webhook handlers
│   │   ├── docs/              # Documentation pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── docs/              # Documentation components
│   │   └── landing-page-client.tsx
│   ├── lib/                   # Utility libraries
│   │   ├── supabase.ts        # Database client
│   │   ├── luma.ts            # Luma API client
│   │   ├── local-storage.ts   # Scaffold storage
│   │   ├── get-events.ts      # Event fetching
│   │   └── docs-config.ts     # Docs configuration
│   └── types/                 # TypeScript types
│       └── event.ts           # Event interfaces
├── data/                      # Local data (scaffold mode)
│   └── events.json            # Demo events
├── supabase/                  # Database
│   └── schema.sql             # Database schema
├── public/                    # Static assets
├── .env.example               # Environment template
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies`}
          language="plaintext"
        />
      </section>

      {/* App Directory */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="app">
          App Directory
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          The <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">src/app</code> directory
          uses Next.js 15 App Router conventions:
        </p>
        <div className="space-y-4">
          <FileExplain
            path="app/page.tsx"
            description="The homepage at /. Fetches and displays upcoming events."
          />
          <FileExplain
            path="app/layout.tsx"
            description="Root layout with fonts, metadata, and global providers."
          />
          <FileExplain
            path="app/globals.css"
            description="Global styles, Tailwind imports, and custom CSS."
          />
          <FileExplain
            path="app/api/"
            description="API routes. Each route.ts file becomes an endpoint."
          />
          <FileExplain
            path="app/docs/"
            description="Documentation pages with their own layout."
          />
        </div>
      </section>

      {/* API Routes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="api">
          API Routes
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Server-side endpoints for data synchronization:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 pr-4 font-medium text-slate-500 dark:text-slate-400">
                  File
                </th>
                <th className="text-left py-3 pr-4 font-medium text-slate-500 dark:text-slate-400">
                  Endpoint
                </th>
                <th className="text-left py-3 font-medium text-slate-500 dark:text-slate-400">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-300">
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 pr-4 font-mono text-xs">api/cron/sync-luma/route.ts</td>
                <td className="py-3 pr-4 font-mono text-xs">GET /api/cron/sync-luma</td>
                <td className="py-3">Sync events from Luma</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 pr-4 font-mono text-xs">api/webhooks/luma/route.ts</td>
                <td className="py-3 pr-4 font-mono text-xs">POST /api/webhooks/luma</td>
                <td className="py-3">Receive Luma webhooks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="components">
          Components
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          React components organized by feature:
        </p>
        <div className="space-y-4">
          <FileExplain
            path="components/landing-page-client.tsx"
            description="Main landing page with events, FAQ, and CTAs. Client component for animations."
          />
          <FileExplain
            path="components/docs/"
            description="Documentation-specific components: CodeBlock, Tabs, Callout, Sidebar, etc."
          />
          <FileExplain
            path="components/docs/index.ts"
            description="Barrel export for clean imports."
          />
        </div>
        <Callout type="tip" title="Component Conventions">
          <ul className="space-y-1 text-sm">
            <li>• Use &quot;use client&quot; directive for interactive components</li>
            <li>• Keep components small and focused</li>
            <li>• Extract reusable logic into custom hooks</li>
            <li>• Co-locate related components in folders</li>
          </ul>
        </Callout>
      </section>

      {/* Lib Directory */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="lib">
          Lib Directory
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Shared utilities and business logic:
        </p>
        <div className="space-y-4">
          <FileExplain
            path="lib/supabase.ts"
            description="Supabase client factory. Exports createServerClient() and createBrowserClient()."
          />
          <FileExplain
            path="lib/luma.ts"
            description="Luma API client. Handles authentication, event fetching, and data transformation."
          />
          <FileExplain
            path="lib/local-storage.ts"
            description="Scaffold mode storage. Mimics Supabase interface for local development."
          />
          <FileExplain
            path="lib/get-events.ts"
            description="Event fetching logic. Abstracts storage layer (local vs Supabase)."
          />
          <FileExplain
            path="lib/docs-config.ts"
            description="Documentation structure and API endpoint definitions."
          />
        </div>
      </section>

      {/* Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="types">
          Types Directory
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          TypeScript interfaces and type definitions:
        </p>
        <CodeBlock
          code={`// types/event.ts
export interface Event {
  id: string;
  luma_id: string;
  luma_url: string;
  title: string;
  description: string | null;
  speaker_name: string | null;
  speaker_role: string | null;
  speaker_image_url: string | null;
  venue_name: string | null;
  venue_address: string | null;
  starts_at: string;
  ends_at: string | null;
  total_spots: number | null;
  spots_remaining: number | null;
  is_sold_out: boolean;
  status: 'upcoming' | 'live' | 'past' | 'cancelled';
  is_featured: boolean;
  synced_at: string;
  created_at: string;
}`}
          language="typescript"
        />
      </section>

      {/* Data Directory */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="data">
          Data Directory
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Local storage for scaffold mode:
        </p>
        <div className="space-y-4">
          <FileExplain
            path="data/events.json"
            description="Demo events for local development. Updated by cron job and webhooks in scaffold mode."
          />
        </div>
        <Callout type="info" title="Scaffold Mode">
          In scaffold mode, the app reads/writes to JSON files instead of Supabase.
          This allows development without external dependencies.
        </Callout>
      </section>

      {/* Key Files */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="config">
          Configuration Files
        </h2>
        <div className="space-y-4">
          <FileExplain
            path="tailwind.config.ts"
            description="Tailwind CSS configuration with custom colors, fonts, and animations."
          />
          <FileExplain
            path="tsconfig.json"
            description="TypeScript configuration with path aliases (@/ for src/)."
          />
          <FileExplain
            path="next.config.ts"
            description="Next.js configuration for images, redirects, etc."
          />
          <FileExplain
            path=".env.example"
            description="Template for environment variables. Copy to .env.local."
          />
          <FileExplain
            path="vercel.json"
            description="Vercel deployment configuration including cron schedules."
          />
        </div>
      </section>

      <PageNavigation />
    </div>
  );
}

function FileExplain({
  path,
  description,
}: {
  path: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <div className="flex-shrink-0 text-amber-500">📄</div>
      <div>
        <code className="text-sm font-mono text-amber-600 dark:text-amber-400">{path}</code>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{description}</p>
      </div>
    </div>
  );
}
