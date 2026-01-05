import Link from 'next/link';
import { Callout } from '@/components/docs';

export const metadata = {
  title: 'Documentation | The Knowledge Parlour',
  description: 'Complete documentation for The Knowledge Parlour platform',
};

export default function DocsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="pb-8 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          The Knowledge Parlour Documentation
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
          Welcome to the official documentation. Learn how to discover events,
          manage your account, integrate with our API, or contribute to the platform.
        </p>
      </div>

      {/* Quick links */}
      <div className="grid md:grid-cols-2 gap-4">
        <QuickLinkCard
          href="/docs/quick-start"
          icon="🚀"
          title="Quick Start"
          description="Get up and running with The Knowledge Parlour in just 5 minutes."
        />
        <QuickLinkCard
          href="/docs/api"
          icon="🔌"
          title="API Reference"
          description="Explore our REST API endpoints for event synchronization and webhooks."
        />
        <QuickLinkCard
          href="/docs/users/discovering-events"
          icon="🎫"
          title="User Guide"
          description="Learn how to discover lectures, get tickets, and attend events."
        />
        <QuickLinkCard
          href="/docs/developers/local-development"
          icon="💻"
          title="Developer Guide"
          description="Set up your local development environment and start contributing."
        />
      </div>

      {/* Platform overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Platform Overview
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          The Knowledge Parlour is a platform for intimate intellectual lectures held in
          London&apos;s finest bars and venues. We bring together curious minds, compelling
          speakers, and unique atmospheres for unforgettable evenings of learning and discussion.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <StatCard value="50+" label="Lectures Hosted" />
          <StatCard value="2K+" label="Curious Minds" />
          <StatCard value="30+" label="Expert Speakers" />
        </div>
      </section>

      {/* Architecture */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          How It Works
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          The platform is built on a modern tech stack with real-time event synchronization:
        </p>

        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 font-mono text-sm">
          <pre className="text-slate-700 dark:text-slate-300 overflow-x-auto">
{`┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Luma API     │────▶│   Our Backend   │────▶│   Your Browser  │
│  (Event Source) │     │  (Next.js API)  │     │   (React App)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        │  Webhooks             │  Cron Sync
        │  (Real-time)          │  (Every 5 min)
        │                       │
        └───────────────────────┘`}
          </pre>
        </div>

        <Callout type="info" title="Real-time Updates">
          Events are synchronized from Luma every 5 minutes via cron jobs, with real-time
          updates through webhooks for ticket purchases and event changes.
        </Callout>
      </section>

      {/* Key features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Key Features
        </h2>

        <div className="grid gap-4">
          <FeatureRow
            icon="📅"
            title="Event Discovery"
            description="Browse upcoming lectures with rich details including speaker bios, venues, and ticket availability."
          />
          <FeatureRow
            icon="🎟️"
            title="Seamless Ticketing"
            description="Direct integration with Luma for secure ticket purchases and event management."
          />
          <FeatureRow
            icon="📊"
            title="Real-time Inventory"
            description="Live updates on ticket availability so you never miss a sold-out notification."
          />
          <FeatureRow
            icon="🔔"
            title="Instant Updates"
            description="Webhook integration ensures event changes are reflected immediately."
          />
        </div>
      </section>

      {/* Getting help */}
      <section className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Need Help?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          Can&apos;t find what you&apos;re looking for? We&apos;re here to help.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/faq"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <span>📋</span> FAQ
          </Link>
          <a
            href="mailto:hello@theknowledgeparlour.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 rounded-lg text-sm font-medium text-white hover:bg-amber-600 transition-colors"
          >
            <span>✉️</span> Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}

function QuickLinkCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 p-5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all"
    >
      <span className="text-3xl">{icon}</span>
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {description}
        </p>
      </div>
    </Link>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
        {value}
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {label}
      </div>
    </div>
  );
}

function FeatureRow({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
      <span className="text-xl mt-0.5">{icon}</span>
      <div>
        <h3 className="font-medium text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
}
