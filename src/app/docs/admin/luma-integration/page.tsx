import { CodeBlock, Callout, Note } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Luma Integration | Admin Guide',
  description: 'Set up and configure Luma integration for event synchronization',
};

export default function LumaIntegrationPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Admin Guide' },
          { label: 'Luma Integration' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Luma Integration
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Configure the connection between The Knowledge Parlour and your Luma calendar
          for automatic event synchronization.
        </p>
      </header>

      <Callout type="info" title="Luma Plus Required">
        API access requires a Luma Plus subscription. Visit{' '}
        <a href="https://lu.ma/plus" className="underline" target="_blank" rel="noopener noreferrer">
          lu.ma/plus
        </a>{' '}
        to upgrade your account.
      </Callout>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="overview">
          How It Works
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          The platform synchronizes with Luma through two mechanisms:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <IntegrationCard
            icon="⏰"
            title="Scheduled Sync"
            description="Every 5 minutes, we fetch all events from your Luma calendar and update our database."
            details="Automatic, no action required"
          />
          <IntegrationCard
            icon="⚡"
            title="Webhooks"
            description="Luma sends instant notifications when events change or tickets are purchased."
            details="Optional, for real-time updates"
          />
        </div>
      </section>

      {/* Getting API Key */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="api-key">
          Getting Your API Key
        </h2>
        <ol className="space-y-4">
          <StepCard
            number={1}
            title="Log into Luma"
            description="Go to lu.ma and sign in to your account."
          />
          <StepCard
            number={2}
            title="Access Settings"
            description="Click your profile picture → Settings → Developer."
          />
          <StepCard
            number={3}
            title="Generate API Key"
            description="Click 'Create API Key' and give it a descriptive name."
          />
          <StepCard
            number={4}
            title="Copy the Key"
            description="Copy your API key immediately - you won't be able to see it again!"
          />
        </ol>
        <Callout type="warning" title="Keep It Secret">
          Your API key provides full access to your Luma account. Never share it publicly
          or commit it to version control.
        </Callout>
      </section>

      {/* Configure Environment */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="configure">
          Configure Environment
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Add your API key to the environment variables:
        </p>
        <CodeBlock
          code={`# .env.local
LUMA_API_KEY=your-api-key-here`}
          language="bash"
          filename=".env.local"
        />
        <p className="text-slate-600 dark:text-slate-300">
          For production (Vercel), add this in your project settings:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>Go to your Vercel project dashboard</li>
          <li>Navigate to Settings → Environment Variables</li>
          <li>Add <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">LUMA_API_KEY</code> with your key</li>
          <li>Make sure it&apos;s available in Production, Preview, and Development</li>
        </ol>
      </section>

      {/* Verify Connection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="verify">
          Verify the Connection
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Test that your API key works by triggering a manual sync:
        </p>
        <CodeBlock
          code={`curl -X GET "http://localhost:3000/api/cron/sync-luma" \\
  -H "Authorization: Bearer your-cron-secret"`}
          language="bash"
        />
        <p className="text-slate-600 dark:text-slate-300">
          You should see a response like:
        </p>
        <CodeBlock
          code={`{
  "success": true,
  "synced": 5,
  "timestamp": "2026-01-03T10:30:00.000Z"
}`}
          language="json"
        />
      </section>

      {/* Webhook Setup */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="webhooks">
          Setting Up Webhooks (Optional)
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          For real-time updates, configure Luma to send webhooks:
        </p>
        <ol className="space-y-4">
          <StepCard
            number={1}
            title="Get Your Webhook URL"
            description="Your webhook endpoint is: https://your-domain.com/api/webhooks/luma"
          />
          <StepCard
            number={2}
            title="Configure in Luma"
            description="Go to Settings → Webhooks → Add Endpoint"
          />
          <StepCard
            number={3}
            title="Select Events"
            description="Enable: event.created, event.updated, event.deleted, guest.created, ticket.created"
          />
          <StepCard
            number={4}
            title="Add Signing Secret (Optional)"
            description="Copy the signing secret and add it as LUMA_WEBHOOK_SECRET in your environment."
          />
        </ol>
        <Note>
          Webhooks are optional. The cron job ensures data is always synchronized even
          without webhooks configured.
        </Note>
      </section>

      {/* Event Filtering */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="filtering">
          Event Filtering
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          By default, the sync fetches all events from your Luma calendar. To filter events,
          modify the sync logic in <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">lib/luma.ts</code>:
        </p>
        <CodeBlock
          code={`// Example: Only sync events with a specific tag
export async function fetchLumaEvents() {
  const events = await lumaClient.getEvents();

  // Filter to only include Knowledge Parlour events
  return events.filter(event =>
    event.tags?.includes('knowledge-parlour')
  );
}`}
          language="typescript"
        />
      </section>

      {/* Troubleshooting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="troubleshooting">
          Troubleshooting
        </h2>
        <div className="space-y-4">
          <TroubleshootItem
            problem="API key not working"
            solution="Verify your Luma Plus subscription is active and the key hasn't expired. Generate a new key if needed."
          />
          <TroubleshootItem
            problem="Events not syncing"
            solution="Check the Vercel logs for errors. Ensure LUMA_API_KEY is set correctly in all environments."
          />
          <TroubleshootItem
            problem="Webhooks not arriving"
            solution="Verify the endpoint URL is correct and publicly accessible. Check Luma's webhook delivery logs."
          />
          <TroubleshootItem
            problem="Duplicate events"
            solution="This shouldn't happen - we upsert by luma_id. If it does, check for data corruption in the database."
          />
        </div>
      </section>

      <PageNavigation />
    </div>
  );
}

function IntegrationCard({
  icon,
  title,
  description,
  details,
}: {
  icon: string;
  title: string;
  description: string;
  details: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{description}</p>
      <p className="text-xs text-slate-400 dark:text-slate-500">{details}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </li>
  );
}

function TroubleshootItem({
  problem,
  solution,
}: {
  problem: string;
  solution: string;
}) {
  return (
    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <h4 className="font-medium text-slate-900 dark:text-white mb-1 flex items-center gap-2">
        <span className="text-red-500">⚠</span>
        {problem}
      </h4>
      <p className="text-sm text-slate-600 dark:text-slate-300 ml-6">{solution}</p>
    </div>
  );
}
