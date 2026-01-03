import { CodeBlock, Callout } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Data Flow | Developer Guide',
  description: 'How data moves through the system',
};

export default function DataFlowPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Developer Guide' },
          { label: 'Data Flow' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Data Flow
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Understand how event data moves from Luma to your users&apos; browsers.
        </p>
      </header>

      {/* Overview Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="overview">
          Overview
        </h2>
        <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
          <pre className="text-sm text-slate-200 font-mono">
{`┌──────────────┐
│   Luma API   │ ← Source of Truth
└──────┬───────┘
       │
       ├────────────────────┬────────────────────┐
       │                    │                    │
       ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Cron Sync   │    │  Webhooks    │    │ Future: API  │
│  (5 min)     │    │  (instant)   │    │              │
└──────┬───────┘    └──────┬───────┘    └──────────────┘
       │                   │
       └─────────┬─────────┘
                 │
                 ▼
       ┌──────────────────┐
       │   Transform      │ ← lib/luma.ts
       │   Event Data     │
       └────────┬─────────┘
                │
       ┌────────┴─────────┐
       │                  │
       ▼                  ▼
┌──────────────┐   ┌──────────────┐
│ JSON Storage │   │  Supabase    │
│  (scaffold)  │   │ (production) │
└──────┬───────┘   └──────┬───────┘
       │                  │
       └────────┬─────────┘
                │
                ▼
       ┌──────────────────┐
       │  getEvents()     │ ← lib/get-events.ts
       │  Server Fetch    │
       └────────┬─────────┘
                │
                ▼
       ┌──────────────────┐
       │   Next.js Page   │ ← Server Component
       │   (ISR: 60s)     │
       └────────┬─────────┘
                │
                ▼
       ┌──────────────────┐
       │   User Browser   │
       └──────────────────┘`}
          </pre>
        </div>
      </section>

      {/* Sync Flow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="sync">
          1. Sync Flow (Cron)
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Every 5 minutes, Vercel triggers the sync endpoint:
        </p>
        <CodeBlock
          code={`// api/cron/sync-luma/route.ts

export async function GET(request: Request) {
  // 1. Verify authentication
  const authHeader = request.headers.get('authorization');
  if (!isValidAuth(authHeader)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Fetch events from Luma
  const lumaEvents = await fetchLumaEvents();

  // 3. Transform to our schema
  const events = lumaEvents.map(transformLumaEvent);

  // 4. Upsert into database
  for (const event of events) {
    await upsertEvent(event);
  }

  // 5. Return result
  return Response.json({
    success: true,
    synced: events.length,
    timestamp: new Date().toISOString()
  });
}`}
          language="typescript"
        />
      </section>

      {/* Webhook Flow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="webhooks">
          2. Webhook Flow (Real-time)
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Luma sends webhooks for instant updates:
        </p>
        <CodeBlock
          code={`// api/webhooks/luma/route.ts

export async function POST(request: Request) {
  // 1. Parse payload
  const payload = await request.json();

  // 2. Handle by event type
  switch (payload.type) {
    case 'event.created':
    case 'event.updated':
      await upsertEvent(transformLumaEvent(payload.data.event));
      break;

    case 'event.deleted':
      await markEventCancelled(payload.data.event.api_id);
      break;

    case 'guest.created':
    case 'ticket.created':
      await updateSpotsRemaining(payload.data.event.api_id);
      break;
  }

  return Response.json({ success: true });
}`}
          language="typescript"
        />
      </section>

      {/* Transformation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="transform">
          3. Data Transformation
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Luma&apos;s event format is transformed to our internal schema:
        </p>
        <CodeBlock
          code={`// lib/luma.ts

export function transformLumaEvent(lumaEvent: LumaEvent): Event {
  return {
    luma_id: lumaEvent.api_id,
    luma_url: lumaEvent.url,
    title: lumaEvent.name,
    description: lumaEvent.description,

    // Speaker info from first host
    speaker_name: lumaEvent.hosts?.[0]?.name ?? null,
    speaker_role: lumaEvent.hosts?.[0]?.bio ?? null,
    speaker_image_url: lumaEvent.hosts?.[0]?.avatar_url ?? null,

    // Venue info
    venue_name: lumaEvent.geo_address_info?.name ?? null,
    venue_address: lumaEvent.geo_address_info?.full_address ?? null,

    // Timing
    starts_at: lumaEvent.start_at,
    ends_at: lumaEvent.end_at ?? null,

    // Capacity
    total_spots: lumaEvent.ticket_info?.total_capacity ?? null,
    spots_remaining: lumaEvent.ticket_info?.spots_remaining ?? null,
    is_sold_out: lumaEvent.ticket_info?.is_sold_out ?? false,

    // Status
    status: determineStatus(lumaEvent),
    is_featured: false,
    synced_at: new Date().toISOString()
  };
}`}
          language="typescript"
        />
      </section>

      {/* Fetching */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="fetch">
          4. Fetching Events
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Server components fetch events for rendering:
        </p>
        <CodeBlock
          code={`// lib/get-events.ts

export async function getDisplayEvents(limit = 6): Promise<Event[]> {
  // In scaffold mode, read from JSON
  if (isScaffoldMode()) {
    return readEventsFromJson()
      .filter(e => e.status === 'upcoming')
      .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())
      .slice(0, limit);
  }

  // In production, query Supabase
  const supabase = createServerClient();
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'upcoming')
    .order('starts_at', { ascending: true })
    .limit(limit);

  return data ?? [];
}`}
          language="typescript"
        />
      </section>

      {/* Page Rendering */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="render">
          5. Page Rendering
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          The homepage uses ISR for near-real-time updates:
        </p>
        <CodeBlock
          code={`// app/page.tsx

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch events at build/revalidation time
  const events = await getDisplayEvents(6);

  return (
    <main>
      <LandingPageClient initialEvents={events} />
    </main>
  );
}`}
          language="typescript"
        />
        <Callout type="info" title="Incremental Static Regeneration">
          Pages are pre-rendered at build time and regenerated in the background
          every 60 seconds. Users always see fast, cached pages with fresh data.
        </Callout>
      </section>

      <PageNavigation />
    </div>
  );
}
