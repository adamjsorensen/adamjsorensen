import { CodeBlock, Callout } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';
import { webhookEventTypes } from '@/lib/docs-config';

export const metadata = {
  title: 'Webhook Payloads | API Reference',
  description: 'Reference for Luma webhook event payloads',
};

export default function WebhookSchemasPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'API Reference', href: '/docs/api' },
          { label: 'Schemas', href: '/docs/api' },
          { label: 'Webhook Payloads' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Webhook Payloads
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Reference documentation for the webhook events sent by Luma to our platform.
        </p>
      </header>

      {/* Event Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="event-types">
          Event Types
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Luma sends different webhook events based on what changed:
        </p>
        <div className="space-y-3">
          {webhookEventTypes.map((eventType) => (
            <EventTypeCard key={eventType.type} {...eventType} />
          ))}
        </div>
      </section>

      {/* Payload Structure */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="structure">
          Payload Structure
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          All webhook payloads follow a consistent structure:
        </p>
        <CodeBlock
          code={`interface WebhookPayload {
  type: string;      // Event type (e.g., "event.created")
  data: {
    event?: LumaEvent;        // Present for event.* webhooks
    guest?: LumaGuest;        // Present for guest.* webhooks
    ticket?: LumaTicket;      // Present for ticket.* webhooks
  };
}`}
          language="typescript"
        />
      </section>

      {/* event.created */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="event-created">
          event.created
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Triggered when a new event is created in your Luma calendar.
        </p>
        <CodeBlock
          code={`{
  "type": "event.created",
  "data": {
    "event": {
      "api_id": "evt_abc123xyz",
      "name": "The Neuroscience of Decision-Making",
      "description": "Join us for an exploration...",
      "start_at": "2026-01-15T19:00:00Z",
      "end_at": "2026-01-15T21:00:00Z",
      "url": "https://lu.ma/abc123xyz",
      "cover_url": "https://cdn.lu.ma/covers/event.jpg",
      "geo_address_info": {
        "name": "The Old Queen's Head",
        "full_address": "44 Essex Road, Islington, London N1 8LN"
      },
      "hosts": [
        {
          "name": "Dr. Sarah Chen",
          "bio": "Cognitive Neuroscientist at MIT",
          "avatar_url": "https://cdn.lu.ma/avatars/sarah.jpg"
        }
      ],
      "ticket_info": {
        "total_capacity": 45,
        "spots_remaining": 45,
        "is_sold_out": false
      }
    }
  }
}`}
          language="json"
        />
      </section>

      {/* event.updated */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="event-updated">
          event.updated
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Triggered when event details are modified. Contains the full updated event object.
        </p>
        <CodeBlock
          code={`{
  "type": "event.updated",
  "data": {
    "event": {
      "api_id": "evt_abc123xyz",
      "name": "The Neuroscience of Decision-Making (Updated Title)",
      "description": "Updated description...",
      // ... full event object
    }
  }
}`}
          language="json"
        />
        <Callout type="info">
          The payload contains the complete event object, not just the changed fields.
          The system performs an upsert based on the <code>api_id</code>.
        </Callout>
      </section>

      {/* event.deleted */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="event-deleted">
          event.deleted
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Triggered when an event is deleted or cancelled.
        </p>
        <CodeBlock
          code={`{
  "type": "event.deleted",
  "data": {
    "event": {
      "api_id": "evt_abc123xyz"
      // Minimal event data
    }
  }
}`}
          language="json"
        />
        <Callout type="warning">
          Our system marks the event as cancelled rather than deleting it from the database.
          This preserves historical data and prevents broken links.
        </Callout>
      </section>

      {/* guest.created */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="guest-created">
          guest.created
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Triggered when someone registers for an event (RSVP or free ticket).
        </p>
        <CodeBlock
          code={`{
  "type": "guest.created",
  "data": {
    "event": {
      "api_id": "evt_abc123xyz"
    },
    "guest": {
      "api_id": "gst_def456uvw",
      "name": "John Smith",
      "email": "john@example.com",
      "status": "registered",
      "registered_at": "2026-01-05T14:30:00Z"
    }
  }
}`}
          language="json"
        />
      </section>

      {/* ticket.created */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="ticket-created">
          ticket.created
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Triggered when a paid ticket is purchased.
        </p>
        <CodeBlock
          code={`{
  "type": "ticket.created",
  "data": {
    "event": {
      "api_id": "evt_abc123xyz"
    },
    "ticket": {
      "api_id": "tkt_ghi789rst",
      "guest_api_id": "gst_def456uvw",
      "ticket_type": "General Admission",
      "price": {
        "amount": 15.00,
        "currency": "GBP"
      },
      "purchased_at": "2026-01-05T14:30:00Z"
    }
  }
}`}
          language="json"
        />
      </section>

      {/* Handling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="handling">
          Handling Webhooks
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Best practices for processing webhook events:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300">
          <li>
            <strong>Respond quickly</strong> - Return 200 within 5 seconds. Process async if needed.
          </li>
          <li>
            <strong>Handle duplicates</strong> - Webhooks may be retried. Use idempotent operations.
          </li>
          <li>
            <strong>Verify signatures</strong> - If LUMA_WEBHOOK_SECRET is set, verify the payload.
          </li>
          <li>
            <strong>Log everything</strong> - Keep detailed logs for debugging webhook issues.
          </li>
        </ol>
        <CodeBlock
          code={`// Example webhook handler
export async function POST(request: Request) {
  const payload = await request.json();

  console.log('Webhook received:', payload.type);

  switch (payload.type) {
    case 'event.created':
    case 'event.updated':
      await upsertEvent(payload.data.event);
      break;
    case 'event.deleted':
      await markEventCancelled(payload.data.event.api_id);
      break;
    case 'guest.created':
    case 'ticket.created':
      await decrementSpots(payload.data.event.api_id);
      break;
  }

  return Response.json({ success: true });
}`}
          language="typescript"
        />
      </section>

      <PageNavigation />
    </div>
  );
}

function EventTypeCard({
  type,
  description,
  action,
}: {
  type: string;
  description: string;
  action: string;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <code className="flex-shrink-0 text-sm font-mono px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded">
        {type}
      </code>
      <div className="flex-1 min-w-0">
        <p className="text-slate-700 dark:text-slate-300">{description}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          <strong>Action:</strong> {action}
        </p>
      </div>
    </div>
  );
}
