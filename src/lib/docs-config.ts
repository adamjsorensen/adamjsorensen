// Documentation configuration - drives the entire docs structure
// This file is the single source of truth for documentation navigation

export interface DocPage {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: 'new' | 'updated' | 'beta' | 'deprecated';
}

export interface DocSection {
  title: string;
  icon?: string;
  pages: DocPage[];
}

export interface DocGroup {
  title: string;
  sections: DocSection[];
}

export const docsConfig: DocGroup[] = [
  {
    title: 'Getting Started',
    sections: [
      {
        title: 'Introduction',
        icon: '📚',
        pages: [
          {
            title: 'Overview',
            href: '/docs',
            description: 'Welcome to The Knowledge Parlour documentation',
          },
          {
            title: 'Quick Start',
            href: '/docs/quick-start',
            description: 'Get up and running in 5 minutes',
          },
          {
            title: 'Architecture',
            href: '/docs/architecture',
            description: 'Understand the system design',
          },
        ],
      },
    ],
  },
  {
    title: 'User Guide',
    sections: [
      {
        title: 'For Attendees',
        icon: '🎫',
        pages: [
          {
            title: 'Discovering Events',
            href: '/docs/users/discovering-events',
            description: 'Find lectures that interest you',
          },
          {
            title: 'Getting Tickets',
            href: '/docs/users/getting-tickets',
            description: 'How to purchase tickets via Luma',
          },
          {
            title: 'Event Day',
            href: '/docs/users/event-day',
            description: 'What to expect at a lecture',
          },
        ],
      },
    ],
  },
  {
    title: 'Admin Guide',
    sections: [
      {
        title: 'Event Management',
        icon: '⚙️',
        pages: [
          {
            title: 'Dashboard Overview',
            href: '/docs/admin/dashboard',
            description: 'Navigate the admin interface',
          },
          {
            title: 'Managing Events',
            href: '/docs/admin/managing-events',
            description: 'Create, update, and manage events',
          },
          {
            title: 'Luma Integration',
            href: '/docs/admin/luma-integration',
            description: 'Connect and sync with Luma',
          },
          {
            title: 'Analytics',
            href: '/docs/admin/analytics',
            description: 'Track attendance and performance',
            badge: 'new',
          },
        ],
      },
    ],
  },
  {
    title: 'Developer Guide',
    sections: [
      {
        title: 'Setup',
        icon: '🛠️',
        pages: [
          {
            title: 'Local Development',
            href: '/docs/developers/local-development',
            description: 'Set up your development environment',
          },
          {
            title: 'Environment Variables',
            href: '/docs/developers/environment',
            description: 'Configure your .env file',
          },
          {
            title: 'Database Setup',
            href: '/docs/developers/database',
            description: 'Set up Supabase and migrations',
          },
        ],
      },
      {
        title: 'Core Concepts',
        icon: '💡',
        pages: [
          {
            title: 'Project Structure',
            href: '/docs/developers/project-structure',
            description: 'Navigate the codebase',
          },
          {
            title: 'Data Flow',
            href: '/docs/developers/data-flow',
            description: 'How data moves through the system',
          },
          {
            title: 'Styling Guide',
            href: '/docs/developers/styling',
            description: 'Tailwind configuration and design system',
          },
        ],
      },
    ],
  },
  {
    title: 'API Reference',
    sections: [
      {
        title: 'Endpoints',
        icon: '🔌',
        pages: [
          {
            title: 'API Overview',
            href: '/docs/api',
            description: 'Introduction to the API',
          },
          {
            title: 'Sync Events',
            href: '/docs/api/sync-luma',
            description: 'GET /api/cron/sync-luma',
          },
          {
            title: 'Webhooks',
            href: '/docs/api/webhooks-luma',
            description: 'POST /api/webhooks/luma',
          },
        ],
      },
      {
        title: 'Data Types',
        icon: '📦',
        pages: [
          {
            title: 'Event Schema',
            href: '/docs/api/schemas/event',
            description: 'Event data structure',
          },
          {
            title: 'Webhook Payloads',
            href: '/docs/api/schemas/webhooks',
            description: 'Webhook event payloads',
          },
        ],
      },
    ],
  },
];

// Flatten all pages for search
export function getAllPages(): DocPage[] {
  const pages: DocPage[] = [];
  docsConfig.forEach((group) => {
    group.sections.forEach((section) => {
      pages.push(...section.pages);
    });
  });
  return pages;
}

// Get page by href
export function getPageByHref(href: string): DocPage | undefined {
  return getAllPages().find((page) => page.href === href);
}

// Get adjacent pages for navigation
export function getAdjacentPages(href: string): {
  prev: DocPage | null;
  next: DocPage | null;
} {
  const pages = getAllPages();
  const index = pages.findIndex((page) => page.href === href);
  return {
    prev: index > 0 ? pages[index - 1] : null,
    next: index < pages.length - 1 ? pages[index + 1] : null,
  };
}

// API endpoint definitions for dynamic generation
export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  title: string;
  description: string;
  authentication: {
    required: boolean;
    type?: string;
    header?: string;
  };
  headers?: {
    name: string;
    required: boolean;
    description: string;
    example?: string;
  }[];
  queryParams?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
    example?: string;
  }[];
  bodyParams?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
    example?: string;
  }[];
  responses: {
    status: number;
    description: string;
    example?: object;
  }[];
  exampleRequest?: {
    curl?: string;
    javascript?: string;
    python?: string;
  };
}

