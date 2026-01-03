import { Callout } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Dashboard Overview | Admin Guide',
  description: 'Navigate the admin interface',
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Admin Guide' },
          { label: 'Dashboard Overview' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Dashboard Overview
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Navigate the admin interface and manage your Knowledge Parlour events.
        </p>
      </header>

      <Callout type="info" title="Coming Soon">
        The admin dashboard is currently under development. For now, event management
        is handled directly through the Luma platform, with automatic synchronization
        to The Knowledge Parlour.
      </Callout>

      {/* Current Workflow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="workflow">
          Current Workflow
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Until the admin dashboard is complete, use this workflow:
        </p>
        <ol className="space-y-4 text-slate-600 dark:text-slate-300">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">1</span>
            <div>
              <strong>Create events in Luma</strong>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Log into lu.ma and create your event with all details
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">2</span>
            <div>
              <strong>Automatic sync</strong>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Events appear on the site within 5 minutes
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">3</span>
            <div>
              <strong>Real-time updates</strong>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Ticket sales and changes sync automatically via webhooks
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* Planned Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="planned">
          Planned Features
        </h2>
        <div className="grid gap-4">
          <FeatureCard
            icon="📊"
            title="Analytics Dashboard"
            description="View attendance, revenue, and engagement metrics"
            status="In Development"
          />
          <FeatureCard
            icon="📝"
            title="Event Management"
            description="Create and edit events directly from the dashboard"
            status="Planned"
          />
          <FeatureCard
            icon="👥"
            title="Attendee Management"
            description="View and manage guest lists and check-ins"
            status="Planned"
          />
          <FeatureCard
            icon="📧"
            title="Email Campaigns"
            description="Send updates and newsletters to attendees"
            status="Planned"
          />
        </div>
      </section>

      <PageNavigation />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  status,
}: {
  icon: string;
  title: string;
  description: string;
  status: string;
}) {
  const statusColor =
    status === 'In Development'
      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400'
      : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400';

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>
            {status}
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
      </div>
    </div>
  );
}
