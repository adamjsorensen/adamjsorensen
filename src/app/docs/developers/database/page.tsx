import { CodeBlock, Callout } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Database Setup | Developer Guide',
  description: 'Set up Supabase and run migrations',
};

export default function DatabasePage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Developer Guide' },
          { label: 'Database Setup' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Database Setup
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Set up Supabase for production or use scaffold mode for local development.
        </p>
      </header>

      <Callout type="tip" title="Scaffold Mode Available">
        For local development without a database, use scaffold mode. The app will
        read/write to local JSON files automatically.
      </Callout>

      {/* Create Project */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="create">
          Create Supabase Project
        </h2>
        <ol className="space-y-3 text-slate-600 dark:text-slate-300">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">1</span>
            <span>Go to <a href="https://supabase.com" className="text-amber-600 dark:text-amber-400 hover:underline" target="_blank" rel="noopener noreferrer">supabase.com</a> and sign in</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">2</span>
            <span>Click &quot;New Project&quot;</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">3</span>
            <span>Choose an organization and name your project</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">4</span>
            <span>Set a strong database password (save it!)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">5</span>
            <span>Select a region close to your users</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">6</span>
            <span>Wait for the project to initialize (~2 minutes)</span>
          </li>
        </ol>
      </section>

      {/* Get Keys */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="keys">
          Get API Keys
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          After project creation, find your keys:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>Go to Project Settings → API</li>
          <li>Copy the Project URL</li>
          <li>Copy the anon (public) key</li>
          <li>Copy the service_role (secret) key</li>
        </ol>
        <Callout type="warning" title="Keep the Service Key Secret">
          The service_role key has full database access. Never expose it in client-side
          code or commit it to version control.
        </Callout>
      </section>

      {/* Run Schema */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="schema">
          Run Schema Migration
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Create the database tables:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>Open Supabase Dashboard → SQL Editor</li>
          <li>Create a new query</li>
          <li>Paste the schema below</li>
          <li>Click &quot;Run&quot;</li>
        </ol>
        <CodeBlock
          code={`-- Events table
CREATE TABLE IF NOT EXISTS events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  luma_id         TEXT UNIQUE NOT NULL,
  luma_url        TEXT NOT NULL,
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
  status          TEXT CHECK (status IN ('upcoming', 'live', 'past', 'cancelled')) DEFAULT 'upcoming',
  is_featured     BOOLEAN DEFAULT FALSE,
  synced_at       TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_events_starts_at ON events(starts_at);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_luma_id ON events(luma_id);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(is_featured) WHERE is_featured = true;

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Events are publicly readable"
  ON events FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role has full access"
  ON events FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Auto-update synced_at
CREATE OR REPLACE FUNCTION update_synced_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.synced_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_synced_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_synced_at();`}
          language="sql"
          filename="supabase/schema.sql"
        />
      </section>

      {/* Verify */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="verify">
          Verify Setup
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Confirm everything is working:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>Go to Table Editor in Supabase</li>
          <li>Verify the &quot;events&quot; table exists</li>
          <li>Check that RLS is enabled (lock icon)</li>
          <li>Run a sync to populate data: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">npm run dev</code> then call the cron endpoint</li>
        </ol>
      </section>

      <PageNavigation />
    </div>
  );
}