export const apiEndpoints: Record<string, ApiEndpoint> = {
  'sync-luma': {
    method: 'GET',
    path: '/api/cron/sync-luma',
    title: 'Sync Events from Luma',
    description:
      'Synchronizes all events from the Luma API to the local database. This endpoint is designed to be called by a cron job every 5 minutes to keep event data fresh.',
    authentication: {
      required: true,
      type: 'Bearer Token or Vercel Cron',
      header: 'Authorization: Bearer <CRON_SECRET>',
    },
    headers: [
      {
        name: 'Authorization',
        required: true,
        description:
          'Bearer token using CRON_SECRET, or automatically verified by Vercel Cron header',
        example: 'Bearer your-cron-secret-here',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Events synced successfully',
        example: {
          success: true,
          synced: 15,
          timestamp: '2026-01-03T10:30:00.000Z',
        },
      },
      {
        status: 401,
        description: 'Unauthorized - Invalid or missing authentication',
        example: {
          error: 'Unauthorized',
        },
      },
      {
        status: 500,
        description: 'Server error during sync',
        example: {
          error: 'Failed to sync events',
          details: 'Connection timeout',
        },
      },
    ],
    exampleRequest: {
      curl: `curl -X GET "https://your-domain.com/api/cron/sync-luma" \\
  -H "Authorization: Bearer your-cron-secret"`,
      javascript: `const response = await fetch('/api/cron/sync-luma', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${process.env.CRON_SECRET}\`
  }
});

const data = await response.json();
console.log(\`Synced \${data.synced} events\`);`,
      python: `import requests

response = requests.get(
    "https://your-domain.com/api/cron/sync-luma",
    headers={"Authorization": f"Bearer {CRON_SECRET}"}
)

data = response.json()
print(f"Synced {data['synced']} events")`,
    },
  },
  'webhooks-luma': {
    method: 'POST',
    path: '/api/webhooks/luma',
    title: 'Luma Webhook Receiver',
    description:
      'Receives real-time event updates from Luma. Configure this URL in your Luma webhook settings to get instant notifications when events are created, updated, or deleted.',
    authentication: {
      required: false,
      type: 'Optional Signature Verification',
      header: 'x-luma-signature',
    },
    headers: [
      {
        name: 'Content-Type',
        required: true,
        description: 'Must be application/json',
        example: 'application/json',
      },
      {
        name: 'x-luma-signature',
        required: false,
        description: 'HMAC signature for payload verification (optional)',
        example: 'sha256=abc123...',
      },
    ],
    bodyParams: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: 'The webhook event type',
        example: 'event.created',
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: 'The event payload data',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Webhook processed successfully',
        example: {
          success: true,
          mode: 'scaffold',
        },
      },
      {
        status: 400,
        description: 'Invalid request body',
        example: {
          error: 'Invalid webhook payload',
        },
      },
      {
        status: 500,
        description: 'Server error processing webhook',
        example: {
          error: 'Failed to process webhook',
          details: 'Database connection failed',
        },
      },
    ],
    exampleRequest: {
      curl: `curl -X POST "https://your-domain.com/api/webhooks/luma" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "event.created",
    "data": {
      "event": {
        "api_id": "evt_abc123",
        "name": "New Lecture",
        "start_at": "2026-02-01T19:00:00Z"
      }
    }
  }'`,
      javascript: `// This is typically called by Luma, not your code
// But here's how you'd simulate it for testing:

const payload = {
  type: 'event.created',
  data: {
    event: {
      api_id: 'evt_abc123',
      name: 'New Lecture',
      start_at: '2026-02-01T19:00:00Z'
    }
  }
};

const response = await fetch('/api/webhooks/luma', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});`,
      python: `import requests
import json

# Simulate a Luma webhook (for testing)
payload = {
    "type": "event.created",
    "data": {
        "event": {
            "api_id": "evt_abc123",
            "name": "New Lecture",
            "start_at": "2026-02-01T19:00:00Z"
        }
    }
}

response = requests.post(
    "https://your-domain.com/api/webhooks/luma",
    headers={"Content-Type": "application/json"},
    data=json.dumps(payload)
)`,
    },
  },
};

// Webhook event types
export const webhookEventTypes = [
  {
    type: 'event.created',
    description: 'Fired when a new event is created in Luma',
    action: 'Creates a new event record in the database',
  },
  {
    type: 'event.updated',
    description: 'Fired when event details are modified',
    action: 'Updates the existing event record',
  },
  {
    type: 'event.deleted',
    description: 'Fired when an event is deleted',
    action: 'Marks the event as cancelled in the database',
  },
  {
    type: 'guest.created',
    description: 'Fired when someone registers for an event',
    action: 'Decrements spots_remaining counter',
  },
  {
    type: 'guest.updated',
    description: 'Fired when guest details change',
    action: 'Updates guest count if applicable',
  },
  {
    type: 'ticket.created',
    description: 'Fired when a ticket is purchased',
    action: 'Decrements spots_remaining, may set is_sold_out',
  },
];
