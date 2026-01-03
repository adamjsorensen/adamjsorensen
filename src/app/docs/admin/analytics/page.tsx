import { Callout } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Analytics | Admin Guide',
  description: 'Track attendance and performance metrics',
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Admin Guide' },
          { label: 'Analytics' },
        ]}
      />

      <header>
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Analytics
          </h1>
          <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 rounded-full">
            New
          </span>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Track attendance, revenue, and engagement metrics for your events.
        </p>
      </header>

      <Callout type="info" title="Coming Soon">
        The analytics dashboard is currently under development. Check back soon for
        detailed metrics and insights.
      </Callout>

      {/* Planned Metrics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="metrics">
          Planned Metrics
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <MetricCard
            icon="🎫"
            title="Ticket Sales"
            metrics={['Total tickets sold', 'Revenue by event', 'Ticket type breakdown', 'Sales velocity']}
          />
          <MetricCard
            icon="👥"
            title="Attendance"
            metrics={['Check-in rate', 'No-show rate', 'Repeat attendees', 'New vs returning']}
          />
          <MetricCard
            icon="📈"
            title="Growth"
            metrics={['Month-over-month growth', 'Audience growth', 'Email list growth', 'Social reach']}
          />
          <MetricCard
            icon="⭐"
            title="Engagement"
            metrics={['Event ratings', 'Survey responses', 'Social mentions', 'Referral sources']}
          />
        </div>
      </section>

      {/* Current Analytics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="current">
          Current Analytics Access
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          While the dashboard is in development, you can access metrics through:
        </p>
        <div className="space-y-4">
          <AnalyticsSource
            name="Luma Dashboard"
            description="View ticket sales, attendee lists, and check-in data"
            link="https://lu.ma/dashboard"
          />
          <AnalyticsSource
            name="Supabase Dashboard"
            description="Query the database directly for custom reports"
            link="https://supabase.com/dashboard"
          />
          <AnalyticsSource
            name="Vercel Analytics"
            description="Track page views and visitor demographics"
            link="https://vercel.com/analytics"
          />
        </div>
      </section>

      <PageNavigation />
    </div>
  );
}

function MetricCard({
  icon,
  title,
  metrics,
}: {
  icon: string;
  title: string;
  metrics: string[];
}) {
  return (
    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <ul className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
        {metrics.map((metric, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-slate-300 dark:text-slate-600">•</span>
            {metric}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnalyticsSource({
  name,
  description,
  link,
}: {
  name: string;
  description: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
        <span className="text-amber-600 dark:text-amber-400">📊</span>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-slate-900 dark:text-white">{name}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}
