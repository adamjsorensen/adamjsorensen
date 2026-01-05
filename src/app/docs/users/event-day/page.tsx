import { Callout } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Event Day | User Guide',
  description: 'What to expect when attending a Knowledge Parlour lecture',
};

export default function EventDayPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'User Guide' },
          { label: 'Event Day' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Event Day
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Everything you need to know for a great experience at a Knowledge Parlour lecture.
        </p>
      </header>

      {/* Before You Go */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="before">
          Before You Go
        </h2>
        <ChecklistSection
          items={[
            'Have your ticket ready (QR code on phone or printed)',
            'Check the venue address and plan your route',
            'Arrive 15-20 minutes early to find a good seat',
            'Bring student ID if you have a student ticket',
            'Consider bringing a notepad if you like taking notes',
          ]}
        />
        <Callout type="tip" title="Pro Tip">
          Most venues are in central London with good transport links. Check TfL for
          any disruptions on your route.
        </Callout>
      </section>

      {/* Arrival */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="arrival">
          When You Arrive
        </h2>
        <TimelineSection
          items={[
            {
              time: '6:30 PM',
              title: 'Doors Open',
              description: 'Arrive early to grab a good seat and your complimentary drink.',
            },
            {
              time: '6:30-7:00 PM',
              title: 'Networking',
              description: 'Mingle with fellow curious minds. Great time to meet new people!',
            },
            {
              time: '7:00 PM',
              title: 'Lecture Begins',
              description: 'The speaker takes the stage. Please silence your phone.',
            },
            {
              time: '8:00 PM',
              title: 'Q&A Session',
              description: 'Ask questions! This is your chance to engage with the speaker.',
            },
            {
              time: '8:30 PM',
              title: 'Networking Continues',
              description: 'Stay for drinks and continue the conversation.',
            },
          ]}
        />
      </section>

      {/* Check-in */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="checkin">
          Check-in Process
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          When you arrive at the venue:
        </p>
        <ol className="space-y-3 text-slate-600 dark:text-slate-300 ml-4">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm font-bold">1</span>
            <span>Look for our check-in desk near the entrance</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm font-bold">2</span>
            <span>Show your ticket QR code (on your phone or printed)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm font-bold">3</span>
            <span>Collect your complimentary drink token</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm font-bold">4</span>
            <span>Find a seat and enjoy!</span>
          </li>
        </ol>
      </section>

      {/* What to Expect */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="expect">
          What to Expect
        </h2>
        <div className="grid gap-4">
          <ExpectationCard
            icon="🎤"
            title="The Talk"
            description="A 45-60 minute presentation by an expert in their field. Engaging, accessible, and thought-provoking."
          />
          <ExpectationCard
            icon="❓"
            title="Q&A"
            description="30 minutes for audience questions. Don't be shy - there are no stupid questions!"
          />
          <ExpectationCard
            icon="🍺"
            title="The Venue"
            description="A carefully selected pub or bar with a dedicated space for our event. Casual, comfortable, and conducive to conversation."
          />
          <ExpectationCard
            icon="👥"
            title="The Crowd"
            description="Curious, engaged people from all walks of life. Students, professionals, retirees - united by intellectual curiosity."
          />
        </div>
      </section>

      {/* Etiquette */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="etiquette">
          Event Etiquette
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <DoCard
            items={[
              'Arrive on time (or early!)',
              'Silence your phone during the talk',
              'Ask questions during Q&A',
              'Engage with fellow attendees',
              'Share feedback with us',
            ]}
          />
          <DontCard
            items={[
              'Talk during the presentation',
              'Take flash photography',
              'Record the entire talk (short clips OK)',
              'Leave without saying goodbye 👋',
            ]}
          />
        </div>
      </section>

      {/* Food & Drink */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="food-drink">
          Food & Drink
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          All our events include a complimentary drink:
        </p>
        <ul className="space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>• Beer, wine, or soft drink included with your ticket</li>
          <li>• Additional drinks available for purchase at the bar</li>
          <li>• Most venues serve food if you want to eat before or after</li>
        </ul>
        <Callout type="info" title="Dietary Requirements">
          Let us know in advance if you have any dietary requirements and we&apos;ll do
          our best to accommodate you.
        </Callout>
      </section>

      {/* Problems */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="problems">
          If Something Goes Wrong
        </h2>
        <div className="space-y-4">
          <ProblemCard
            problem="I'm running late"
            solution="No problem! We'll save you a seat. Just arrive quietly so you don't disturb the talk."
          />
          <ProblemCard
            problem="I can't find the venue"
            solution="Check Google Maps for exact location. Look for our signs near the entrance."
          />
          <ProblemCard
            problem="My ticket isn't working"
            solution="Show your confirmation email to our check-in staff. We'll sort it out."
          />
          <ProblemCard
            problem="I need to leave early"
            solution="Sit near the exit and leave quietly. We understand - life happens!"
          />
        </div>
      </section>

      {/* After */}
      <section className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          After the Event
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          We hope you had a fantastic time! Here&apos;s what happens next:
        </p>
        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-amber-500">📧</span>
            <span>You&apos;ll receive a follow-up email with speaker resources and links</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500">📝</span>
            <span>We&apos;d love your feedback - please fill out our short survey</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500">📱</span>
            <span>Follow us on social media for event photos and announcements</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500">🎫</span>
            <span>Check out upcoming events - we&apos;d love to see you again!</span>
          </li>
        </ul>
      </section>

      <PageNavigation />
    </div>
  );
}

function ChecklistSection({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
          <span className="flex-shrink-0 w-5 h-5 rounded border-2 border-amber-400 dark:border-amber-500" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function TimelineSection({
  items,
}: {
  items: { time: string; title: string; description: string }[];
}) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex-shrink-0 w-20 text-right">
            <span className="text-sm font-mono text-amber-600 dark:text-amber-400">
              {item.time}
            </span>
          </div>
          <div className="relative flex-1 pb-4 border-l-2 border-slate-200 dark:border-slate-700 pl-4">
            <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-amber-500" />
            <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExpectationCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
      <span className="text-2xl">{icon}</span>
      <div>
        <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function DoCard({ items }: { items: string[] }) {
  return (
    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
        <span>✓</span> Do
      </h4>
      <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function DontCard({ items }: { items: string[] }) {
  return (
    <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
        <span>✗</span> Don&apos;t
      </h4>
      <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function ProblemCard({
  problem,
  solution,
}: {
  problem: string;
  solution: string;
}) {
  return (
    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <h4 className="font-medium text-slate-900 dark:text-white mb-1">{problem}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-300">{solution}</p>
    </div>
  );
}
