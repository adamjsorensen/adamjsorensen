import { Callout, CodeBlock } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Managing Events | Admin Guide',
  description: 'Create, update, and manage events',
};

export default function ManagingEventsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Admin Guide' },
          { label: 'Managing Events' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Managing Events
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Create, update, and manage your Knowledge Parlour events through Luma.
        </p>
      </header>

      {/* Creating Events */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="create">
          Creating Events
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Events are created in Luma and automatically synced to the platform:
        </p>
        <ol className="space-y-3 text-slate-600 dark:text-slate-300">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">1</span>
            <span>Log into <a href="https://lu.ma" className="text-amber-600 dark:text-amber-400 hover:underline" target="_blank" rel="noopener noreferrer">lu.ma</a> with your account</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">2</span>
            <span>Click &quot;Create Event&quot; in your calendar</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">3</span>
            <span>Fill in all event details (see checklist below)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">4</span>
            <span>Publish the event</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">5</span>
            <span>Event appears on the site within 5 minutes</span>
          </li>
        </ol>
      </section>

      {/* Event Checklist */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="checklist">
          Event Creation Checklist
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          For optimal display on the platform, include:
        </p>
        <div className="space-y-2">
          <ChecklistItem label="Event title" required />
          <ChecklistItem label="Date and time" required />
          <ChecklistItem label="Venue name and address" required />
          <ChecklistItem label="Event description (markdown supported)" required />
          <ChecklistItem label="Speaker/host name and bio" />
          <ChecklistItem label="Speaker photo" />
          <ChecklistItem label="Cover image (1200x630px recommended)" />
          <ChecklistItem label="Ticket types and pricing" />
          <ChecklistItem label="Capacity limit" />
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="best-practices">
          Best Practices
        </h2>
        <div className="grid gap-4">
          <TipCard
            title="Compelling Titles"
            description="Use clear, intriguing titles that convey the topic and spark curiosity."
            example="The Neuroscience of Decision-Making"
          />
          <TipCard
            title="Rich Descriptions"
            description="Include what attendees will learn, speaker credentials, and what makes this talk unique."
            example="Join Dr. Sarah Chen, cognitive neuroscientist at MIT, for a fascinating exploration of how our brains make choices..."
          />
          <TipCard
            title="Speaker Photos"
            description="Add a professional headshot. Events with speaker photos get 40% more registrations."
            example="Square format, 400x400px minimum"
          />
          <TipCard
            title="Early Bird Pricing"
            description="Create urgency with limited early bird tickets at a discounted price."
            example="First 10 tickets at £10, then £15"
          />
        </div>
      </section>

      {/* Updating Events */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="update">
          Updating Events
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Any changes made in Luma sync automatically:
        </p>
        <ul className="space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>• Title and description updates appear within 5 minutes</li>
          <li>• Time/date changes trigger attendee notifications (via Luma)</li>
          <li>• Venue changes update on the site automatically</li>
          <li>• Ticket availability updates in real-time via webhooks</li>
        </ul>
        <Callout type="warning" title="Major Changes">
          If you significantly change the date, time, or venue, consider emailing
          attendees directly through Luma to ensure they see the update.
        </Callout>
      </section>

      {/* Cancelling Events */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="cancel">
          Cancelling Events
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          To cancel an event:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>Go to the event in Luma</li>
          <li>Click &quot;Cancel Event&quot; in the settings</li>
          <li>Choose whether to refund attendees</li>
          <li>Add a cancellation message</li>
          <li>Confirm the cancellation</li>
        </ol>
        <p className="text-slate-600 dark:text-slate-300 mt-4">
          The event will be marked as cancelled on the platform within 5 minutes.
          Cancelled events are hidden from the homepage but remain in the database
          for historical reference.
        </p>
      </section>

      <PageNavigation />
    </div>
  );
}

function ChecklistItem({ label, required }: { label: string; required?: boolean }) {
  return (
    <div className="flex items-center gap-3 p-2">
      <div className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600" />
      <span className="text-slate-700 dark:text-slate-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
    </div>
  );
}

function TipCard({
  title,
  description,
  example,
}: {
  title: string;
  description: string;
  example: string;
}) {
  return (
    <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{description}</p>
      <p className="text-xs text-slate-400 dark:text-slate-500 italic">
        Example: {example}
      </p>
    </div>
  );
}
