import { Callout, Note } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Getting Tickets | User Guide',
  description: 'How to purchase tickets for Knowledge Parlour events',
};

export default function GettingTicketsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'User Guide' },
          { label: 'Getting Tickets' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Getting Tickets
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Secure your spot at an upcoming lecture through our ticketing partner, Luma.
        </p>
      </header>

      {/* How to Book */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="booking">
          How to Book
        </h2>
        <ol className="space-y-4">
          <StepCard
            number={1}
            title="Find an Event"
            description="Browse the homepage and click on an event that interests you."
          />
          <StepCard
            number={2}
            title="Click 'Get Tickets'"
            description="Click the ticket button on the event card to go to the Luma booking page."
          />
          <StepCard
            number={3}
            title="Complete Registration"
            description="Fill in your details and complete payment through Luma's secure checkout."
          />
          <StepCard
            number={4}
            title="Receive Confirmation"
            description="You'll receive an email confirmation with your ticket and event details."
          />
        </ol>
      </section>

      {/* Luma Integration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="luma">
          About Luma
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          We use <a href="https://lu.ma" className="text-amber-600 dark:text-amber-400 hover:underline" target="_blank" rel="noopener noreferrer">Luma</a> as
          our ticketing platform. When you click &quot;Get Tickets,&quot; you&apos;ll be taken to a Luma event page where you can:
        </p>
        <ul className="space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>• View the full event description and speaker bio</li>
          <li>• See venue details and a map</li>
          <li>• Select your ticket type</li>
          <li>• Complete secure payment</li>
          <li>• Add the event to your calendar</li>
        </ul>
        <Note>
          Luma handles all payments securely. We never see or store your payment information.
        </Note>
      </section>

      {/* Ticket Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="types">
          Ticket Types
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Most events offer the following ticket options:
        </p>
        <div className="grid gap-4">
          <TicketTypeCard
            name="General Admission"
            price="£12-15"
            includes={[
              'Entry to the lecture',
              'Access to Q&A session',
              'Complimentary drink on arrival',
            ]}
          />
          <TicketTypeCard
            name="Early Bird"
            price="£8-10"
            includes={[
              'Same benefits as General Admission',
              'Available for first 10 bookings',
              'Limited availability',
            ]}
            badge="Save 30%"
          />
          <TicketTypeCard
            name="Student"
            price="£8"
            includes={[
              'Same benefits as General Admission',
              'Valid student ID required at entry',
            ]}
          />
        </div>
        <Callout type="info" title="Pricing varies">
          Ticket prices may vary by event. Special guests and longer workshops
          may have different pricing structures.
        </Callout>
      </section>

      {/* Payment */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="payment">
          Payment Methods
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Luma accepts the following payment methods:
        </p>
        <div className="flex flex-wrap gap-3">
          <PaymentBadge name="Credit Card" />
          <PaymentBadge name="Debit Card" />
          <PaymentBadge name="Apple Pay" />
          <PaymentBadge name="Google Pay" />
        </div>
      </section>

      {/* Cancellation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="cancellation">
          Cancellation Policy
        </h2>
        <div className="space-y-4">
          <PolicyCard
            timeframe="7+ days before"
            policy="Full refund available"
            color="green"
          />
          <PolicyCard
            timeframe="2-7 days before"
            policy="50% refund or credit for future event"
            color="amber"
          />
          <PolicyCard
            timeframe="Less than 48 hours"
            policy="No refund, but ticket is transferable"
            color="red"
          />
        </div>
        <Callout type="tip" title="Transfer Your Ticket">
          Can&apos;t make it? You can transfer your ticket to a friend through Luma.
          Just update the attendee name in your confirmation email.
        </Callout>
      </section>

      {/* Event Cancellation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="event-cancellation">
          If We Cancel
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          In the rare event that we need to cancel a lecture:
        </p>
        <ul className="space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>• You&apos;ll receive an email notification immediately</li>
          <li>• Full refunds are processed automatically</li>
          <li>• Refunds appear within 5-10 business days</li>
          <li>• We&apos;ll offer priority booking for rescheduled events</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="faq">
          Common Questions
        </h2>
        <div className="space-y-4">
          <FaqItem
            question="I didn't receive my confirmation email"
            answer="Check your spam folder first. If it's not there, visit lu.ma and sign in with the email you used to book. Your tickets will be in your account."
          />
          <FaqItem
            question="Can I buy tickets at the door?"
            answer="Only if tickets are still available. We recommend booking online in advance as most events sell out."
          />
          <FaqItem
            question="Do I need to print my ticket?"
            answer="No! Just show the QR code from your confirmation email or the Luma app on your phone."
          />
        </div>
      </section>

      <PageNavigation />
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

function TicketTypeCard({
  name,
  price,
  includes,
  badge,
}: {
  name: string;
  price: string;
  includes: string[];
  badge?: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-slate-900 dark:text-white">{name}</h3>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full">
              {badge}
            </span>
          )}
          <span className="text-amber-600 dark:text-amber-400 font-bold">{price}</span>
        </div>
      </div>
      <ul className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
        {includes.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PaymentBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300">
      💳 {name}
    </span>
  );
}

function PolicyCard({
  timeframe,
  policy,
  color,
}: {
  timeframe: string;
  policy: string;
  color: 'green' | 'amber' | 'red';
}) {
  const colorClasses = {
    green: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30',
    amber: 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30',
    red: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30',
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <div className="font-semibold text-slate-900 dark:text-white">{timeframe}</div>
      <div className="text-sm text-slate-600 dark:text-slate-300">{policy}</div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <h4 className="font-medium text-slate-900 dark:text-white mb-2">{question}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-300">{answer}</p>
    </div>
  );
}
