import { CodeBlock, Callout } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Event Schema | API Reference',
  description: 'Complete reference for the Event data type',
};

export default function EventSchemaPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'API Reference', href: '/docs/api' },
          { label: 'Schemas', href: '/docs/api' },
          { label: 'Event' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Event Schema
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          The Event object represents a lecture or gathering in The Knowledge Parlour.
        </p>
      </header>

      {/* TypeScript Interface */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="typescript">
          TypeScript Interface
        </h2>
        <CodeBlock
          code={`interface Event {
  // Identifiers
  id: string;                    // Internal UUID
  luma_id: string;               // External Luma event ID
  luma_url: string;              // Luma ticket purchase URL

  // Event Details
  title: string;                 // Event title
  description: string | null;    // Event description (markdown)

  // Speaker Information
  speaker_name: string | null;   // Primary speaker's name
  speaker_role: string | null;   // Speaker's title/role
  speaker_image_url: string | null; // Speaker avatar URL

  // Venue Information
  venue_name: string | null;     // Venue name
  venue_address: string | null;  // Full venue address

  // Timing
  starts_at: string;             // ISO 8601 timestamp
  ends_at: string | null;        // ISO 8601 timestamp

  // Capacity
  total_spots: number | null;    // Total ticket capacity
  spots_remaining: number | null; // Available tickets
  is_sold_out: boolean;          // Sold out flag

  // Status
  status: 'upcoming' | 'live' | 'past' | 'cancelled';
  is_featured: boolean;          // Featured on homepage

  // Metadata
  synced_at: string;             // Last sync timestamp
  created_at: string;            // Record creation time
}`}
          language="typescript"
          filename="types/event.ts"
        />
      </section>

      {/* Field Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="fields">
          Field Reference
        </h2>

        <FieldGroup title="Identifiers">
          <FieldRow
            name="id"
            type="string (UUID)"
            description="Internal unique identifier. Auto-generated on creation."
            example="550e8400-e29b-41d4-a716-446655440000"
          />
          <FieldRow
            name="luma_id"
            type="string"
            description="External Luma event ID. Used for syncing and deduplication."
            example="evt_abc123xyz"
          />
          <FieldRow
            name="luma_url"
            type="string (URL)"
            description="Direct link to the Luma event page for ticket purchases."
            example="https://lu.ma/abc123xyz"
          />
        </FieldGroup>

        <FieldGroup title="Event Details">
          <FieldRow
            name="title"
            type="string"
            description="The event title. Always present."
            example="The Neuroscience of Decision-Making"
          />
          <FieldRow
            name="description"
            type="string | null"
            description="Detailed event description. May contain markdown formatting."
            example="Join us for an exploration of how the brain makes choices..."
          />
        </FieldGroup>

        <FieldGroup title="Speaker Information">
          <FieldRow
            name="speaker_name"
            type="string | null"
            description="Name of the primary speaker."
            example="Dr. Sarah Chen"
          />
          <FieldRow
            name="speaker_role"
            type="string | null"
            description="Speaker's professional title or affiliation."
            example="Cognitive Neuroscientist, MIT"
          />
          <FieldRow
            name="speaker_image_url"
            type="string | null"
            description="URL to the speaker's profile image."
            example="https://cdn.lu.ma/speakers/sarah-chen.jpg"
          />
        </FieldGroup>

        <FieldGroup title="Venue Information">
          <FieldRow
            name="venue_name"
            type="string | null"
            description="Name of the venue."
            example="The Old Queen's Head"
          />
          <FieldRow
            name="venue_address"
            type="string | null"
            description="Full street address of the venue."
            example="44 Essex Road, Islington, London N1 8LN"
          />
        </FieldGroup>

        <FieldGroup title="Timing">
          <FieldRow
            name="starts_at"
            type="string (ISO 8601)"
            description="Event start time in UTC."
            example="2026-01-15T19:00:00Z"
          />
          <FieldRow
            name="ends_at"
            type="string | null"
            description="Event end time in UTC. May be null if not specified."
            example="2026-01-15T21:00:00Z"
          />
        </FieldGroup>

        <FieldGroup title="Capacity">
          <FieldRow
            name="total_spots"
            type="number | null"
            description="Total number of tickets available for the event."
            example="45"
          />
          <FieldRow
            name="spots_remaining"
            type="number | null"
            description="Number of tickets still available. Updates in real-time."
            example="12"
          />
          <FieldRow
            name="is_sold_out"
            type="boolean"
            description="True when all tickets have been sold."
            example="false"
          />
        </FieldGroup>

        <FieldGroup title="Status">
          <FieldRow
            name="status"
            type="enum"
            description="Current state of the event: upcoming, live, past, or cancelled."
            example="upcoming"
          />
          <FieldRow
            name="is_featured"
            type="boolean"
            description="Whether the event is featured prominently on the homepage."
            example="true"
          />
        </FieldGroup>
      </section>

      {/* Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="example">
          Example Event
        </h2>
        <CodeBlock
          code={`{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "luma_id": "evt_abc123xyz",
  "luma_url": "https://lu.ma/abc123xyz",
  "title": "The Neuroscience of Decision-Making",
  "description": "Join Dr. Sarah Chen for a fascinating exploration...",
  "speaker_name": "Dr. Sarah Chen",
  "speaker_role": "Cognitive Neuroscientist, MIT",
  "speaker_image_url": "https://cdn.lu.ma/speakers/sarah-chen.jpg",
  "venue_name": "The Old Queen's Head",
  "venue_address": "44 Essex Road, Islington, London N1 8LN",
  "starts_at": "2026-01-15T19:00:00Z",
  "ends_at": "2026-01-15T21:00:00Z",
  "total_spots": 45,
  "spots_remaining": 12,
  "is_sold_out": false,
  "status": "upcoming",
  "is_featured": true,
  "synced_at": "2026-01-03T10:30:00Z",
  "created_at": "2026-01-01T12:00:00Z"
}`}
          language="json"
        />
      </section>

      <Callout type="tip" title="Null Handling">
        Fields marked as nullable (<code>| null</code>) may not be present in the Luma data.
        Always check for null values when processing events.
      </Callout>

      <PageNavigation />
    </div>
  );
}

function FieldGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-6">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-2 pr-4 font-medium text-slate-500 dark:text-slate-400 w-1/4">
                Field
              </th>
              <th className="text-left py-2 pr-4 font-medium text-slate-500 dark:text-slate-400 w-1/4">
                Type
              </th>
              <th className="text-left py-2 font-medium text-slate-500 dark:text-slate-400">
                Description
              </th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function FieldRow({
  name,
  type,
  description,
  example,
}: {
  name: string;
  type: string;
  description: string;
  example: string;
}) {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800">
      <td className="py-3 pr-4 align-top">
        <code className="text-amber-600 dark:text-amber-400 font-mono text-xs bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded">
          {name}
        </code>
      </td>
      <td className="py-3 pr-4 align-top">
        <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">
          {type}
        </span>
      </td>
      <td className="py-3 text-slate-600 dark:text-slate-300 align-top">
        <p>{description}</p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Example: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">{example}</code>
        </p>
      </td>
    </tr>
  );
}
