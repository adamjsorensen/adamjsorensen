import { Callout } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Discovering Events | User Guide',
  description: 'Learn how to find lectures that interest you',
};

export default function DiscoveringEventsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'User Guide' },
          { label: 'Discovering Events' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Discovering Events
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Find fascinating lectures and intellectual gatherings that match your interests.
        </p>
      </header>

      {/* Browse Events */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="browse">
          Browsing the Homepage
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          The homepage displays all upcoming lectures in chronological order. Each event card shows:
        </p>
        <ul className="space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-amber-500">📅</span>
            <span><strong>Date & Time</strong> - When the lecture takes place</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500">🎤</span>
            <span><strong>Speaker</strong> - Who&apos;s presenting and their expertise</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500">📍</span>
            <span><strong>Venue</strong> - Where the event is held in London</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500">🎫</span>
            <span><strong>Availability</strong> - How many spots are remaining</span>
          </li>
        </ul>
      </section>

      {/* Event Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="cards">
          Understanding Event Cards
        </h2>
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-24 text-center">
              <div className="text-amber-600 dark:text-amber-400 font-bold text-lg">JAN 15</div>
              <div className="text-slate-500 dark:text-slate-400 text-sm">7:00 PM</div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                The Neuroscience of Decision-Making
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Dr. Sarah Chen • Cognitive Neuroscientist
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                📍 The Old Queen&apos;s Head, Islington
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full">
                  12 spots left
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 italic">
          Example event card showing all key information at a glance.
        </p>
      </section>

      {/* Availability */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="availability">
          Ticket Availability
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Our lectures are intimate gatherings, typically limited to 30-50 attendees.
          Ticket availability updates in real-time:
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <StatusCard
            status="Available"
            color="green"
            description="Tickets are still available"
          />
          <StatusCard
            status="Low Stock"
            color="amber"
            description="Fewer than 10 spots remaining"
          />
          <StatusCard
            status="Sold Out"
            color="red"
            description="No tickets available"
          />
        </div>
        <Callout type="tip" title="Act Fast!">
          Popular lectures sell out within hours. If you see an event that interests you,
          we recommend securing your ticket early.
        </Callout>
      </section>

      {/* Topics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="topics">
          Topics We Cover
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          The Knowledge Parlour hosts lectures across a diverse range of subjects:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <TopicCard icon="🧠" title="Science & Technology" />
          <TopicCard icon="🎨" title="Arts & Culture" />
          <TopicCard icon="📚" title="History & Philosophy" />
          <TopicCard icon="💼" title="Business & Economics" />
          <TopicCard icon="🌍" title="Society & Politics" />
          <TopicCard icon="✨" title="Psychology & Wellbeing" />
        </div>
      </section>

      {/* Venues */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="venues">
          Our Venues
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          We host events in carefully selected bars and pubs across London. Each venue is chosen for its:
        </p>
        <ul className="space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>• Intimate atmosphere conducive to learning</li>
          <li>• Quality drinks and comfortable seating</li>
          <li>• Central London location with good transport links</li>
          <li>• Unique character and history</li>
        </ul>
        <Callout type="info">
          Venue details are shown on each event card. Check the address before booking to
          ensure the location works for you.
        </Callout>
      </section>

      {/* Next Steps */}
      <section className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Ready to Attend?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          Once you&apos;ve found an event that interests you, learn how to secure your spot.
        </p>
        <a
          href="/docs/users/getting-tickets"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          Getting Tickets
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </section>

      <PageNavigation />
    </div>
  );
}

function StatusCard({
  status,
  color,
  description,
}: {
  status: string;
  color: 'green' | 'amber' | 'red';
  description: string;
}) {
  const colorClasses = {
    green: 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400',
    amber: 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400',
    red: 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400',
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <div className="font-semibold">{status}</div>
      <div className="text-sm opacity-80">{description}</div>
    </div>
  );
}

function TopicCard({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
      <span className="text-2xl">{icon}</span>
      <span className="text-slate-700 dark:text-slate-300">{title}</span>
    </div>
  );
}
